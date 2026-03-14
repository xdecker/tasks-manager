import { getTasksRequest } from "../api/task.api";
import { TaskQuery } from "../types/task.type";

export async function getTasks(query: TaskQuery) {
  const result = await getTasksRequest(query);
  return result;
}
