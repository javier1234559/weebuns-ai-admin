import { StatsCard } from "@/feature/analysis/components/StatsCard";
import { TrendingDown, Users, CoinsIcon, HandCoins } from "lucide-react";
import { StatType, type AnalyticsData } from "../types/analysis.types";
import { LucideIcon } from "lucide-react";
import { useStatsAnalysis } from "../hooks/useStats";
import { AnalysisViewSkeleton } from "@/feature/analysis/components/AnalysisViewSkeleton";

const getIcon = (type: StatType): LucideIcon => {
  const icons: Record<StatType, LucideIcon> = {
    circulating: HandCoins,
    total_supply: CoinsIcon,
    commission: TrendingDown,
    user: Users,
  };
  return icons[type];
};

export default function AnalysisView() {
  const { data: statsAnalysis, isLoading } = useStatsAnalysis();
  const titles: Record<StatType, string> = {
    circulating: "Token Đang Lưu Hành",
    total_supply: "Tổng Cung Token",
    commission: "Token Trả Hoa Hồng",
    user: "Tổng Người Dùng",
  };

  if (isLoading) {
    return <AnalysisViewSkeleton />;
  }

  if (!statsAnalysis) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 lg:px-0">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Thống kê tổng quan
          </h1>
          <p className="text-gray-600">
            Theo dõi và thống kê token, giao dịch và người dùng
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 lg:p-0">
          {(
            Object.entries(statsAnalysis) as [
              keyof AnalyticsData,
              AnalyticsData[keyof AnalyticsData],
            ][]
          ).map(([key, stat]) => {
            const Icon = getIcon(stat.type);
            return (
              <StatsCard
                key={key}
                title={titles[stat.type]}
                value={stat.value.toLocaleString("vi-VN")}
                description={stat.description}
                icon={<Icon />}
                valueChange={stat.changedValue}
                lastUpdate={stat.updateTime}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
