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
import UploadBankingImage from "@/components/feature/UploadBankingImage";

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
      bankingqr_image_url: user?.teacherProfile?.bankingqr_image_url ?? "",
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
          <CardTitle>Thông tin cá nhân</CardTitle>
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
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Tên đăng nhập của bạn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email liên hệ</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Email liên hệ của bạn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormDescription>Tên của bạn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormDescription>Họ của bạn</FormDescription>
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
                    <FormLabel>Phương thức đăng nhập</FormLabel>
                    <FormControl>
                      <div className="flex h-10 items-center">
                        {getAuthProviderBadge(field.value)}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Phương thức đăng nhập của bạn
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isEmailVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái email</FormLabel>
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
                    <FormDescription>Trạng thái xác thực email</FormDescription>
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
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <FormControl className="h-24">
                    <UploadAvatarImage
                      value={field.value ?? null}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Ảnh đại diện của bạn</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu ngắn</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Giới thiệu ngắn về bạn</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-6" />
            <h3 className="text-lg font-medium">Thông tin ngân hàng</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thông tin ngân hàng để nhận tiền
            </p>
            <FormField
              control={form.control}
              name="bankingqr_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh QR ngân hàng</FormLabel>
                  <FormControl>
                    <UploadBankingImage
                      value={field.value ?? null}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator className="my-6" />
            <h3 className="text-lg font-medium">Thông tin giáo viên</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Thông tin giáo viên của bạn
            </p>

            <FormField
              control={form.control}
              name="longBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu chi tiết</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your teaching experience and background"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Giới thiệu chi tiết về kinh nghiệm giảng dạy và trình độ của
                    bạn
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
                  <FormLabel>URL video giới thiệu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/embed/..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL video giới thiệu (YouTube embed URL)
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
                  <FormLabel>Chứng chỉ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your teaching certifications and qualifications"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Chứng chỉ và trình độ của bạn
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
                  <FormLabel>Kinh nghiệm giảng dạy</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your teaching experience"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Kinh nghiệm giảng dạy của bạn
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
                  <FormLabel>Thông tin khác</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information you'd like to share"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Thông tin khác về bạn</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Cập nhật..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
