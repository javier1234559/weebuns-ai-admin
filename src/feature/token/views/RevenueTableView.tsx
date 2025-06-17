import AppError from "@/components/common/app-error";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useAdminTransactions } from "@/feature/token/hooks/useToken";
import { useState } from "react";
import usePaginationUrl from "@/hooks/use-pagination-url";
import RevenueTableList from "../components/RevenueTableList";
import { PaymentStatus } from "@/feature/token/type";

const paymentTypes = [
  { id: "all", label: "Tất cả" },
  { id: "bank", label: "Chuyển khoản" },
  { id: "momo", label: "Ví MoMo" },
  { id: "zalopay", label: "Ví ZaloPay" },
  { id: "internal", label: "Nội bộ" },
];

const statusTypes = [
  { id: "all", label: "Tất cả" },
  { id: "completed", label: "Hoàn thành", variant: "default" },
  { id: "pending", label: "Đang xử lý", variant: "secondary" },
  { id: "failed", label: "Thất bại", variant: "destructive" },
];

export default function RevenueTableView() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { search, searchParam, setSearch, page, perPage, updateQueryParams } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const { data, isLoading, isError, error } = useAdminTransactions({
    ...(searchParam && { search: searchParam }),
    ...(typeFilter !== "all" && { type: typeFilter }),
    ...(statusFilter !== "all" && { status: statusFilter as PaymentStatus }),
    page,
    perPage,
  });

  if (isError) {
    return <AppError error={error} />;
  }

  return (
    <div>
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

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Phương thức" />
            </SelectTrigger>
            <SelectContent>
              {paymentTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

      <RevenueTableList
        transactions={data?.data || []}
        isLoading={isLoading}
        onUpdateQueryParams={updateQueryParams}
        page={page}
        totalPages={data?.pagination.totalPages || 0}
      />
    </div>
  );
}
