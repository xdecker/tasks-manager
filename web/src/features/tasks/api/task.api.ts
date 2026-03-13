import { apiClient } from "@/lib/api";
import {
  ItemTask,
  Task,
  TaskListResponse,
  TaskQuery,
} from "../interfaces/task.interface";

export const getTasks = (query: TaskQuery) =>
  apiClient<TaskListResponse, TaskQuery>("/tasks", "GET", { params: query });

export const createTask = (data: Task) =>
  apiClient<ItemTask>("/tasks", "POST", { data });

export const updateTask = (id: string, data: Task) =>
  apiClient<ItemTask>(`/tasks/${id}`, "PATCH", { data });
