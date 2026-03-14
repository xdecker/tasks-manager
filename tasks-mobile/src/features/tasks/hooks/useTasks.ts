import React, { useState } from "react";
import { getTasks } from "../services/task.service";
import { TaskQuery } from "../types/task.type";

export function useTasks() {
  //const setToken = useAuthStore((state) => state.setToken);

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

  return {
    getAllTasks,
    loading,
    error,
  };
}
