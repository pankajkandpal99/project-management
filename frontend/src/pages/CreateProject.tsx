import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Plus, FolderPlus, Sparkles } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ProjectFormValues, projectSchema } from "../schema/project.schema";
import { createProject } from "../features/project/project.slice";

const NewProject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.project);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      await dispatch(createProject(values)).unwrap();
      toast.success("Project created successfully!");
      navigate("/dashboard");
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
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background dark:from-background dark:via-muted/10 dark:to-background">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="mb-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-lg">
                    <FolderPlus className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Create New Project
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    Transform your ideas into organized workflows
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Let's build something amazing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
              <CardHeader className="pb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  Project Configuration
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Set up your project foundation with clear objectives and scope
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Title Field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg font-semibold text-foreground">
                            Project Title
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter a compelling project title..."
                                className="h-12 text-base bg-input border-2 border-border/50 focus:border-primary/50 transition-all duration-200 rounded-lg"
                                {...field}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription className="text-sm text-muted-foreground">
                            💡 Choose a title that clearly communicates your
                            project's purpose
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg font-semibold text-foreground">
                            Project Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project vision, goals, and key deliverables..."
                              className="min-h-[140px] text-base bg-input border-2 border-border/50 focus:border-primary/50 transition-all duration-200 rounded-lg resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-sm text-muted-foreground">
                            📝 Detail what success looks like and the impact you
                            want to create
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Status Field */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg font-semibold text-foreground">
                            Initial Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 text-base bg-input border-2 border-border/50 focus:border-primary/50 transition-all duration-200 rounded-lg">
                                <SelectValue placeholder="Choose your project's starting status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-lg">
                              <SelectItem value="ACTIVE" className="p-3">
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                  >
                                    Active
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    Ready to start working
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem value="PLANNING" className="p-3">
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                  >
                                    Planning
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    In preparation phase
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem value="ONHOLD" className="p-3">
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                                  >
                                    On Hold
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    Temporarily paused
                                  </span>
                                </div>
                              </SelectItem>
                              <SelectItem value="COMPLETED" className="p-3">
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                                  >
                                    Completed
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    Finished successfully
                                  </span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-sm text-muted-foreground">
                            🎯 Set the current phase of your project lifecycle
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-8" />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-8 py-3 text-base border-2 hover:bg-muted/50 transition-all duration-200 rounded-lg"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 text-base bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl"
                      >
                        {loading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Creating Project...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Project
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
