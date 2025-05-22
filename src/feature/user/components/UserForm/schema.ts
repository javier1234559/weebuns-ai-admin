import { z } from "zod";

export const createUserFormSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(["user", "admin", "teacher"]),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

export const defaultValues: CreateUserFormValues = {
  username: "teacher_two",
  email: "teacher_two@gmail.com",
  password: "123456",
  firstName: "Teacher",
  lastName: "Two",
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeG3neC0ZxPRBRBQ2y2dHnkIujON02lC6sZg&s",
  bio: "This is a test bio",
  role: "teacher",
};
