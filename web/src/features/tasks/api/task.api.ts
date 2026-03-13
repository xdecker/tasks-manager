import { apiClient } from "@/lib/api";
import { TaskListResponse, TaskQuery } from "../interfaces/task.interface";

export const getTasks = (query: TaskQuery) =>
  apiClient<TaskListResponse, TaskQuery>("/tasks", "GET", { params: query });
