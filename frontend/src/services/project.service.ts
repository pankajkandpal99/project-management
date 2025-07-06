/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import {
  ProjectFormValues,
  UpdateProjectFormValues,
} from "../schema/project.schema";
import { Project } from "../types/project.types";
import axiosInstance from "../utils/axiosConfig";

export const ProjectService = {
  async createProject(projectData: ProjectFormValues): Promise<Project> {
    try {
      // console.log("project data : ", projectData);
      const response = await axiosInstance.post(
        API_ENDPOINTS.PROJECTS.CREATE,
        projectData
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to create project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.GET_ALL);
      return response.data.data || [];
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to fetch projects");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PROJECTS.GET_BY_ID(id)
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to fetch project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateProject(
    id: string,
    projectData: UpdateProjectFormValues
  ): Promise<Project> {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.PROJECTS.UPDATE(id),
        projectData
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to update project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await axiosInstance.delete(API_ENDPOINTS.PROJECTS.DELETE(id));
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to delete project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getProjectAnalytics(): Promise<any> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PROJECTS.ANALYTICS
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to fetch analytics");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
