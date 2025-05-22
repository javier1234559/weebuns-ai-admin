import { AuthProvider } from "@/services/swagger-types";
import { z } from "zod";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not be longer than 50 characters." })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must not be longer than 50 characters." })
    .optional(),
  bio: z
    .string()
    .max(500, { message: "Bio must not be longer than 500 characters." })
    .optional(),
  profilePicture: z.string().optional(),
  longBio: z.string().optional(),
  introVideoUrlEmbed: z.string().optional(),
  certifications: z.string().optional(),
  teachingExperience: z.string().optional(),
  other: z.string().optional(),
  authProvider: z.nativeEnum(AuthProvider),
  isEmailVerified: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultValues: ProfileFormValues = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  bio: "",
  profilePicture: "",
  longBio: "",
  introVideoUrlEmbed: "",
  certifications: "",
  teachingExperience: "",
  other: "",
  authProvider: AuthProvider.Local,
  isEmailVerified: false,
};
