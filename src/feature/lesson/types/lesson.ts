import { Lesson as LessonSwagger } from "@/services/swagger-types";

export type ContentStatus = "draft" | "published" | "private" | "deleted";

export type Lesson = LessonSwagger;

export const IELTS_SKILLS = ["writing", "reading", "listening", "speaking"];
export const LESSONS_STATUS = ["all", "draft", "published", "deleted"];
export const LEVELS = ["all", "beginner", "intermediate", "advanced"];
export const IELTS_TOPICS = ["IELTS", "TOEIC"] as const;
