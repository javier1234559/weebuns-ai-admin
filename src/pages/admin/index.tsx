import { useAuthStore } from "@/stores/auth-store";
import RevenuePage from "./revenue";

export default function AdminPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h1 className="text-7xl font-bold">Xin chào {user?.username}</h1>
      <RevenuePage />
    </div>
  );
}
