import { SidebarNav } from "@/feature/setting/components/sidebar-nav";
import { RouteNames } from "@/constraints/route-name";
export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNavItems = [
    {
      title: "Profile",
      href: RouteNames.TeacherSettingsProfile,
    },
    {
      title: "Appearance",
      href: RouteNames.TeacherSettingsAppearance,
    },
    {
      title: "Notifications",
      href: RouteNames.TeacherNotificationSettings,
    },
    {
      title: "Payment",
      href: RouteNames.TeacherPayment,
    },
    {
      title: "History",
      href: RouteNames.TeacherHistory,
    },
  ];
  return (
    <div className="space-y-6 p-10 py-0 md:block ">
      <div className="relative flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="w-full lg:w-1/6 ">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {children}
      </div>
    </div>
  );
}
