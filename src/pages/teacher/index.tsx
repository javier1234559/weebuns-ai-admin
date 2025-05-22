import TeacherBalanceView from "@/feature/token/views/TeacherBalanceView";
import { useAuthStore } from "@/stores/auth-store";

export default function TeacherPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-4xl font-bold mb-4">Xin chào {user?.username}</h1>
      <TeacherBalanceView />
    </div>
  );
}
