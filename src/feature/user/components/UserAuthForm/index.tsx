import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRedirectUrl } from "@/feature/user/utils";
import { useRoleStatus } from "@/feature/user/hooks/useRoleStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { RouteNames } from "@/constraints/route-name";
import { ROLES } from "@/constraints";
import { ILoginForm, loginFormSchema } from "./schema";
import { useLogin } from "@/feature/user/hooks/useUserQueries";
import { IUser, useAuthStore } from "@/stores/auth-store";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  onRoleSwitch?: () => void;
};

// const fakeUsers = [
//   { email: 'teacher@gmail.com', password: '123456', roles: [ROLES.TEACHER] },
//   { email: 'admin@gmail.com', password: '123456', roles: [ROLES.ADMIN] }
// ];

function UserAuthForm({
  className,
  onRoleSwitch,
  ...props
}: UserAuthFormProps) {
  const redirectUrl = getRedirectUrl();
  const navigate = useNavigate();
  const { role } = useRoleStatus();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const loginMutation = useLogin();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: ILoginForm) {
    try {
      const user = await loginMutation.mutateAsync(values);

      if (!user.user) {
        throw new Error("Tài khoản hoặc mật khẩu không chính xác");
      }

      if (role && !user.user.role.includes(role)) {
        throw new Error(
          `Tài khoản này không có quyền đăng nhập với vai trò ${role}`,
        );
      }

      setUser(user.user as IUser);
      setToken(user.access_token);
      toast.success("Đăng nhập thành công!");

      if (redirectUrl) {
        navigate(redirectUrl, { replace: true });
      } else {
        if (user.user.role.includes(ROLES.ADMIN)) {
          navigate(RouteNames.Admin, { replace: true });
        } else if (user.user.role.includes(ROLES.TEACHER)) {
          navigate(RouteNames.Teacher, { replace: true });
        } else {
          navigate(RouteNames.Home, { replace: true });
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Đã xảy ra lỗi trong quá trình đăng nhập");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {loginMutation.error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : "Đã xảy ra lỗi"}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your.email@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={loginMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoCapitalize="none"
                      autoComplete="current-password"
                      autoCorrect="off"
                      disabled={loginMutation.isPending}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-1 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </Form>

      {/* Liên kết để quay lại trang chọn role */}
      <div className="text-center text-sm">
        <Link
          to="/"
          className="text-primary hover:underline"
          onClick={onRoleSwitch}
        >
          Quay lại trang chọn vai trò
        </Link>
      </div>
    </div>
  );
}

export default UserAuthForm;
