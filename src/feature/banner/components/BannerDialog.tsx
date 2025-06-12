import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateBannerDto } from "@/services/swagger-types";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function BannerDialog({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateBannerDto) => void;
  loading?: boolean;
  initialValues?: Partial<CreateBannerDto>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBannerDto>({
    defaultValues: {
      title: "",
      actionLink: "",
      imageUrl: "",
      orderIndex: 1,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Chỉnh sửa banner" : "Tạo banner mới"}
          </DialogTitle>
          <DialogDescription>
            {initialValues
              ? "Cập nhật thông tin banner."
              : "Điền thông tin để tạo banner mới hiển thị trên trang chủ."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề banner</Label>
            <Input
              id="title"
              placeholder="Nhập tiêu đề banner"
              disabled={loading}
              {...register("title", { required: "Vui lòng nhập tiêu đề" })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="actionLink">Đường dẫn</Label>
            <Input
              id="actionLink"
              placeholder="Nhập đường dẫn khi click vào banner"
              disabled={loading}
              {...register("actionLink", {
                required: "Vui lòng nhập đường dẫn",
              })}
            />
            {errors.actionLink && (
              <span className="text-sm text-red-500">
                {errors.actionLink.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Hình ảnh (URL)</Label>
            <Input
              id="imageUrl"
              placeholder="Nhập URL hình ảnh banner"
              disabled={loading}
              {...register("imageUrl", {
                required: "Vui lòng nhập URL hình ảnh",
              })}
            />
            {errors.imageUrl && (
              <span className="text-sm text-red-500">
                {errors.imageUrl.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="orderIndex">Vị trí</Label>
            <Input
              id="orderIndex"
              type="number"
              min="1"
              placeholder="Thứ tự hiển thị"
              disabled={loading}
              {...register("orderIndex", {
                required: "Vui lòng nhập vị trí",
                min: { value: 1, message: "Vị trí phải lớn hơn 0" },
              })}
            />
            {errors.orderIndex && (
              <span className="text-sm text-red-500">
                {errors.orderIndex.message}
              </span>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
            <Button
              type="button"
              variant="outline"
              className="sm:mr-auto"
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : initialValues ? (
                "Cập nhật"
              ) : (
                "Tạo mới"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
