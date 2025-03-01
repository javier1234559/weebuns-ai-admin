import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import {
  mockNotifications,
  notificationTypes,
} from "@/feature/notification/data";
import CreateNotificationForm from "@/feature/notification/components/CreateNotificationForm";
import { useState } from "react";

export default function NotificationManagerView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch = notification.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thông báo..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Loại thông báo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {notificationTypes.map((type) => (
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
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="published">Đã xuất bản</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="scheduled">Lên lịch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm thông báo mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Tạo thông báo mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để tạo thông báo mới cho người dùng.
              </DialogDescription>
            </DialogHeader>
            <CreateNotificationForm />
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
              <Button type="button" variant="outline" className="sm:mr-auto">
                Hủy
              </Button>
              <Button type="button" variant="secondary" className="sm:mr-2">
                <Plus className="mr-2 h-4 w-4" />
                Lưu nháp
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Tạo và gửi ngay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Người nhận</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
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
                        {notification.recipients === "all"
                          ? "Tất cả"
                          : notification.recipients === "premium"
                            ? "Premium"
                            : notification.recipients === "free"
                              ? "Free"
                              : "Cụ thể"}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(notification.dateCreated),
                          "dd/MM/yyyy",
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            notification.status === "published"
                              ? "default"
                              : notification.status === "draft"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {notification.status === "published"
                            ? "Đã xuất bản"
                            : notification.status === "draft"
                              ? "Bản nháp"
                              : "Lên lịch"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mb-2" />
                      <p>Không tìm thấy thông báo nào</p>
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
