import { z } from "zod";
import { questionSchema } from "../quiz/schema";

export const readingLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable(),
  lessonType: z.enum(["practice", "test"]),
  level: z.string().min(1, "Level is required"),
  topic: z.string().min(1, "Topic is required"),
  timeLimit: z.number().nullable(),
  content: z
    .object({
      text: z.string().min(50, "Content must be at least 50 characters"),
      questions: z.array(questionSchema),
    })
    .nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().nullable(),
  status: z.enum(["draft", "published", "private", "deleted"]),
  createdById: z.string().optional(),
});

export type ReadingLessonFormValues = z.infer<typeof readingLessonSchema>;

export const defaultValues = {
  title: "",
  description: null,
  topic: "ielts" as const,
  level: "intermediate" as const,
  timeLimit: 30,
  lessonType: "practice" as const,
  content: {
    text: "",
    questions: [
      {
        id: "1",
        question: "",
        answer_list: [{ answer: "" }, { answer: "" }],
        right_answer: "",
      },
    ],
  },
  tags: [],
  thumbnailUrl: null,
  status: "draft" as const,
  createdById: undefined,
};
