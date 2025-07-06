import { NotFoundError } from "@/error-handler/index.js";
import { RequestContext } from "@/middleware/context.js";
import { Project } from "@/models/project.model.js";
import { Task } from "@/models/task.model.js";
import { HttpResponse } from "@/utils/service-response.js";

export const ProjectController = {
  createProject: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { title, description, status } = context.body;
        const userId = context.user?.id;

        const project = new Project({
          title,
          description,
          status,
          createdBy: userId,
        });

        await project.save({ session });

        return project.toObject();
      });

      return HttpResponse.send(context.res, result, 201);
    } catch (error) {
      throw error;
    }
  },

  getProjects: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const userId = context.user?.id;
        const projects = await Project.find({ createdBy: userId })
          .session(session)
          .lean();

        return projects;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  getProjectById: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;
        const userId = context.user?.id;

        const project = await Project.findOne({
          _id: id,
          createdBy: userId,
        })
          .session(session)
          .lean();

        if (!project) {
          throw new NotFoundError("Project not found");
        }

        return project;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;
        const userId = context.user?.id;
        const updateData = context.body;

        const project = await Project.findOneAndUpdate(
          { _id: id, createdBy: userId },
          updateData,
          { new: true, session }
        ).lean();

        if (!project) {
          throw new NotFoundError("Project not found");
        }

        return project;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;
        const userId = context.user?.id;

        // Delete all tasks associated with the project first
        await Task.deleteMany({ project: id, createdBy: userId }).session(
          session
        );

        const project = await Project.findOneAndDelete({
          _id: id,
          createdBy: userId,
        }).session(session);

        if (!project) {
          throw new NotFoundError("Project not found");
        }

        return { success: true };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  getProjectAnalytics: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const userId = context.user?.id;

        if (!userId) {
          throw new Error("User ID not available");
        }

        // Initialize default structure
        const defaultResponse = {
          projects: {
            active: 0,
            completed: 0,
            planning: 0,
            onhold: 0,
          },
          tasks: {
            todo: 0,
            "in-progress": 0,
            done: 0,
          },
          totalProjects: 0,
          totalTasks: 0,
        };

        // Get total counts first
        defaultResponse.totalProjects = await Project.countDocuments({
          createdBy: userId,
        }).session(session);

        defaultResponse.totalTasks = await Task.countDocuments({
          createdBy: userId,
        }).session(session);

        // Only run aggregations if documents exist
        if (defaultResponse.totalProjects > 0) {
          const projects = await Project.aggregate([
            { $match: { createdBy: userId } },
            {
              $group: {
                _id: { $toLower: "$status" }, // Ensure consistent casing
                count: { $sum: 1 },
              },
            },
          ]).session(session);

          projects.forEach((item) => {
            if (defaultResponse.projects.hasOwnProperty(item._id)) {
              defaultResponse.projects[item._id] = item.count;
            }
          });
        }

        if (defaultResponse.totalTasks > 0) {
          const tasks = await Task.aggregate([
            { $match: { createdBy: userId } },
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ]).session(session);

          tasks.forEach((item) => {
            if (defaultResponse.tasks.hasOwnProperty(item._id)) {
              defaultResponse.tasks[item._id] = item.count;
            }
          });
        }

        return defaultResponse;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      console.error("Analytics error:", error);
      throw error;
    }
  },
};
