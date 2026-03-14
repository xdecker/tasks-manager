"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { ItemTask, TaskStatus } from "../interfaces/task.interface";

interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: ItemTask;
  onSubmit: (data: TaskFormData) => Promise<void>;
}

export function TaskFormModal({ open, onOpenChange, task, onSubmit }: Props) {
  const isEdit = !!task;

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TaskFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "TODO",
      });
    }
  }, [task, reset]);

  const submit = async (data: TaskFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* TITLE */}

          <div className="space-y-2">
            <Label>Title</Label>

            <Input
              placeholder="Task title"
              className={clsx({
                "border-red-500": errors.title,
              })}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              placeholder="Optional description"
              {...register("description")}
            />
          </div>

          {/* STATUS */}

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label>Status</Label>

                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="TODO">Todo</SelectItem>
                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          {/* ACTIONS */}

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Task"
                : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
