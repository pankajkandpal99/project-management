import React, { useEffect, useMemo } from "react";
import {
  FolderOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "../types/project.types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAnalytics,
  fetchProjects,
} from "../features/project/project.slice";
import { Skeleton } from "../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Loader } from "../components/general/Loader";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    projects,
    loading,
    error,
    tasks,
    analytics: analyticsData,
  } = useAppSelector((state) => state.project);
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const defaultAnalytics = {
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    planningProjects: 0,
    onHoldProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0,
    completionRate: 0,
  };

  const analytics = useMemo(() => {
    if (!analyticsData) return defaultAnalytics;

    return {
      totalProjects: analyticsData.totalProjects,
      completedProjects: analyticsData.projects.completed || 0,
      activeProjects: analyticsData.projects.active || 0,
      planningProjects: analyticsData.projects.planning || 0,
      onHoldProjects: analyticsData.projects.onhold || 0,
      totalTasks: analyticsData.totalTasks,
      completedTasks: analyticsData.tasks.done || 0,
      inProgressTasks: analyticsData.tasks["in-progress"] || 0,
      todoTasks: analyticsData.tasks.todo || 0,
      completionRate:
        analyticsData.totalTasks > 0
          ? Math.round(
              ((analyticsData.tasks.done || 0) / analyticsData.totalTasks) * 100
            )
          : 0,
    };
  }, [analyticsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "onhold":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2 bg-gray-200" />
          <Skeleton className="h-4 w-96 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2 bg-gray-200" />
                <Skeleton className="h-8 w-16 mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-24 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full mb-4 bg-gray-200" />
                <Skeleton className="h-4 w-1/3 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error loading dashboard</span>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (analyticsData.error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error loading analytics</span>
            </div>
            <p className="text-red-600 mt-2">{analyticsData.error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (analyticsData.loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-32">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back,{" "}
          <span className="text-green-500">
            {currentUser?.username || "User"}!
          </span>
        </h1>
        <p className="text-gray-600">
          Here's an overview of your projects and tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {analytics.totalProjects}
                </p>
                <p className="text-xs text-blue-700">
                  {analytics.activeProjects} active,{" "}
                  {analytics.completedProjects} completed
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {analytics.totalTasks}
                </p>
                <p className="text-xs text-green-700">
                  {analytics.completedTasks} completed
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  {analytics.inProgressTasks}
                </p>
                <p className="text-xs text-orange-700">
                  {analytics.todoTasks} pending
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {analytics.completionRate}%
                </p>
                <p className="text-xs text-purple-700">Overall progress</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
          <Link to="/projects/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first project
            </p>
            <Link to="/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => {
            const projectTasks = tasks.filter(
              (task) => task.projectId === project._id
            );
            const completedTasks = projectTasks.filter(
              (task: { status: string }) => task.status === "done"
            ).length;
            const progressPercentage =
              projectTasks.length > 0
                ? Math.round((completedTasks / projectTasks.length) * 100)
                : 0;

            return (
              <Card
                key={project._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(project.status)} text-xs`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Task Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Tasks Progress</span>
                      <span className="font-medium">
                        {completedTasks}/{projectTasks.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {progressPercentage}% completed
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created {formatDate(project.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/project/${project._id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    {/* <Link to={`/project/${project._id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link> */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
