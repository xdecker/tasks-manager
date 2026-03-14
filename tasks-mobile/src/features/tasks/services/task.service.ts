import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task.api";
import { Task, TaskQuery } from "../types/task.type";

export async function getTasks(query: TaskQuery) {
  const result = await getTasksRequest(query);
  return result;
}

export async function createTask(data: Task) {
  const result = await createTaskRequest(data);
  return result;
}

export async function updateTask(id: string, data: Task) {
  const result = await updateTaskRequest(id, data);
  return result;
}

export async function deleteTask(id: string) {
  const result = await deleteTaskRequest(id);
  return result;
}
