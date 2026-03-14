"use client";

import { PrincipalHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { TaskQuery, TaskStatus } from "../interfaces/task.interface";

interface Props {
  query: TaskQuery;
  total: number;
  setQuery: React.Dispatch<React.SetStateAction<TaskQuery>>;
  onClickNewTask: () => void;
}

export function TasksToolbar({
  total,
  query,
  setQuery,
  onClickNewTask,
}: Props) {
  const changeStatus = (status?: TaskStatus) => {
    setQuery((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  const changeSort = (sort: "asc" | "desc") => {
    setQuery((prev) => ({
      ...prev,
      sort,
      page: 1,
    }));
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PrincipalHeader
        title="My Tasks"
        subTitle={total != 0 ? `Total tasks:(${total.toString()})` : undefined}
      />

      <div className="flex items-center gap-3">
        {/* STATUS FILTER */}
        <Select
          value={query.status ?? "ALL"}
          onValueChange={(value) =>
            changeStatus(value === "ALL" ? undefined : (value as TaskStatus))
          }
        >
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="TODO">Todo</SelectItem>
            <SelectItem value="IN_PROGRESS">In progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>

        {/* SORT */}
        <Select
          value={query.sort ?? "desc"}
          onValueChange={(value) => changeSort(value as "asc" | "desc")}
        >
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">Oldest</SelectItem>
            <SelectItem value="desc">Newest</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onClickNewTask}>New Task</Button>
      </div>
    </div>
  );
}
