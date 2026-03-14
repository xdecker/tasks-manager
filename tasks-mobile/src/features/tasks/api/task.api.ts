import { apiClient } from "@/api/client";
import {
  ItemTask,
  Task,
  TaskListResponse,
  TaskQuery,
} from "../types/task.type";

export async function getTasksRequest(query: TaskQuery) {
  const response = await apiClient.get<TaskListResponse>("/tasks", {
    params: query,
  });
  return response.data;
}

export async function createTaskRequest(data: Task) {
  const response = await apiClient.post<ItemTask>("/tasks", data);
  return response.data;
}

export async function updateTaskRequest(id: string, data: Task) {
  const response = await apiClient.patch<ItemTask>(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTaskRequest(id: string) {
  const response = await apiClient.delete<ItemTask>(`/tasks/${id}`);
  return response.data;
}
