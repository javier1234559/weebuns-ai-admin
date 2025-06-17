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
import { Skeleton } from "@/components/ui/skeleton";
import AppPagination from "@/components/common/app-pagination";
import LoadingPage from "@/pages/loading";
import { formatCurrency } from "@/lib/format";
import { formatDateTime } from "@/lib/date";

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
              <TableHead>Thời gian thanh toán</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="py-4">
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
                    <TableCell className="font-medium py-4">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary">
                        {paymentType?.label || transaction.paymentType}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      {formatCurrency(
                        transaction.amount,
                        transaction.currency,
                        true,
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.tokenAmount}
                    </TableCell>
                    <TableCell className="py-4">
                      {formatDateTime(new Date(transaction.paymentDate))}
                    </TableCell>
                    <TableCell className="py-4">
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
