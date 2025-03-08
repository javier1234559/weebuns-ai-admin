import AppIcon from "@/components/common/app-icon";
import { Link } from "react-router-dom";
import UserAuthForm from "@/feature/user/components/UserAuthForm";
import { globalConfig } from "@/config";
import { BookOpen, MessageSquare, Users } from "lucide-react";
import { useRoleStatus } from "@/feature/user/hooks/useRoleStatus";
import NavigateLogined from "@/provider/NavigateLogined";

export default function LoginPage() {
  const { isAdmin, isTeacher } = useRoleStatus();
  const roleDisplay = isAdmin
    ? "Quản trị viên"
    : isTeacher
      ? "Giáo viên"
      : "Học viên";

  const getLeftContentByRole = () => {
    const defaultContent = {
      title: "Nền tảng kết nối giáo viên và học viên hiệu quả",
      description:
        "Hỗ trợ giáo viên và quản trị viên quản lý lớp học, theo dõi tiến độ và tương tác với học viên một cách hiệu quả.",
    };

    if (isAdmin) {
      return {
        title: "Quản lý trung tâm tiếng Anh hiệu quả",
        description:
          "Hệ thống quản lý toàn diện giúp điều hành trung tâm, theo dõi hiệu suất và tối ưu hóa vận hành.",
      };
    }

    if (isTeacher) {
      return {
        title: "Công cụ giảng dạy toàn diện",
        description:
          "Hỗ trợ giáo viên quản lý lớp học, theo dõi tiến độ và tương tác với học viên một cách hiệu quả.",
      };
    }

    return defaultContent;
  };

  const content = getLeftContentByRole();

  return (
    <NavigateLogined>
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - English Center branding */}
        <div className="relative hidden h-full flex-col bg-primary p-10 text-primary-foreground dark:border-r lg:flex overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-primary opacity-90">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary-foreground opacity-10"></div>
            <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground opacity-5"></div>
          </div>

          {/* Logo and brand name */}
          <div className="relative z-20 flex items-center text-xl font-medium">
            <AppIcon icon="logo" className="mr-3 size-8" />
            <span className="text-primary-foreground font-bold">
              {globalConfig.APP_NAME}
            </span>
          </div>

          {/* English center specific content */}
          <div className="relative z-20 mt-20 space-y-4">
            <h2 className="text-2xl font-bold text-primary-foreground">
              {content.title}
            </h2>
            <p className="text-primary-foreground/80 mt-2">
              {content.description}
            </p>

            <ul className="space-y-4 mt-8">
              <li className="flex items-start">
                <div className="mr-4 rounded-full bg-primary-foreground/20 p-2">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">
                    Quản lý học liệu
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    Tổ chức nội dung giảng dạy và tài liệu học tập chuyên nghiệp
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 rounded-full bg-primary-foreground/20 p-2">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">
                    Tương tác học viên
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    Giao tiếp hiệu quả với học viên và phụ huynh mọi lúc mọi nơi
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 rounded-full bg-primary-foreground/20 p-2">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">
                    Quản lý lớp học
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    Theo dõi tiến độ, điểm danh và đánh giá học viên dễ dàng
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Testimonial */}
          {/* <div className="relative z-20 mt-auto">
          <div className="rounded-lg bg-primary-foreground/10 p-6 backdrop-blur">
            <blockquote className="space-y-2">
              <p className="text-lg leading-relaxed text-primary-foreground">
                "Hệ thống đã giúp trung tâm chúng tôi tiết kiệm 40% thời gian quản lý và tăng 25% hiệu quả giao tiếp với học viên và phụ huynh."
              </p>
              <footer className="flex items-center space-x-4 pt-2 border-t border-primary-foreground/20 mt-4">
                <div className="rounded-full bg-primary-foreground/20 p-1 h-8 w-8 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">ĐN</span>
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">Cô Đặng Ngọc</p>
                  <p className="text-sm text-primary-foreground/70">Quản lý Trung tâm Anh ngữ Tương Lai</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div> */}
        </div>

        {/* Right side - Login form */}
        <div className="lg:p-8 flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] bg-card p-8 rounded-lg shadow-sm border border-border">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
                Đăng nhập hệ thống
              </h1>
              <p className="text-sm text-muted-foreground">
                Sử dụng tài khoản {roleDisplay} được cấp bởi quản trị viên
              </p>
            </div>

            {/* Show logo only on mobile */}
            <div className="flex justify-center lg:hidden">
              <div className="flex items-center text-lg font-medium mb-4">
                <AppIcon icon="logo" className="mr-2 size-6" />
                <span className="font-bold">{globalConfig.APP_NAME}</span>
              </div>
            </div>

            <UserAuthForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              Bằng cách đăng nhập, bạn đồng ý với{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </NavigateLogined>
  );
}
