import AppIcon from "@/components/common/app-icon"
import { Link } from "react-router-dom"
import UserAuthForm from "@/feature/user/components/UserAuthForm"

export default function LoginPage() {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <AppIcon icon="logo" className="mr-2 size-6" />
          Company Name
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">Testimonial quote here</p>
            <footer className="text-sm">Author name</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Đăng nhập
            </h1>
            <p className="text-sm text-muted-foreground">
              Đăng nhập vào hệ thống
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
              Điều khoản dịch vụ
            </Link>
            {" "}và{" "}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

