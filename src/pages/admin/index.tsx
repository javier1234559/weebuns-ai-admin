import { useAuthStore } from "@/stores/auth-store";
import RevenuePage from "./revenue";
import WithDrawRequestView from "@/feature/token/views/WithDrawRequestView";
import AnalysisView from "@/feature/analysis/view/AnalysisView";

export default function AdminPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col justify-center gap-4 w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-7xl font-bold">Xin chào {user?.username}</h1>

      <div className="flex flex-col my-6 gap-4 w-full">
        <AnalysisView />
      </div>

      <WithDrawRequestView />
      <RevenuePage />
    </div>
  );
}
