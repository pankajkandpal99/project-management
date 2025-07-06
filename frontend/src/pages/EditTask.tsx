import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "../components/ui/calendar";
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
  UpdateTaskFormValues,
  updateTaskSchema,
} from "../schema/project.schema";
import { updateTask, fetchTaskById } from "../features/project/project.slice";

const EditTask = () => {
  const { id, taskId } = useParams<{ id: string; taskId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.project);

  const taskToEdit = tasks.find((task) => task._id === taskId);
  console.log("taskTo edit : ", taskToEdit);

  const form = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: taskId || "",
      title: "",
      description: "",
      status: "todo",
      dueDate: new Date().toISOString(),
      projectId: id || "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (taskToEdit) {
      form.reset({
        id: taskToEdit._id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate,
        projectId: taskToEdit.projectId || id || "",
      });
    }
  }, [taskToEdit, form, id]);

  const onSubmit = async (values: UpdateTaskFormValues) => {
    try {
      console.log("update data : ", values);
      await dispatch(updateTask({ id: values.id, data: values })).unwrap();
      toast.success("Task updated successfully!");
      navigate(`/project/${values.projectId}`);
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
    navigate(`/project/${form.getValues("projectId")}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return "⏳";
      case "in-progress":
        return "🔄";
      case "done":
        return "✅";
      default:
        return "📋";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Edit Task
              </h1>
              <p className="text-muted-foreground text-sm">
                Update task details and track your progress
              </p>
            </div>
            {taskToEdit && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    taskToEdit.status || "todo"
                  )}`}
                >
                  {getStatusIcon(taskToEdit.status || "todo")}{" "}
                  {taskToEdit.status || "todo"}
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
                {/* Task Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Task Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter task title"
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
                          placeholder="Describe your task in detail..."
                          className="min-h-32 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status and Due Date Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          Task Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-base bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                              <SelectValue placeholder="Select task status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover border-border shadow-xl">
                            <SelectItem
                              value="todo"
                              className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">⏳</span>
                                <div>
                                  <div className="font-medium">To Do</div>
                                  <div className="text-xs text-muted-foreground">
                                    Not started yet
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="in-progress"
                              className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">🔄</span>
                                <div>
                                  <div className="font-medium">In Progress</div>
                                  <div className="text-xs text-muted-foreground">
                                    Currently working on it
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="done"
                              className="text-base py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">✅</span>
                                <div>
                                  <div className="font-medium">Done</div>
                                  <div className="text-xs text-muted-foreground">
                                    Task completed
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Due Date */}
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold text-foreground flex items-center gap-2">
                          <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                          Due Date
                        </FormLabel>
                        <div className="space-y-4">
                          {/* Selected Date Display */}
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="text-sm text-muted-foreground mb-1">
                              Selected Date
                            </div>
                            <div className="text-lg font-semibold text-foreground">
                              {field.value
                                ? formatDate(field.value)
                                : "No date selected"}
                            </div>
                          </div>

                          {/* Calendar */}
                          <FormControl>
                            <div className="flex justify-center">
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                className="rounded-lg border border-border/50 bg-card/50 shadow-lg p-3"
                                classNames={{
                                  months:
                                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                  month: "space-y-4",
                                  caption:
                                    "flex justify-center pt-1 relative items-center",
                                  caption_label: "text-base font-semibold",
                                  nav: "space-x-1 flex items-center",
                                  nav_button:
                                    "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-muted/50 rounded-md transition-all",
                                  table: "w-full border-collapse space-y-1",
                                  head_row: "flex",
                                  head_cell:
                                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                                  row: "flex w-full mt-2",
                                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent/50 rounded-md transition-all",
                                  day_range_start: "day-range-start",
                                  day_range_end: "day-range-end",
                                  day_selected:
                                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                  day_today:
                                    "bg-accent text-accent-foreground font-semibold",
                                  day_outside:
                                    "text-muted-foreground opacity-50",
                                  day_disabled:
                                    "text-muted-foreground opacity-50",
                                  day_range_middle:
                                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                  day_hidden: "invisible",
                                }}
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/50">
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
                      "Update Task"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Task Info Card */}
        {taskToEdit && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Task ID:</span>
                <span className="font-mono text-foreground">
                  {taskToEdit._id}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="text-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditTask;
