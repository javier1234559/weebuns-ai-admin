import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  ChevronsUpDown,
  Clock,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/stores/auth-store";

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, removeUser } = useAuthStore();

  const handleLogout = () => {
    removeUser();
    navigate(RouteNames.SignIn);
  };

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.email} alt={user.email} />
                <AvatarFallback className="rounded-lg">
                  {user.email.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.email}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.email} alt={user.email} />
                  <AvatarFallback className="rounded-lg">
                    {user.email.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.email}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-1.5"
                asChild
              >
                <Link to={RouteNames.AdminSettingsProfile}>
                  <BadgeCheck className="size-4" />
                  <span>Tài khoản</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-1.5"
                asChild
              >
                <Link to={RouteNames.AdminPayment}>
                  <CreditCard className="size-4" />
                  <span>Phương thức thanh toán</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-1.5"
                asChild
              >
                <Link to={RouteNames.AdminHistory}>
                  <Clock className="size-4" />
                  <span>Lịch sử</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="flex items-center gap-2 px-2 py-1.5"
              onSelect={handleLogout}
            >
              <LogOut className="size-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
