import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { notificationTypes } from "../data";
import { Notification } from "@/services/swagger-types";
import AppPagination from "@/components/common/app-pagination";
import LoadingPage from "@/pages/loading";

interface NotificationListProps {
  notifications: Notification[];
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
  page: number;
  totalPages: number;
  onUpdateQueryParams: (params: { page?: number }) => void;
}

export default function NotificationList({
  notifications,
  onDelete,
  isLoading,
  onUpdateQueryParams,
  page,
  totalPages,
}: NotificationListProps) {


  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Tiêu đề</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Người nhận</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => {
                const notificationType = notificationTypes.find(
                  (t) => t.id === notification.type,
                );

                return (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium truncate max-w-[300px]">
                      {notification.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={notificationType?.color || "bg-gray-100"}
                        variant="secondary"
                      >
                        {notificationType?.label || notification.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {notification.isGlobal ? "Tất cả" : "Cụ thể"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(notification.createdAt), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p>Không tìm thấy thông báo nào</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      <div className="flex justify-end my-4 mx-4">
      {notifications.length > 0 && (
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
