import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { notificationTypes } from "@/feature/notification/data";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
export default function CreateNotificationForm() {
  const [scheduleDate, setScheduleDate] = useState<Date>();

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Tiêu đề thông báo</Label>
        <Input id="title" placeholder="Nhập tiêu đề thông báo" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Loại thông báo</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Chọn loại thông báo" />
          </SelectTrigger>
          <SelectContent>
            {notificationTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="link">Đường dẫn</Label>
        <Input id="link" placeholder="Nhập đường dẫn khi click vào thông báo" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="recipients">Người nhận</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Chọn đối tượng nhận" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả người dùng</SelectItem>
            <SelectItem value="premium">Người dùng Premium</SelectItem>
            <SelectItem value="free">Người dùng Free</SelectItem>
            <SelectItem value="specific">Người dùng cụ thể</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="schedule">Thời gian gửi</Label>
        <DatePicker
          date={scheduleDate}
          onSelect={setScheduleDate}
          placeholder="Chọn thời gian gửi"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Nội dung (tùy chọn)</Label>
        <textarea
          className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Nhập nội dung chi tiết của thông báo (nếu cần)"
        />
      </div>
    </div>
  );
}
