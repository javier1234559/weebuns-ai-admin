import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { NavBreadcrumb } from "@/components/layout/sidebar/nav-breadcrumb";
import { SIDEBAR_COOKIE_NAME } from "@/constraints";
import { ThemeSwitcher } from "@/theme/theme-switcher";
import SidebarSearch from "@/components/layout/sidebar/side-bar-search";
import {
  Bell,
  BookCheck,
  BookOpenCheck,
  BookPlus,
  GraduationCap,
  Headphones,
  Send,
} from "lucide-react";
import { Gauge, BookOpen, Settings } from "lucide-react";
import { SecondaryMenu } from "@/components/layout/sidebar/nav-secondary";
import { IMenu } from "@/components/layout/sidebar/menu";
import { RouteNames } from "@/constraints/route-name";

export const menu: IMenu[] = [
  {
    title: "Tổng quan",
    icon: Gauge,
    to: RouteNames.Teacher,
  },
  {
    title: "Bài học",
    icon: GraduationCap,
    to: "",
    children: [
      {
        title: "Xem tất cả",
        icon: BookOpen,
        to: RouteNames.TeacherLessonShowAll,
      },
      {
        title: "Tạo bài học",
        icon: BookPlus,
        to: RouteNames.TeacherLessonCreate,
      },
      {
        title: "Chấm bài Writing",
        icon: BookCheck,
        to: RouteNames.TeacherLessonWritingGrading,
      },
      {
        title: "Xem thống kê Listening",
        icon: Headphones,
        to: RouteNames.TeacherLessonListeningGrading,
      },
      {
        title: "Xem thống kê Reading",
        icon: BookOpenCheck,
        to: RouteNames.TeacherLessonReadingGrading,
      },
    ],
  },
  {
    title: "Thông báo",
    icon: Bell,
    to: RouteNames.TeacherNotificationSettings,
  },
  {
    title: "Cài đặt",
    icon: Settings,
    to: RouteNames.TeacherSettings,
  },
] as const;

export const navSecondary: SecondaryMenu[] = [
  {
    title: "Feedback",
    url: "https://chat.com",
    icon: Send,
    external: true,
  },
];

interface SidebarTeacherLayoutProps {
  children: React.ReactNode;
}

export function SidebarTeacherLayout({ children }: SidebarTeacherLayoutProps) {
  const sidebarState = localStorage.getItem(SIDEBAR_COOKIE_NAME) === "true";

  return (
    <SidebarProvider defaultOpen={sidebarState}>
      <AppSidebar menus={menu} navSecondary={navSecondary} />
      <SidebarInset className="w-full overflow-hidden">
        <div className="sticky top-0 z-10">
          <header className="flex h-14 w-full shrink-0 items-center justify-between border-b bg-background/80 px-2 backdrop-blur-sm sm:h-16 sm:px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-0.5 sm:-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 hidden h-4 sm:block"
              />
              <NavBreadcrumb className="hidden sm:flex" menus={menu} />
            </div>
            <div className="ml-auto flex flex-1 items-center space-x-2 px-2 sm:px-4 md:max-w-96 lg:max-w-lg">
              <SidebarSearch menus={menu} />
              <ThemeSwitcher />
            </div>
          </header>
        </div>

        <ScrollArea className="flex h-[calc(100vh-5rem)] flex-col gap-4 p-2 pt-0 sm:h-[calc(100vh-5rem)] sm:p-4">
          <div className="p-2 sm:py-4">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
