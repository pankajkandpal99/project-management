import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE } from "@/config/constants.js";
import { env } from "@/config/env.js";
import { logger } from "@/utils/logger.js";
import { User } from "@/models/user.model.js";
import { Project } from "@/models/project.model.js";
import { Task } from "@/models/task.model.js";

interface SeedData {
  users: Array<{
    email: string;
    password: string;
    username: string;
    role?: string;
    isVerified?: boolean;
  }>;
  projects: Array<{
    title: string;
    description: string;
    status: "ACTIVE" | "COMPLETED" | "PLANNING" | "ONHOLD";
  }>;
  tasks: Array<{
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    dueDate: Date;
  }>;
}

const SEED_DATA: SeedData = {
  users: [
    {
      email: "test@example.com",
      password: "Test@123",
      username: "testuser",
      role: ROLE.USER,
      isVerified: true,
    },
    {
      email: "admin@example.com",
      password: "Admin@123",
      username: "admin",
      role: ROLE.ADMIN,
      isVerified: true,
    },
  ],
  projects: [
    {
      title: "Website Redesign",
      description: "Redesign company website with modern UI",
      status: "ACTIVE",
    },
    {
      title: "Mobile App Development",
      description: "Build cross-platform mobile application",
      status: "PLANNING",
    },
  ],
  tasks: [
    {
      title: "Design homepage",
      description: "Create wireframes for homepage",
      status: "done",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
    {
      title: "Implement contact form",
      description: "Develop contact form functionality",
      status: "in-progress",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    },
    {
      title: "Create app wireframes",
      description: "Design initial app screens",
      status: "todo",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  ],
};

export async function seedDatabase() {
  try {
    console.log("Starting database seeding process...");
    await mongoose.connect(env.DATABASE_URL);
    logger.info("Database connected for seeding");

    // Check if test user exists
    const testUserExists = await User.exists({ email: "test@example.com" });

    if (testUserExists) {
      logger.info("Test user already exists - skipping user creation");
    } else {
      // Create test users only if they don't exist
      const users = await createUsers();
      logger.info(`Created ${users.length} users`);
    }

    // Always create projects (allow duplicates)
    const projects = await createProjects();
    logger.info(`Created ${projects.length} projects`);

    // Always create tasks (allow duplicates)
    const tasks = await createTasks(projects);
    logger.info(`Created ${tasks.length} tasks`);

    logger.info("✅ Database seeding completed successfully!");
    return { projects, tasks };
  } catch (error) {
    logger.error("❌ Database seeding failed:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

async function createUsers() {
  const userCreationPromises = SEED_DATA.users.map(async (userData) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) return existingUser;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return User.create({
      email: userData.email,
      password: hashedPassword,
      username: userData.username,
      role: userData.role,
      isVerified: userData.isVerified,
    });
  });

  return Promise.all(userCreationPromises);
}

async function createProjects() {
  // Find or create the test user
  let testUser = await User.findOne({ email: "test@example.com" });
  if (!testUser) {
    testUser = await User.create({
      email: "test@example.com",
      password: await bcrypt.hash("Test@123", 10),
      username: "testuser",
      role: ROLE.USER,
      isVerified: true,
    });
  }

  const projectCreationPromises = SEED_DATA.projects.map(
    async (projectData) => {
      // Projects can be duplicated, so we don't check for existing ones
      return Project.create({
        ...projectData,
        createdBy: testUser._id,
      });
    }
  );

  return Promise.all(projectCreationPromises);
}

async function createTasks(projects: any[]) {
  // Find or create the test user
  const testUser =
    (await User.findOne({ email: "test@example.com" })) ||
    (await User.findOne({ email: "admin@example.com" }));

  if (!testUser) {
    throw new Error("No test user available for task creation");
  }

  const taskCreationPromises = [
    // First two tasks for first project
    Task.create({
      ...SEED_DATA.tasks[0],
      project: projects[0]._id,
      createdBy: testUser._id,
    }),
    Task.create({
      ...SEED_DATA.tasks[1],
      project: projects[0]._id,
      createdBy: testUser._id,
    }),
    // Third task for second project
    Task.create({
      ...SEED_DATA.tasks[2],
      project: projects[1]._id,
      createdBy: testUser._id,
    }),
  ];

  return Promise.all(taskCreationPromises);
}

// Helper function to check if seeding is needed
export async function shouldSeedDatabase() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    const testUser = await User.findOne({ email: "test@example.com" });
    return !testUser;
  } catch (error) {
    logger.error("Error checking seed status:", error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
}
