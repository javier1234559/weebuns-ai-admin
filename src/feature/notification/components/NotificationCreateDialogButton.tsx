import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Check } from "lucide-react";
import CreateNotificationForm from "./NotificationCreateForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NotificationCreateDialogButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <CreateNotificationForm onSuccess={() => setOpen(false)} />
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button type="button" variant="outline" className="sm:mr-auto" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button type="submit" form="notification-form">
            <Check className="mr-2 h-4 w-4" />
            Tạo và gửi ngay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
