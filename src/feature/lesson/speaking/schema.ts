import { z } from "zod";
import {
  LESSON_TYPE_TUPLE,
  LESSON_LEVEL_TUPLE,
  LESSON_STATUS_TUPLE,
  LESSON_TOPIC_TUPLE,
} from "../types/lesson";

export const speakingLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable(),
  lessonType: z.enum(LESSON_TYPE_TUPLE),
  level: z.enum(LESSON_LEVEL_TUPLE),
  topic: z.enum(LESSON_TOPIC_TUPLE),
  timeLimit: z.number().nullable(),
  content: z
    .object({
      topicText: z.string().min(1, "Topic text is required"),
      promptText: z.string().min(1, "Prompt text is required"),
      followupExamples: z
        .array(z.string())
        .min(1, "At least one follow-up example is required"),
      backgroundKnowledge: z
        .string()
        .min(1, "Background knowledge is required"),
    })
    .nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().default(""),
  status: z.enum(LESSON_STATUS_TUPLE),
  createdById: z.string().optional(),
});

export type SpeakingLessonFormValues = z.infer<typeof speakingLessonSchema>;

export const defaultValues: SpeakingLessonFormValues = {
  title: "Travel and Tourism",
  description: "A speaking lesson about travel experiences",
  topic: "ielts",
  level: "beginner",
  timeLimit: 30,
  lessonType: "practice",
  content: {
    topicText: "Travel and Tourism",
    promptText: "Let's practice speaking English",
    followupExamples: [
      "What places have you visited?",
      "How was your last trip?",
      "Do you prefer traveling alone or with friends?",
      "What country would you like to visit next and why?",
    ],
    backgroundKnowledge:
      "Focus on travel experiences, cultural differences, and common travel vocabulary such as 'hotel', 'sightseeing', 'itinerary', 'passport'.",
  },
  tags: ["ielts", "speaking", "travel", "tourism"],
  thumbnailUrl: "",
  status: "published",
  createdById: undefined,
};
