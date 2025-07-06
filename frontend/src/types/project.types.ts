export interface Project {
  _id: string;
  title: string;
  description: string;
  status: "ACTIVE" | "COMPLETED" | "PLANNING" | "ONHOLD";
  userId: string;
  createdAt: string;
  updatedAt: string;
  taskCount?: number;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
