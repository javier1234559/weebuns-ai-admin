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
import { Bell, CreditCard, /* FileText */ Send, Users } from "lucide-react";
import { BookOpen, Gauge } from "lucide-react";
import { SecondaryMenu } from "@/components/layout/sidebar/nav-secondary";
import { IMenu } from "@/components/layout/sidebar/menu";
import { RouteNames } from "@/constraints/route-name";

export const menu: IMenu[] = [
  {
    title: "Dashboard",
    icon: Gauge,
    to: RouteNames.Admin,
  },
  {
    title: "Người dùng",
    icon: Users,
    to: "",
    children: [
      {
        title: "Tất cả",
        to: RouteNames.AdminUsers,
        icon: Users,
      },
      {
        title: "Tạo mới",
        to: RouteNames.AdminUserCreate,
        icon: Users,
      },
    ],
  },
  {
    title: "Bài học",
    icon: BookOpen,
    to: "",
    children: [
      {
        title: "Tất cả",
        to: RouteNames.AdminLessons,
        icon: BookOpen,
      },
    ],
  },
  // {
  //   title: "Bài viết",
  //   icon: FileText,
  //   to: RouteNames.AdminArticles,
  // },
  {
    title: "Thông báo hệ thống",
    icon: Bell,
    to: RouteNames.AdminNotification,
  },
  {
    title: "Doanh thu",
    icon: CreditCard,
    to: RouteNames.AdminRevenue,
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

interface SidebarAdminLayoutProps {
  children: React.ReactNode;
}

export function SidebarAdminLayout({ children }: SidebarAdminLayoutProps) {
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
