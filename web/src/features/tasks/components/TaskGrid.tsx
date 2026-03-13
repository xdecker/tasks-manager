"use client";
import {
  SkeletonCard,
  TaskCard,
  TaskFormModal,
  TasksToolbar,
} from "@/features/tasks/components";

import {
  ItemTask,
  Task,
  TaskQuery,
} from "@/features/tasks/interfaces/task.interface";
import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTasks";
import { EmptyDataMessage } from "@/components/shared";
import { LayoutList } from "lucide-react";
import clsx from "clsx";
import { useCustomDialog } from "@/providers/custom-dialog.provider";
export const TaskGrid = () => {
  const { createNewTask, updateTaskSelected, getAllTasks, loading } = useTask();
  const { showDialog } = useCustomDialog();
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

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ItemTask | undefined>();

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

  const onCreateTask = () => {
    setEditingTask(undefined);
    setModalOpen(true);
  };

  const handleSaveTask = async (data: Task) => {
    try {
      if (editingTask) {
        await updateTaskSelected(editingTask.id, data);
      } else {
        await createNewTask(data);
      }
      showDialog(
        "success",
        `Task ${editingTask ? "updated" : "created"} successfully`
      );
    } catch (err: any) {
      const errorMessage = Array.isArray(err.message)
        ? err.message.join(", ")
        : err.message;
      showDialog("error", errorMessage);
    }

    fetchTasks();
  };

  return (
    <div className="space-y-6">
      <TasksToolbar
        query={query}
        total={meta.total}
        setQuery={setQuery}
        onClickNewTask={onCreateTask}
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setModalOpen(true);
              }}
            />
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

      <TaskFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
        onSubmit={handleSaveTask}
      />
    </div>
  );
};
