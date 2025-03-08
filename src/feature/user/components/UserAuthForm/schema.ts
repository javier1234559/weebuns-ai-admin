import { LoginDto } from "@/services/swagger-types";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
}) satisfies z.ZodType<LoginDto>;

export type ILoginForm = z.infer<typeof loginFormSchema>;
