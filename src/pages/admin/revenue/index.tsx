import RevenueChartView from "@/feature/token/views/RevenueChartView";
import RevenueTableView from "@/feature/token/views/RevenueTableView";

export default function RevenuePage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý Doanh thu
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý doanh thu từ các khóa học và dịch vụ
          </p>
        </div>
      </div>
      <RevenueChartView />
      <div className="mt-6">
        <RevenueTableView />
      </div>
    </div>
  );
}
