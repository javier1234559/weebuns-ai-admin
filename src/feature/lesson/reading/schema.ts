import { z } from "zod";
import { questionSchema } from "../quiz/schema";
import {
  LESSON_TYPE_TUPLE,
  LESSON_LEVEL_TUPLE,
  LESSON_STATUS_TUPLE,
  LESSON_TOPIC_TUPLE,
} from "../types/lesson";

export const readingLessonSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().nullable(),
  lessonType: z.enum(LESSON_TYPE_TUPLE),
  level: z.enum(LESSON_LEVEL_TUPLE),
  topic: z.enum(LESSON_TOPIC_TUPLE),
  timeLimit: z.number().nullable(),
  content: z
    .object({
      text: z.string().min(50, "Content must be at least 50 characters"),
      questions: z.array(questionSchema),
    })
    .nullable(),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().nullable(),
  status: z.enum(LESSON_STATUS_TUPLE),
  createdById: z.string().optional(),
});

export type ReadingLessonFormValues = z.infer<typeof readingLessonSchema>;

export const defaultValues: ReadingLessonFormValues = {
  title: "Office Policy Update",
  description:
    "A reading comprehension exercise about office attendance policy updates",
  topic: "ielts",
  level: "beginner",
  timeLimit: 30,
  lessonType: "practice",
  content: {
    text: "<p>To: All Staff </p><p>From: Human Resources Department </p><p>Subject: Updated Office Attendance Policy Dear Employees, We would like to inform you of an important update to our attendance policy. Starting next Monday, all employees must clock in using the new digital attendance system installed at the main entrance. This system will automatically record your arrival and departure times. Please ensure that you arrive no later than 9:00 A.M. and do not leave before 5:00 P.M. without prior approval from your supervisor. Employees who fail to follow this procedure three times within a month may be subject to a warning. If you have any questions, please contact the HR department.</p>",
    questions: [
      {
        id: "1",
        question: "What is the main purpose of this email?",
        answer_list: [
          { answer: "To announce a new employee benefit" },
          { answer: "To introduce a new attendance system" },
          { answer: "To promote an employee training session" },
          { answer: "To notify about a holiday schedule" },
        ],
        right_answer: "To introduce a new attendance system",
        is_bookmark: false,
      },
      {
        id: "2",
        question: "When will the new system be implemented?",
        answer_list: [
          { answer: "Tomorrow" },
          { answer: "Next Monday" },
          { answer: "This Friday" },
          { answer: "Next month" },
        ],
        right_answer: "Next Monday",
        is_bookmark: false,
      },
      {
        id: "3",
        question:
          "What will happen if an employee fails to follow the policy three times in a month?",
        answer_list: [
          { answer: "They will be fined" },
          { answer: "They will lose a bonus" },
          { answer: "They may receive a warning" },
          { answer: "They must attend a training" },
        ],
        right_answer: "They may receive a warning",
        is_bookmark: false,
      },
      {
        id: "4",
        question: "Where is the attendance system located?",
        answer_list: [
          { answer: "In each department" },
          { answer: "At the front desk" },
          { answer: "Online via mobile app" },
          { answer: "At the main entrance" },
        ],
        right_answer: "At the main entrance",
        is_bookmark: false,
      },
    ],
  },
  tags: ["ielts", "reading", "office", "policy"],
  thumbnailUrl: null,
  status: "published",
  createdById: undefined,
};
