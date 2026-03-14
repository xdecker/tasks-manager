"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "../interfaces/task.interface";

interface props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const statusStyles = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

const statusIcons = {
  TODO: ListTodo,
  IN_PROGRESS: Clock,
  DONE: CheckCircle2,
};

export const TaskCard = ({ task, onEdit, onDelete }: props) => {
  const StatusIcon = statusIcons[task.status];

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
            statusStyles[task.status]
          }`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {task.status.replace("_", " ")}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="font-semibold text-lg leading-none">{task.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {task.description}
        </p>

        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition">
          <Button onClick={onEdit} size="icon" variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>

          <Button onClick={onDelete} size="icon" variant="ghost">
            <Trash2 className="h-4 w-4 text-red-800" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
