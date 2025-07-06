import { API_BASE_URL } from "../config/config";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USER: {
    CURRENT_USER: `${API_BASE_URL}/api/v1/users/me`,
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/update`,
  },
  PROJECTS: {
    CREATE: `${API_BASE_URL}/api/v1/projects`,
    GET_ALL: `${API_BASE_URL}/api/v1/projects`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/v1/project/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/v1/project/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/v1/project/${id}`,
    ANALYTICS: `${API_BASE_URL}/api/v1/projects/analytics`,
  },
  TASKS: {
    CREATE: (projectId: string) =>
      `${API_BASE_URL}/api/v1/tasks/project/${projectId}`,
    GET_BY_PROJECT: (projectId: string) =>
      `${API_BASE_URL}/api/v1/tasks/project/${projectId}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/v1/tasks/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/v1/tasks/project/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/v1/tasks/project/${id}`,
    FILTER_BY_STATUS: (status: string) =>
      `${API_BASE_URL}/api/v1/tasks/project/filter/${status}`,
  },
};

export { API_ENDPOINTS };
