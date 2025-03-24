import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const questionSchema = z.object({
  id: z
    .string()
    .optional()
    .default(() => uuidv4()),
  question: z.string().min(1, "Question is required"),
  right_answer: z.string().min(1, "Correct answer is required"),
  answer_list: z
    .array(
      z.object({
        answer: z.string(),
      }),
    )
    .min(2, "At least 2 options are required"),
  is_bookmark: z.boolean().default(false),
  selected_answer: z.string().optional(),
});

export type Question = z.infer<typeof questionSchema>;
