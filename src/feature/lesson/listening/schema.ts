import { z } from "zod";
import { questionSchema } from "../quiz/schema";
import {
  LESSON_TYPE_TUPLE,
  LESSON_LEVEL_TUPLE,
  LESSON_STATUS_TUPLE,
  LESSON_TOPIC_TUPLE,
} from "../types/lesson";
import { CONTENT_STATUS_TEACHER } from "@/constraints";
import { ContentStatus } from "@/services/swagger-types";

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
      youtube_embed_url: z.string().nullable(),
      questions: z.array(questionSchema),
    })
    .nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string(),
  status: z.enum(LESSON_STATUS_TUPLE),
  createdById: z.string().optional(),
});

export type ListeningLessonFormValues = z.infer<typeof listeningLessonSchema>;

export const defaultValues: ListeningLessonFormValues = {
  title: "A Visit to the Café",
  description:
    "A listening comprehension exercise about a customer's experience at a café",
  topic: "toeic",
  level: "beginner",
  timeLimit: 30,
  lessonType: "practice",
  content: {
    audio_url: "",
    youtube_embed_url: "https://www.youtube.com/embed/58i-0Kul26I",
    questions: [
      {
        id: "1",
        question: "What did the speaker order?",
        answer_list: [
          { answer: "A chicken sandwich" },
          { answer: "A grilled chicken salad" },
          { answer: "A bowl of soup" },
          { answer: "A beef burger" },
        ],
        right_answer: "A grilled chicken salad",
        is_bookmark: false,
      },
      {
        id: "2",
        question: "Why did the speaker ask for the dressing on the side?",
        answer_list: [
          { answer: "They are allergic to it" },
          { answer: "They don't like the taste" },
          { answer: "They are trying to eat healthier" },
          { answer: "The waiter suggested it" },
        ],
        right_answer: "They are trying to eat healthier",
        is_bookmark: false,
      },
      {
        id: "3",
        question: "How much did the speaker pay for the meal?",
        answer_list: [
          { answer: "$9.75" },
          { answer: "$10.50" },
          { answer: "$11.20" },
          { answer: "$12.00" },
        ],
        right_answer: "$10.50",
        is_bookmark: false,
      },
    ],
  },
  tags: ["ielts", "listening", "café", "food", "healthy-eating"],
  thumbnailUrl: "",
  status: CONTENT_STATUS_TEACHER.PENDING as ContentStatus,
  createdById: undefined,
};
