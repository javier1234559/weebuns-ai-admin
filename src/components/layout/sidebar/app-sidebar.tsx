import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import {
  NavSecondary,
  SecondaryMenu,
} from "@/components/layout/sidebar/nav-secondary";
import { IMenu } from "@/components/layout/sidebar/menu";
import { RouteNames } from "@/constraints/route-name";
import { globalConfig } from "@/config";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { useAuthStore } from "@/stores/auth-store";
import { UserRole } from "@/services/swagger-types";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menus: IMenu[];
  navSecondary: SecondaryMenu[];
}

export function AppSidebar({ menus, navSecondary, ...props }: AppSidebarProps) {
  const { user } = useAuthStore();

  const title = user?.role === UserRole.Admin ? "Admin" : "Teacher";

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="thin-scrollbar"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={RouteNames.Home}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {globalConfig.APP_NAME} {title}
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
