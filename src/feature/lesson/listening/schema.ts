import { z } from "zod";
import { questionSchema } from "../quiz/schema";
import {
  LESSON_TYPE_TUPLE,
  LESSON_LEVEL_TUPLE,
  LESSON_STATUS_TUPLE,
  LESSON_TOPIC_TUPLE,
} from "../types/lesson";

export const listeningLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable(),
  lessonType: z.enum(LESSON_TYPE_TUPLE),
  level: z.enum(LESSON_LEVEL_TUPLE),
  topic: z.enum(LESSON_TOPIC_TUPLE),
  timeLimit: z.number().nullable(),
  content: z
    .object({
      audio_url: z.string().min(1, "Audio URL is required"),
      questions: z.array(questionSchema),
    })
    .nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().nullable(),
  status: z.enum(LESSON_STATUS_TUPLE),
  createdById: z.string().optional(),
});

export type ListeningLessonFormValues = z.infer<typeof listeningLessonSchema>;

export const defaultValues: ListeningLessonFormValues = {
  title: "",
  description: null,
  topic: "ielts",
  level: "beginner",
  timeLimit: 30,
  lessonType: "practice",
  content: {
    audio_url: "",
    questions: [
      {
        id: "1",
        question: "",
        answer_list: [{ answer: "" }, { answer: "" }],
        right_answer: "",
        is_bookmark: false,
      },
    ],
  },
  tags: [],
  thumbnailUrl: null,
  status: "draft",
  createdById: undefined,
};
