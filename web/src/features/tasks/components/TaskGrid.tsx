"use client";
import {
  SkeletonCard,
  TaskCard,
  TasksToolbar,
} from "@/features/tasks/components";

import {
  ItemTask,
  TaskQuery,
} from "@/features/tasks/interfaces/task.interface";
import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTasks";
import { EmptyDataMessage } from "@/components/shared";
import { LayoutList } from "lucide-react";
import clsx from "clsx";
export const TaskGrid = () => {
  const { getAllTasks, loading } = useTask();
  const [tasks, setTasks] = useState<ItemTask[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  const [query, setQuery] = useState<TaskQuery>({
    page: 1,
    limit: 10,
    sort: "asc",
  });

  const fetchTasks = async () => {
    const res = await getAllTasks(query);

    if (!res) return;

    setTasks(res.data);
    setMeta(res.meta);
  };

  useEffect(() => {
    fetchTasks();
  }, [query.page, query.status, query.sort]);

  const nextPage = () => {
    if (meta.page < meta.lastPage) {
      setQuery((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const prevPage = () => {
    if (meta.page > 1) {
      setQuery((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  return (
    <div className="space-y-6">
      <TasksToolbar query={query} setQuery={setQuery} />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {tasks.length == 0 && !loading && (
        <EmptyDataMessage
          classNameDescription="text-gray-500 font-bold"
          icon={<LayoutList className="h-10 w-10 text-gray-600" />}
          description="No tasks yet, Create your first task to get started"
        />
      )}

      {meta.total > 0 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            onClick={prevPage}
            disabled={meta.page === 1}
            className={clsx(
              "text-sm text-muted-foreground disabled:opacity-50",
              {
                "cursor-pointer": meta.page !== 1,
              }
            )}
          >
            Prev
          </button>

          <span className={"text-sm"}>
            Page {meta.page} of {meta.lastPage}
          </span>

          <button
            onClick={nextPage}
            disabled={meta.page === meta.lastPage}
            className={clsx(
              "text-sm text-muted-foreground disabled:opacity-50",
              {
                "cursor-pointer": meta.page !== meta.lastPage,
              }
            )}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
