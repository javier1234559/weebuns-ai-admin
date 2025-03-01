import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { z } from "zod"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { cn, setLocalStorage } from "@/lib/utils"
import { ILoginForm, loginFormSchema } from "@/feature/user/type"
import { getRedirectUrl } from "@/feature/user/utils"
import { useRoleStatus } from "@/feature/user/hooks/useRoleStatus"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { RouteNames } from "@/constraints/route-name"
import { ROLES } from "@/constraints"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  onRoleSwitch?: () => void;
}

const fakeUsers = [
  { email: 'teacher@gmail.com', password: '123456', roles: [ROLES.TEACHER] },
  { email: 'admin@gmail.com', password: '123456', roles: [ROLES.ADMIN] }
];

function UserAuthForm({ className, onRoleSwitch, ...props }: UserAuthFormProps) {
  const redirectUrl = getRedirectUrl()
  const navigate = useNavigate()
  const { role} = useRoleStatus()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)



  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError(null)
    setIsLoading(true)

    try {
      await new Promise(r => setTimeout(r, 1000))

      const user = fakeUsers.find(user =>
        user.email === values.email && user.password === values.password
      )

      if (!user) {
        setError("Tài khoản hoặc mật khẩu không chính xác")
        return
      }

      if (role && !user.roles.includes(role)) {
        setError(`Tài khoản này không có quyền đăng nhập với vai trò ${role}`)
        return
      }

      setLocalStorage('isAuthenticated', true)
      setLocalStorage('user', { email: user.email, roles: user.roles })

      toast.success("Đăng nhập thành công!")

      if (redirectUrl) {
        navigate(redirectUrl, { replace: true })
      } else {
        if (user.roles.includes(ROLES.ADMIN)) {
          navigate(RouteNames.Admin, { replace: true })
        } else if (user.roles.includes(ROLES.TEACHER)) {
          navigate(RouteNames.Teacher, { replace: true })
        } else {
          navigate(RouteNames.Home, { replace: true })
        }
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>

      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
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
                    disabled={isLoading}
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
                      disabled={isLoading}
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
  )
}

export default UserAuthForm
