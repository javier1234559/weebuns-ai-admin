import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { questionSchema } from "../quiz/schema";

export const readingLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  topic: z.string().min(1, "Topic is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  time_limit: z.coerce.number().min(1, "Time limit must be at least 1 minute"),
  lesson_type: z.string().min(1, "Lesson type is required"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type ReadingLessonFormValues = z.infer<typeof readingLessonSchema>;

export const defaultValues = {
  title: "",
  description: "",
  topic: "",
  level: "intermediate",
  time_limit: 30,
  lesson_type: "Practice Test",
  content: "",
  questions: [
    {
      id: uuidv4(),
      question: "",
      options: ["", ""],
      answer: "",
    },
  ],
  status: "draft",
};
