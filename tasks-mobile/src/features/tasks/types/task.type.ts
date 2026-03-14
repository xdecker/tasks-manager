export interface Task {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
export interface ItemTask extends Task {
  id: string;
  createdAt: Date;
}
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export interface TaskListResponse {
  data: ItemTask[];
  meta: { total: number; page: number; lastPage: number };
}
export interface TaskQuery {
  status?: TaskStatus;
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
}
