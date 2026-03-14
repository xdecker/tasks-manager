import React, { useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/task.service";
import { Task, TaskQuery } from "../types/task.type";

export function useTasks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTasks = async (query: TaskQuery) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getTasks(query);
      return result;
    } catch (err: any) {
      setError(err.message ?? "Something was wrong");
    } finally {
      setLoading(false);
    }
  };

  const createNewTask = async (data: Task) => {
    try {
      setLoading(true);
      setError(null);

      const result = await createTask(data);
      return result;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTaskSelected = async (id: string, data: Task) => {
    try {
      setLoading(true);
      setError(null);

      const result = await updateTask(id, data);
      return result;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskSelected = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await deleteTask(id);
      return result;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllTasks,
    createNewTask,
    updateTaskSelected,
    deleteTaskSelected,
    loading,
    error,
  };
}
