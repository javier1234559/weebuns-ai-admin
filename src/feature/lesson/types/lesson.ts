import { Lesson as LessonSwagger } from "@/services/swagger-types";

export type ContentStatus = "draft" | "published" | "private" | "deleted";
export type LessonType = "practice" | "test";
export type LessonSkill = "reading" | "listening" | "speaking" | "writing";
export type LessonLevel = "beginner" | "intermediate" | "advanced";
export type LessonTopic = "ielts" | "toeic";

export type Lesson = LessonSwagger;

export const IELTS_SKILLS = ["writing", "reading", "listening", "speaking"];
export const LESSONS_STATUS = ["all", "draft", "published", "deleted"];
export const LEVELS = ["all", "beginner", "intermediate", "advanced"];
export const IELTS_TOPICS = ["IELTS", "TOEIC"] as const;

export const LESSON_TYPE_TUPLE = ["practice", "test"] as const;
export const LESSON_LEVEL_TUPLE = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export const LESSON_STATUS_TUPLE = [
  "draft",
  "published",
  "private",
  "deleted",
] as const;
export const LESSON_TOPIC_TUPLE = ["ielts", "toeic"] as const;
