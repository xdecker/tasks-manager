import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().nonempty("password must be valid"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
