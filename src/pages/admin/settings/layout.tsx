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
      href: RouteNames.AdminSettingsProfile,
    },
    {
      title: "Appearance",
      href: RouteNames.AdminSettingsAppearance,
    },
    {
      title: "Notifications",
      href: RouteNames.AdminNotificationSettings,
    },
    {
      title: "Payment",
      href: RouteNames.AdminPayment,
    },
    {
      title: "History",
      href: RouteNames.AdminHistory,
    },
  ];
  return (
    <div className="space-y-6 p-10 py-0 md:block ">
      <div className="relative flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6 ">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {children}
      </div>
    </div>
  );
}
