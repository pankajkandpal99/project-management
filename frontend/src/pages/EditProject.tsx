import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  UpdateProjectFormValues,
  updateProjectSchema,
} from "../schema/project.schema";
import {
  updateProject,
  fetchProjectById,
} from "../features/project/project.slice";

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProject, loading } = useAppSelector((state) => state.project);

  const form = useForm<UpdateProjectFormValues>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: id || "",
      title: "",
      description: "",
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject) {
      const statusMap: Record<
        string,
        "ACTIVE" | "COMPLETED" | "PLANNING" | "ONHOLD"
      > = {
        active: "ACTIVE",
        completed: "COMPLETED",
        planning: "PLANNING",
        onhold: "ONHOLD",
      };
      form.reset({
        id: currentProject._id,
        title: currentProject.title,
        description: currentProject.description,
        status: statusMap[currentProject.status?.toLowerCase()] ?? "ACTIVE",
      });
    }
  }, [currentProject, form]);

  const onSubmit = async (values: UpdateProjectFormValues) => {
    try {
      await dispatch(updateProject({ id: values.id, data: values })).unwrap();
      toast.success("Project updated successfully!");
      navigate(`/project/${values.id}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleCancel = () => {
    if (form.formState.isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate(`/project/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "PLANNING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "ONHOLD":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Edit Project
              </h1>
              <p className="text-muted-foreground text-sm">
                Update your project details and track progress
              </p>
            </div>
            {currentProject && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    currentProject.status || "ACTIVE"
                  )}`}
                >
                  {currentProject.status || "ACTIVE"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-xl">
          <div className="p-6 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Project Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Project Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project title"
                          {...field}
                          className="h-12 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project in detail..."
                          className="min-h-32 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        Project Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                            <SelectValue placeholder="Select project status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border shadow-xl">
                          <SelectItem
                            value="ACTIVE"
                            className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="PLANNING"
                            className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              Planning
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="ONHOLD"
                            className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              On Hold
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="COMPLETED"
                            className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              Completed
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-border/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="order-2 sm:order-1 h-12 px-8 text-base font-medium border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="order-1 sm:order-2 h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Project"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Progress Indicator */}
        {currentProject && (
          <div className="mt-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 shadow-lg">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Project ID: {currentProject._id}</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProject;
