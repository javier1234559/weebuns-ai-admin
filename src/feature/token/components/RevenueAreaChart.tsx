import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface RevenueData {
  name: string;
  total: number;
}

interface RevenueAreaChartProps {
  data: RevenueData[];
}

export function RevenueAreaChartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      <div className="h-[300px]">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

export default function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#adfa1d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#adfa1d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1a1a",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
          formatter={(value: number) => [`$${value}`, "Doanh thu"]}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#adfa1d"
          fillOpacity={1}
          fill="url(#colorTotal)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
