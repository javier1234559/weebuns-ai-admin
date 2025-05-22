import { Separator } from "@/components/ui/separator";
import NotificationViewList from "@/feature/notification/views/NotificationViewList";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Thông báo của bạn</p>
      </div>
      <Separator />
      <NotificationViewList />
    </div>
  );
}
