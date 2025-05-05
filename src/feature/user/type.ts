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
  username: z.string(),
  email: z.string(),
  role: z.enum(["admin", "teacher", "user"]),
  profilePicture: z.string().optional(),
  createdAt: z.string(),
  isEmailVerified: z.boolean(),
  bio: z.string(),
});

export const userStatus = ["active", "inactive", "pending"] as const;

export type UserRole = "admin" | "teacher" | "user";
export type AuthProvider = "local" | "google" | "facebook";

export interface TeacherProfile {
  id: string;
  userId: string;
  specialization: string[];
  qualification: string | null;
  teachingExperience: number | null;
  hourlyRate: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StudentProfile {
  id: string;
  userId: string;
  targetStudyDuration: number | null;
  targetReading: number | null;
  targetListening: number | null;
  targetWriting: number | null;
  targetSpeaking: number | null;
  nextExamDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IUsers {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
  authProviderId: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  isEmailVerified: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  teacherProfile: TeacherProfile | null;
  studentProfile: StudentProfile | null;
}

export interface PaginationResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UsersResponse {
  data: IUsers[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
