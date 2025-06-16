import TeacherBalanceView from "@/feature/token/views/TeacherBalanceView";
import HistoryTableBalanceView from "@/feature/token/views/HistoryTableBalanceView";
import { useAuthStore } from "@/stores/auth-store";
import NotificationViewList from "@/feature/notification/views/NotificationViewList";

export default function TeacherPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-4xl font-bold mb-4">Xin chào {user?.username}</h1>

      <div className="flex flex-col my-6 gap-4">
        <NotificationViewList />
      </div>

      <div className="flex flex-col my-6 gap-4">
        <TeacherBalanceView />
      </div>
      <div className="flex flex-col my-6 gap-4">
        <HistoryTableBalanceView />
      </div>
    </div>
  );
}
