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
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { RouteNames } from "@/constraints/route-name"
import { ILoginForm, loginFormSchema } from "@/feature/user/type"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

// Mock user data for development/testing
const fakeUsers = [
  { email: 'user@gmail.com', password: '123456', roles: ['user'] },
  { email: 'admin@gmail.com', password: '123456', roles: ['admin'] }
];

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // Get redirect URL from query params or default to dashboard
  const redirectUrl =
    new URLSearchParams(window.location.search).get("redirectTo") ||
    RouteNames.Dashboard

  // const loginMutation = useUserLoginMutation()
  const navigate = useNavigate()

  // Initialize form with default values for easier testing
  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Check credentials against mock data
    const user = fakeUsers.find(user =>
      user.email === values.email && user.password === values.password
    );

    if (user) {
      // Store auth info in localStorage (for development purposes)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ email: user.email, roles: user.roles }));
      navigate(redirectUrl, {
        replace: true,
      })

      // Handle successful login with toast notification
      // toast.promise(loginMutation.mutateAsync(values), {
      //   position: "top-center",
      //   loading: "Đang đăng nhập...",
      //   success: () => {
      //     navigate(redirectUrl, {
      //       replace: true,
      //     })
      //     return "Đăng nhập thành công!"
      //   },
      //   error: (error) => {
      //     const errorMessage = getFetchErrorMessage(error)
      //     return errorMessage
      //   },
      // })
    } else {
      // Show error for invalid credentials
      toast.error("Tài khoản hoặc mật khẩu không chính xác")
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} aria-disabled={false}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
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
                <FormItem className="grid gap-1">
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      autoCorrect="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>
              Đăng nhập với Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm
