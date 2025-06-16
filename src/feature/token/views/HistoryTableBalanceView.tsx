import AppError from "@/components/common/app-error";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useWithdrawalRequests } from "@/feature/token/hooks/useToken";
import { useState } from "react";
import usePaginationUrl from "@/hooks/use-pagination-url";
import WithDrawTokenRequestTableList from "../components/WithDrawTokenRequestTableList";
import { PaymentStatus } from "@/feature/token/type";
import { useAuthStore } from "@/stores/auth-store";

const statusTypes = [
  { id: "all", label: "Tất cả" },
  { id: "completed", label: "Hoàn thành", variant: "default" },
  { id: "pending", label: "Đang xử lý", variant: "secondary" },
  { id: "failed", label: "Thất bại", variant: "destructive" },
  { id: "refunded", label: "Hoàn tiền", variant: "outline" },
];

export default function HistoryTableBalanceView() {
  const { user } = useAuthStore();
  const [statusFilter, setStatusFilter] = useState("all");

  const { search, searchParam, setSearch, page, perPage, updateQueryParams } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const { data, isLoading, isError, error } = useWithdrawalRequests({
    ...(searchParam && { search: searchParam }),
    ...(statusFilter !== "all" && { status: statusFilter as PaymentStatus }),
    ...(user?.role === "teacher" && { userId: user.id }),
    page,
    perPage,
  });

  if (isError) {
    return <AppError error={error} />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Lịch sử rút tiền
          </h1>
          <p className="text-sm text-muted-foreground">
            Lịch sử rút tiền của giáo viên
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm giao dịch..."
              className="pl-8 w-full sm:w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusTypes.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <WithDrawTokenRequestTableList
        transactions={data?.data || []}
        isLoading={isLoading}
        onUpdateQueryParams={updateQueryParams}
        page={page}
        totalPages={data?.pagination.totalPages || 0}
        isShowApproveButton={user?.role === "admin"}
      />
    </div>
  );
}
