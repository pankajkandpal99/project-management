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
  projectId: z.string().min(1, "Project ID is required"),
});

// Update schemas (for edit operations)
export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string().min(1, "Project ID is required"),
});

export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string().min(1, "Task ID is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;
export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
