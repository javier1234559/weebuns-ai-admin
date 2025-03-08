import { z } from "zod";
import { User } from "@/services/swagger-types";

export type Role = User["role"];

export const userProfileSchema = z.object({
  userId: z.string(),
  avatar: z.string(),
  password: z.string(),
  birthdate: z.date(),
  registeredAt: z.date(),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .default(""),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email()
    .default(""),
  bio: z.string().max(160).min(4).default(""),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional()
    .default([]),
});

export type IUserProfile = z.infer<typeof userProfileSchema>;
export const userStatuses = ["active", "inactive", "busy"] as const;

export const userRoles = ["user", "admin", "teacher"] as const;

export const userSchema = z.object({
  id: z.string(),
  amount: z.string(),
  status: z.enum(userStatuses),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string(),
  createdAt: z.string(),
  role: z.enum(userRoles),
  bio: z.string(),
});

export type IUsers = z.infer<typeof userSchema>;

export const userStatus = ["active", "inactive", "pending"] as const;
