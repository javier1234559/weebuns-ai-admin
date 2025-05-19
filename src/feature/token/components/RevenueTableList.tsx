import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import AppPagination from "@/components/common/app-pagination";
import LoadingPage from "@/pages/loading";

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

interface RevenueTableListProps {
  transactions: any[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onUpdateQueryParams: (params: { page?: number }) => void;
}

export default function RevenueTableList({
  transactions,
  isLoading,
  onUpdateQueryParams,
  page,
  totalPages,
}: RevenueTableListProps) {
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
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
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => {
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

        <div className="flex justify-end my-4 mx-4">
          {transactions.length > 0 && (
            <div className="ml-auto w-fit">
              <div className="mt-8 flex justify-center">
                <AppPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(page) => onUpdateQueryParams({ page })}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}