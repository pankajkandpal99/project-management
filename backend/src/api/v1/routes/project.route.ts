import { createApiHandler } from "@/utils/api-factory.js";
import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { projectSchema, updateProjectSchema } from "@/schema/project.schema.js";

export default (router: Router) => {
  router.post(
    "/projects",
    createApiHandler(ProjectController.createProject, {
      bodySchema: projectSchema,
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.get(
    "/projects",
    createApiHandler(ProjectController.getProjects, {
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.get(
    "/project/:id",
    createApiHandler(ProjectController.getProjectById, {
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.put(
    "/project/:id",
    createApiHandler(ProjectController.updateProject, {
      bodySchema: updateProjectSchema,
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.delete(
    "/project/:id",
    createApiHandler(ProjectController.deleteProject, {
      useTransaction: true,
      requireAuth: true,
    })
  );

  router.get(
    "/projects/analytics",
    createApiHandler(ProjectController.getProjectAnalytics, {
      useTransaction: true,
      requireAuth: true,
    })
  );
};
