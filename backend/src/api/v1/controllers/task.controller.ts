import { NotFoundError } from "@/error-handler/index.js";
import { RequestContext } from "@/middleware/context.js";
import { Project } from "@/models/project.model.js";
import { Task } from "@/models/task.model.js";
import { HttpResponse } from "@/utils/service-response.js";

export const TaskController = {
  createTask: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { projectId } = context.params;
        const { title, description, status, dueDate } = context.body;
        const userId = context.user?.id;

        // Verify project exists and belongs to user
        const project = await Project.findOne({
          _id: projectId,
          createdBy: userId,
        }).session(session);

        if (!project) {
          throw new NotFoundError("Project not found");
        }

        const task = new Task({
          title,
          description,
          status,
          dueDate: new Date(dueDate),
          project: projectId,
          createdBy: userId,
        });

        await task.save({ session });

        return task.toObject();
      });

      return HttpResponse.send(context.res, result, 201);
    } catch (error) {
      throw error;
    }
  },

  getTasksByProject: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { projectId } = context.params;
        const userId = context.user?.id;

        // Verify project exists and belongs to user
        const project = await Project.findOne({
          _id: projectId,
          createdBy: userId,
        }).session(session);

        if (!project) {
          throw new NotFoundError("Project not found");
        }

        const tasks = await Task.find({ project: projectId, createdBy: userId })
          .session(session)
          .lean();

        return tasks;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { taskId } = context.params;
        const userId = context.user?.id;
        const updateData = context.body;

        const task = await Task.findOneAndUpdate(
          { _id: taskId, createdBy: userId },
          updateData,
          { new: true, session }
        ).lean();

        if (!task) {
          throw new NotFoundError("Task not found");
        }

        return task;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { taskId } = context.params;
        const userId = context.user?.id;

        const task = await Task.findOneAndDelete({
          _id: taskId,
          createdBy: userId,
        }).session(session);

        if (!task) {
          throw new NotFoundError("Task not found");
        }

        return { success: true };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  filterTasksByStatus: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { status } = context.params;
        const userId = context.user?.id;

        const tasks = await Task.find({ status, createdBy: userId })
          .session(session)
          .lean();

        return tasks;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },
};
