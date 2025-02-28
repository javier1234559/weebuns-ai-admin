import { ThemeSwitcher } from "@/theme/theme-switcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-screen">
    <ThemeSwitcher />
    <div className="flex-1">
      {children}
    </div>
  </div>;
}
