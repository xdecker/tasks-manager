import { apiClient } from "@/api/client";
import { TaskListResponse, TaskQuery } from "../types/task.type";

export async function getTasksRequest(query: TaskQuery) {
  const response = await apiClient.get<TaskListResponse>("/tasks", {
    params: query,
  });
  return response.data;
}
