import TeacherBalanceView from "@/feature/token/views/TeacherBalanceView";
import HistoryTableBalanceView from "@/feature/token/views/HistoryTableBalanceView";

export default function Page() {
  return (
    <div className="p-4 mx-auto">
      <div>
        <h3 className="text-lg font-medium">Thanh toán</h3>
        <p className="text-sm text-muted-foreground">Thanh toán của bạn</p>
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
