import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import {
  fetchProjectById,
  fetchTasksByProject,
  deleteProject,
  clearCurrentProject,
  deleteTask,
} from "../features/project/project.slice";
import { Loader } from "../components/general/Loader";
import { toast } from "sonner";
import {
  Edit3,
  Trash2,
  Plus,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Target,
  Activity,
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    currentProject,
    tasks,
    loading: projectLoading,
    error: projectError,
    tasksLoading,
    tasksError,
  } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchTasksByProject(id));
    }

    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, id]);

  const handleDeleteProject = async () => {
    if (id && window.confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        toast.success("Project deleted successfully!");
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to delete project");
        }
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success("Task deleted successfully!");
        // Refresh tasks after deletion
        if (id) {
          dispatch(fetchTasksByProject(id));
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to delete task");
        }
      }
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "todo":
        return {
          variant: "secondary" as const,
          icon: <Clock className="h-4 w-4" />,
          color:
            "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-800",
        };
      case "in-progress":
        return {
          variant: "default" as const,
          icon: <Activity className="h-4 w-4" />,
          color:
            "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-800",
        };
      case "done":
        return {
          variant: "outline" as const,
          icon: <CheckCircle2 className="h-4 w-4" />,
          color:
            "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-400/10 dark:text-green-400 dark:border-green-800",
        };
      default:
        return {
          variant: "secondary" as const,
          icon: <Clock className="h-4 w-4" />,
          color:
            "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-800",
        };
    }
  };

  const getProjectStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          color:
            "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-800",
          icon: <Activity className="h-4 w-4" />,
        };
      case "completed":
        return {
          color:
            "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-400/10 dark:text-green-400 dark:border-green-800",
          icon: <CheckCircle2 className="h-4 w-4" />,
        };
      default:
        return {
          color:
            "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-400/10 dark:text-gray-400 dark:border-gray-800",
          icon: <FileText className="h-4 w-4" />,
        };
    }
  };

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader size="large" />
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Error Loading Project
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{projectError}</p>
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Project Not Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The project you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const projectStatusConfig = getProjectStatusConfig(currentProject.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentProject.title}
              </h1>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${projectStatusConfig.color} flex items-center gap-1 px-3 py-1 text-sm font-medium border`}
                >
                  {projectStatusConfig.icon}
                  {currentProject.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                asChild
                className="bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 border-primary/20 hover:border-primary/40 text-primary hover:text-primary"
              >
                <Link
                  to={`/project/${id}/edit`}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Project
                </Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteProject}
                className="bg-gradient-to-r from-destructive to-red-600 hover:from-destructive/90 hover:to-red-600/90"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </Button>
            </div>
          </div>
        </div>

        {/* Project Details Card */}
        <Card className="mb-8 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Project Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-base">
              {currentProject.description}
            </p>
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/10 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
              {!tasksLoading && (
                <Badge variant="outline" className="text-sm">
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </Badge>
              )}
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link
                to={`/project/${id}/tasks/new`}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Link>
            </Button>
          </div>

          {tasksLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-center space-y-4">
                <Loader size="large" />
                <p className="text-muted-foreground">Loading tasks...</p>
              </div>
            </div>
          ) : tasksError ? (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Error Loading Tasks
                </h3>
                <p className="text-sm text-muted-foreground">{tasksError}</p>
              </CardContent>
            </Card>
          ) : tasks.length === 0 ? (
            <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-muted/20 to-muted/10">
              <CardContent className="p-12 text-center">
                <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full p-6 w-fit mx-auto mb-6">
                  <Plus className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">No Tasks Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Break down your project into manageable tasks to track
                  progress effectively.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    to={`/project/${id}/tasks/new`}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create First Task
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => {
                const statusConfig = getStatusConfig(task.status);
                return (
                  <Card
                    key={task._id}
                    className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="space-y-2">
                        <CardTitle className="text-lg font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors duration-200">
                          {task.title}
                        </CardTitle>
                        <Badge
                          className={`${statusConfig.color} flex items-center gap-1 px-2 py-1 text-xs font-medium border w-fit`}
                        >
                          {statusConfig.icon}
                          {task.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                      {task.dueDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors duration-200"
                      >
                        <Link
                          to={`/project/${id}/tasks/${task._id}/edit`}
                          className="flex items-center gap-1"
                        >
                          <Edit3 className="h-3 w-3" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTask(task._id)}
                        className="hover:bg-destructive/90 transition-colors duration-200"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
