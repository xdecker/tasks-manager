"use client";

import { useState } from "react";
import { TaskQuery } from "../interfaces/task.interface";
import { getTasks } from "../api/task.api";

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

  return { getAllTasks, loading, error };
}
