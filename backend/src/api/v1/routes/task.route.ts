import { createApiHandler } from "@/utils/api-factory.js";
import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
import { taskSchema, updateTaskSchema } from "@/schema/project.schema.js";

export default (router: Router) => {
  router.post(
    "/tasks/project/:projectId/",
    createApiHandler(TaskController.createTask, {
      bodySchema: taskSchema,
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.get(
    "/tasks/project/:projectId",
    createApiHandler(TaskController.getTasksByProject, {
      useTransaction: true,
      requireAuth: true,
    })
  );

  //   router.get(
  //     "/tasks/project/:projectId",
  //     createApiHandler(TaskController.getTasksByTaskId, {
  //       useTransaction: true,
  //       requireAuth: true,
  //     })
  //   );

  router.put(
    "/tasks/project/:taskId",
    createApiHandler(TaskController.updateTask, {
      bodySchema: updateTaskSchema,
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.delete(
    "/tasks/project/:taskId",
    createApiHandler(TaskController.deleteTask, {
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.get(
    "/tasks/project/filter/:status",
    createApiHandler(TaskController.filterTasksByStatus, {
      useTransaction: true,
      requireAuth: true,
    })
  );
};
