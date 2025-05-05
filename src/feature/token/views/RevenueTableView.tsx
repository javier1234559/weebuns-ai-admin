import AppError from "@/components/common/app-error";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useAdminTransactions } from "@/feature/token/hooks/useToken";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  { id: "refunded", label: "Hoàn tiền", variant: "outline" },
];

export default function RevenueTableView() {
  const { data, isLoading, isError, error } = useAdminTransactions({});
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const transactions = data?.data || [];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.transactionId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || transaction.paymentType === typeFilter;
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã giao dịch</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Số token</TableHead>
                <TableHead>Ngày thanh toán</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-[200px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const status = statusTypes.find(
                    (s) => s.id === transaction.status,
                  );
                  const paymentType = paymentTypes.find(
                    (p) => p.id === transaction.paymentType,
                  );

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.transactionId}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {paymentType?.label || transaction.paymentType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: transaction.currency,
                        }).format(transaction.amount)}
                      </TableCell>
                      <TableCell>{transaction.tokenAmount}</TableCell>
                      <TableCell>
                        {format(
                          new Date(transaction.paymentDate),
                          "dd/MM/yyyy",
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status?.variant as any}>
                          {status?.label || transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <p>Không tìm thấy giao dịch nào</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
