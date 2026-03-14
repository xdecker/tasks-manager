import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters").max(100),

  description: z
    .string()
    .max(300, "Description too long")
    .optional()
    .or(z.literal("")),

  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;
