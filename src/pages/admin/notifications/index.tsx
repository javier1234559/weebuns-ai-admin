import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationManagerView from "@/feature/notification/views/NotificationManagerView";
import BannerManagerView from "@/feature/notification/views/BannerManagerView";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="notifications" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Quản lý Thông báo
            </h1>
            <p className="text-sm text-muted-foreground">
              Quản lý thông báo và banner hiển thị trên trang chủ
            </p>
          </div>
          <TabsList className="mt-3 sm:mt-0">
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            <TabsTrigger value="banners">Banner</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notifications">
          <NotificationManagerView />
        </TabsContent>

        <TabsContent value="banners">
          <BannerManagerView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
