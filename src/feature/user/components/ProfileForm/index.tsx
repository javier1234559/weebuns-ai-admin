import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { AuthProvider, type UserDto } from "@/services/swagger-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { defaultValues } from "./schema";
import { profileFormSchema } from "./schema";
import { ProfileFormValues } from "./schema";
import UploadAvatarImage from "@/components/feature/UploadAvatarImage";

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  isLoading: boolean;
  user: UserDto | null;
}

export default function ProfileForm({
  onSubmit,
  isLoading,
  user,
}: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultValues,
      username: user?.username ?? "",
      email: user?.email ?? "",
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      authProvider: user?.authProvider ?? AuthProvider.Local,
      isEmailVerified: user?.isEmailVerified ?? false,
      bio: user?.teacherProfile?.longBio ?? "",
      profilePicture: user?.profilePicture ?? "",
      longBio: user?.teacherProfile?.longBio ?? "",
      introVideoUrlEmbed: user?.teacherProfile?.introVideoUrlEmbed ?? "",
      certifications: user?.teacherProfile?.certifications ?? "",
      teachingExperience: user?.teacherProfile?.teachingExperience ?? "",
      other: user?.teacherProfile?.other ?? "",
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    await onSubmit(values);
  };

  const getAuthProviderBadge = (provider: AuthProvider) => {
    const variants = {
      [AuthProvider.Local]: "secondary",
      [AuthProvider.Google]: "destructive",
      [AuthProvider.Facebook]: "default",
    } as const;

    return (
      <Badge variant={variants[provider]}>
        {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex gap-4">
        <div className="flex flex-col gap-2">
          <CardTitle>Profile Information</CardTitle>
          <p className="text-sm text-muted-foreground">Tài khoản của bạn</p>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Your unique username</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your given name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormDescription>Your given name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormDescription>Your family name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Your unique username</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Your contact email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="authProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auth Provider</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center">
                        {getAuthProviderBadge(field.value)}
                      </div>
                    </FormControl>
                    <FormDescription>Your login method</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEmailVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Status</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center gap-2">
                        {field.value ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="size-5 text-green-500" />
                            <span className="text-sm">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <XCircle className="size-5 text-red-500" />
                            <span className="text-sm">Not Verified</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Verification status</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl className="h-24">
                    <UploadAvatarImage
                      value={field.value ?? null}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>URL to your profile picture</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief introduction about yourself
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-6" />
            <h3 className="text-lg font-medium">Teacher Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Additional information for your teacher profile
            </p>

            <FormField
              control={form.control}
              name="longBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your teaching experience and background"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of your teaching experience and
                    qualifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="introVideoUrlEmbed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/embed/..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL to your introduction video (YouTube embed URL)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your teaching certifications and qualifications"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your teaching certifications and qualifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teachingExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teaching Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your teaching experience"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your teaching experience and background
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information you'd like to share"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Other relevant information about your teaching
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
