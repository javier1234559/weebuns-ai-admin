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
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AppPagination from "@/components/common/app-pagination";
import LoadingPage from "@/pages/loading";
import {
  TOKEN_KEY_FACTORY,
  useApproveWithdrawalRequest,
  useDeclineWithdrawalRequest,
  useWithdrawalRequestDetails,
} from "../hooks/useToken";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { formatDateTime } from "@/lib/date";

const statusTypes = [
  { id: "all", label: "Tất cả" },
  { id: "completed", label: "Hoàn thành", variant: "default" },
  { id: "pending", label: "Đang xử lý", variant: "secondary" },
  { id: "failed", label: "Thất bại", variant: "destructive" },
];

interface WithDrawTokenRequestTableListProps {
  transactions: any[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onUpdateQueryParams: (params: { page?: number }) => void;
  isShowApproveButton?: boolean;
  isAdmin?: boolean;
}

export default function WithDrawTokenRequestTableList({
  transactions,
  isLoading,
  onUpdateQueryParams,
  page,
  totalPages,
  isShowApproveButton = true,
  isAdmin = false,
}: WithDrawTokenRequestTableListProps) {
  const approveMutation = useApproveWithdrawalRequest();
  const declineMutation = useDeclineWithdrawalRequest();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const { data: requestDetails, isLoading: isLoadingDetails } =
    useWithdrawalRequestDetails(selectedRequestId || "", {
      enabled: !!selectedRequestId,
      queryKey: TOKEN_KEY_FACTORY.withdrawalRequestDetails({
        requestId: selectedRequestId || "",
      }),
    });

  const handleApprove = (id: string) => {
    approveMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Đã duyệt yêu cầu rút token");
        setSelectedRequestId(null);
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra khi duyệt yêu cầu");
        console.log(error);
      },
    });
  };

  const handleDecline = (id: string) => {
    declineMutation.mutate(id, {
      onSuccess: () => {
        toast.success(
          isAdmin ? "Đã từ chối yêu cầu rút token" : "Đã hủy yêu cầu rút token",
        );
        setSelectedRequestId(null);
      },
      onError: (error: any) => {
        toast.error("Có lỗi xảy ra khi từ chối yêu cầu");
        console.log(error);
      },
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã giao dịch</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Số token</TableHead>
                <TableHead>Thời gian yêu cầu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
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

                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium py-4">
                        {transaction.transactionId}
                      </TableCell>
                      <TableCell className="py-4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: transaction.currency,
                        }).format(transaction.amount)}
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
                      <TableCell className="py-4 flex gap-2">
                        {transaction.status === "pending" &&
                          isShowApproveButton &&
                          isAdmin && (
                            <Button
                              size="sm"
                              onClick={() =>
                                setSelectedRequestId(transaction.id)
                              }
                              disabled={approveMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                              Duyệt
                            </Button>
                          )}
                        {transaction.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDecline(transaction.id)}
                            disabled={declineMutation.isPending}
                          >
                            <X className="h-4 w-4" />
                            {isAdmin ? "Từ chối" : "Hủy"}
                          </Button>
                        )}
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

      <Dialog
        open={!!selectedRequestId}
        onOpenChange={() => setSelectedRequestId(null)}
      >
        <DialogContent className="w-[95vw] max-w-[800px] h-[90vh] overflow-y-auto mx-4">
          <DialogHeader>
            <DialogTitle>Xác nhận duyệt yêu cầu rút token</DialogTitle>
            <DialogDescription>
              Vui lòng kiểm tra thông tin trước khi duyệt yêu cầu
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : requestDetails ? (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h4 className="text-lg font-medium">Thông tin giáo viên</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <span className="text-muted-foreground">Họ tên:</span>
                  <span className="font-medium">
                    {requestDetails.user.firstName}{" "}
                    {requestDetails.user.lastName}
                  </span>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">
                    {requestDetails.user.email}
                  </span>
                  <span className="text-muted-foreground">Username:</span>
                  <span className="font-medium">
                    {requestDetails.user.username}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-medium">QR Ngân hàng</h4>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <img
                      src={
                        requestDetails.user.teacherProfile
                          ?.bankingqr_image_url ?? ""
                      }
                      alt="QR ngân hàng"
                      className="w-full max-w-[300px] h-auto aspect-square object-contain mx-auto"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium">Thông tin giao dịch</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    <span className="text-muted-foreground">Mã giao dịch:</span>
                    <span className="font-medium break-all">
                      {requestDetails.transaction.transactionId}
                    </span>
                    <span className="text-muted-foreground">Số token:</span>
                    <span className="font-medium">
                      {requestDetails.transaction.tokenAmount}
                    </span>
                    <span className="text-muted-foreground">Số tiền:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: requestDetails.transaction.currency,
                      }).format(requestDetails.transaction.amount)}
                    </span>
                    <span className="text-muted-foreground">
                      Thời gian yêu cầu:
                    </span>
                    <span className="font-medium">
                      {formatDateTime(
                        new Date(requestDetails.transaction.paymentDate),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedRequestId(null)}
            >
              Hủy
            </Button>
            <Button
              onClick={() =>
                selectedRequestId && handleApprove(selectedRequestId)
              }
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? "Đang xử lý..." : "Xác nhận duyệt"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
