import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  status: z.enum(["ACTIVE", "COMPLETED", "PLANNING", "ONHOLD"], {
    required_error: "Status is required",
  }),
});

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(300, "Description must not exceed 300 characters"),
  status: z.enum(["todo", "in-progress", "done"], {
    required_error: "Status is required",
  }),
  dueDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Due date must be today or in the future"),
});

export const updateProjectSchema = projectSchema.partial();
export const updateTaskSchema = taskSchema.partial();
