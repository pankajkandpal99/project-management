import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const CreateProject = lazy(() => import("../pages/CreateProject"));
const EditProject = lazy(() => import("../pages/EditProject"));

const NewTask = lazy(() => import("../pages/NewTask"));
const EditTask = lazy(() => import("../pages/EditTask"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
  fullWidth?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: Home, fullWidth: true },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/dashboard", element: Dashboard },
  { path: "/projects", element: Projects },
  { path: "/projects/new", element: CreateProject },
  { path: "/project/:id", element: ProjectDetail },
  { path: "/project/:id/edit", element: EditProject },

  { path: "/project/:id/tasks/new", element: NewTask },
  { path: "project/:id/tasks/:taskId/edit", element: EditTask },
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
