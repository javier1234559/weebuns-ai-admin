import AppError from "@/components/common/app-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevenueAreaChart, {
  RevenueAreaChartSkeleton,
} from "@/feature/token/components/RevenueAreaChart";
import { revenueData } from "@/feature/token/data";
import { useAdminTransactions } from "@/feature/token/hooks/useToken";
import { useMemo } from "react";

interface RevenueData {
  name: string;
  total: number;
}

const formatTestData = (): RevenueData[] => {
  const testData = revenueData[0].data;

  const monthlyRevenue = testData.reduce(
    (acc: Record<string, number>, transaction) => {
      const date = new Date(transaction.paymentDate);
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += transaction.amount;
      return acc;
    },
    {},
  );

  return Object.entries(monthlyRevenue)
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months.indexOf(a.name) - months.indexOf(b.name);
    });
};

// const formatRealData = (
//   data: { data: Transaction[] } | undefined,
// ): RevenueData[] => {
//   if (!data?.data) return [];

//   const monthlyRevenue = data.data.reduce(
//     (acc: Record<string, number>, transaction: Transaction) => {
//       const date = new Date(transaction.paymentDate);
//       const month = date.toLocaleString("default", { month: "short" });

//       if (!acc[month]) {
//         acc[month] = 0;
//       }
//       acc[month] += transaction.amount;
//       return acc;
//     },
//     {},
//   );

//   return Object.entries(monthlyRevenue)
//     .map(([name, total]) => ({
//       name,
//       total,
//     }))
//     .sort((a, b) => {
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       return months.indexOf(a.name) - months.indexOf(b.name);
//     });
// };

export default function RevenueChartView() {
  const { data, isLoading, isError, error } = useAdminTransactions({});

  const formattedData = useMemo(() => {
    // Uncomment one of these lines to switch between test and real data
    return formatTestData();
    // return formatRealData(data);
  }, [data]);

  if (isError) {
    return <AppError error={error} />;
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Doanh thu</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {isLoading ? (
          <RevenueAreaChartSkeleton />
        ) : (
          <RevenueAreaChart data={formattedData} />
        )}
      </CardContent>
    </Card>
  );
}
