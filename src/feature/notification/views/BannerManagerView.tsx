import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Search } from "lucide-react";
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
import { format } from "date-fns";
import { Edit, Trash2, Plus } from "lucide-react";
import { mockBanners } from "@/feature/notification/data";
import CreateBannerForm from "@/feature/notification/components/CreateBannerForm";

export default function BannerManagerView() {
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm banner..."
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="published">Đang hiển thị</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="scheduled">Lên lịch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Thêm banner mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Tạo banner mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để tạo banner mới hiển thị trên trang chủ.
              </DialogDescription>
            </DialogHeader>
            <CreateBannerForm />
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
                Xuất bản
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBanners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="relative aspect-[795/308] w-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge
                  variant={
                    banner.status === "published" ? "default" : "secondary"
                  }
                >
                  {banner.status === "published" ? "Đang hiển thị" : "Bản nháp"}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base truncate">
                {banner.title}
              </CardTitle>
              <CardDescription className="text-xs truncate">
                Vị trí: {banner.position} • Tạo ngày:{" "}
                {format(new Date(banner.dateCreated), "dd/MM/yyyy")}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between p-3">
              <div className="text-xs truncate text-muted-foreground">
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {banner.link}
                </a>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
