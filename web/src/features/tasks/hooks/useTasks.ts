"use client";

import { useState } from "react";
import { Task, TaskQuery } from "../interfaces/task.interface";
import { createTask, getTasks, updateTask } from "../api/task.api";

export function useTask() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTasks = async (data: TaskQuery) => {
    try {
      setLoading(true);
      setError(null);
      //await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
      const res = await getTasks(data);
      return res;
    } catch (err: any) {
      setError(
        Array.isArray(err.message) ? err.message.join(", ") : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const createNewTask = async (data: Task) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createTask(data);
      return res;
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
      const res = await updateTask(id, data);
      return res;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getAllTasks, createNewTask, updateTaskSelected, loading, error };
}
