import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectService } from "../../services/project.service";
import { TaskService } from "../../services/task.service";
import { Project, Task } from "../../types/project.types";
import {
  ProjectFormValues,
  TaskFormValues,
  UpdateProjectFormValues,
  UpdateTaskFormValues,
} from "../../schema/project.schema";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  tasksLoading: boolean;
  tasksError: string | null;
  currentTask: Task | null;
  analytics: {
    totalProjects: number;
    projects: {
      completed: number;
      active: number;
      planning: number;
      onhold: number;
    };
    totalTasks: number;
    tasks: {
      done: number;
      "in-progress": number;
      todo: number;
    };
    loading: boolean;
    error: string | null;
  };
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  tasks: [],
  loading: false,
  error: null,
  tasksLoading: false,
  tasksError: null,
  currentTask: null,
  analytics: {
    totalProjects: 0,
    projects: {
      completed: 0,
      active: 0,
      planning: 0,
      onhold: 0,
    },
    totalTasks: 0,
    tasks: {
      done: 0,
      "in-progress": 0,
      todo: 0,
    },
    loading: false,
    error: null,
  },
};

// Project Async Thunk
export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData: ProjectFormValues, { rejectWithValue }) => {
    try {
      const response = await ProjectService.createProject(projectData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to create project");
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProjectService.getAllProjects();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ProjectService.getProjectById(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch project");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (
    { id, data }: { id: string; data: UpdateProjectFormValues },
    { rejectWithValue }
  ) => {
    try {
      const response = await ProjectService.updateProject(id, data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await ProjectService.deleteProject(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete project");
    }
  }
);

// Task Async Thunks
export const createTask = createAsyncThunk(
  "projects/createTask",
  async (taskData: TaskFormValues, { rejectWithValue }) => {
    try {
      const response = await TaskService.createTask(taskData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to create task");
    }
  }
);

export const fetchTasksByProject = createAsyncThunk(
  "projects/fetchTasks",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await TaskService.getTasksByProject(projectId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch tasks");
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "projects/fetchTaskById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await TaskService.getTaskById(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "projects/updateTask",
  async (
    { id, data }: { id: string; data: UpdateTaskFormValues },
    { rejectWithValue }
  ) => {
    try {
      const response = await TaskService.updateTask(id, data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "projects/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await TaskService.deleteTask(id);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete task");
    }
  }
);

export const filterTasksByStatus = createAsyncThunk(
  "projects/filterTasks",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await TaskService.filterTasksByStatus(status);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to filter tasks");
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "projects/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProjectService.getProjectAnalytics();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch analytics");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.tasksError = null;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
      state.tasks = [];
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Project By ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
          state.tasks = [];
        }
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasksLoading = false;
        state.tasks.push(action.payload);
        state.tasksError = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload as string;
      })

      // Fetch Tasks
      .addCase(fetchTasksByProject.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.tasksLoading = false;
        state.tasks = action.payload;
        state.tasksError = null;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload as string;
      })

      // Fetch Task by Id
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
        state.error = null;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasksLoading = false;
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.tasksError = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload as string;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasksLoading = false;
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        state.tasksError = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload as string;
      })

      // Filter Tasks
      .addCase(filterTasksByStatus.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(filterTasksByStatus.fulfilled, (state, action) => {
        state.tasksLoading = false;
        state.tasks = action.payload;
        state.tasksError = null;
      })
      .addCase(filterTasksByStatus.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload as string;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.analytics.loading = true;
        state.analytics.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics.loading = false;
        state.analytics = {
          ...action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.analytics.loading = false;
        state.analytics.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearCurrentProject,
  setCurrentProject,
  clearCurrentTask,
} = projectSlice.actions;
export default projectSlice.reducer;
