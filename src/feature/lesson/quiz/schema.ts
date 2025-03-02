import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const questionSchema = z.object({
  id: z
    .string()
    .optional()
    .default(() => uuidv4()),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required"),
  answer: z.string().min(1, "Correct answer is required"),
});

export type Question = z.infer<typeof questionSchema>;
