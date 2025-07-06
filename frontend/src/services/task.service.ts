/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import { TaskFormValues, UpdateTaskFormValues } from "../schema/project.schema";
import { Task } from "../types/project.types";
import axiosInstance from "../utils/axiosConfig";

export const TaskService = {
  async createTask(taskData: TaskFormValues): Promise<Task> {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.TASKS.CREATE(taskData.projectId),
        taskData
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to create task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getTasksByProject(projectId: string): Promise<Task[]> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TASKS.GET_BY_PROJECT(projectId)
      );
      return response.data.data || [];
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to fetch tasks");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TASKS.GET_BY_ID(id)
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to fetch task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateTask(id: string, taskData: UpdateTaskFormValues): Promise<Task> {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.TASKS.UPDATE(id),
        taskData
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to update task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await axiosInstance.delete(API_ENDPOINTS.TASKS.DELETE(id));
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to delete task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async filterTasksByStatus(status: string): Promise<Task[]> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TASKS.FILTER_BY_STATUS(status)
      );
      return response.data.data || [];
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.message || "Failed to filter tasks");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
