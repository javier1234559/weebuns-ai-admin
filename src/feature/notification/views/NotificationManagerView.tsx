import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
} from "lucide-react";
import { notificationTypes } from "@/feature/notification/data";
import { useState } from "react";
import NotificationList from "../components/NotificationList";
import { useNotifications, useDeleteNotification } from "../hooks/useNotification";
import usePaginationUrl from "@/hooks/use-pagination-url";
import NotificationCreateDialogButton from "../components/NotificationCreateDialogButton";
import { toast } from "sonner";

export default function NotificationManagerView() {
  const [typeFilter, setTypeFilter] = useState("all");

  const { search, searchParam, setSearch, page, perPage, updateQueryParams } =
  usePaginationUrl({
    defaultPage: 1,
    defaultPerPage: 10,
  });

  const deleteNotification = useDeleteNotification();
  const { data: notificationsData, isLoading } = useNotifications(
    {
      ...(searchParam && { search: searchParam }),
      ...(typeFilter !== "all" && { type: typeFilter }),
      page,
      perPage,
      isGlobal: true,
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification.mutateAsync(id);
      toast.success("Thông báo đã được xóa thành công");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Không thể xóa thông báo");
    }
  };


  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thông báo..."
              className="pl-8 w-full sm:w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        </div>

        <NotificationCreateDialogButton />
      </div>

      <NotificationList
        notifications={notificationsData?.data || []}
        onDelete={handleDelete}
        isLoading={isLoading}
        onUpdateQueryParams={updateQueryParams}
        page={page}
        totalPages={notificationsData?.pagination.totalPages|| 0}
      />
    </div>
  );
}
