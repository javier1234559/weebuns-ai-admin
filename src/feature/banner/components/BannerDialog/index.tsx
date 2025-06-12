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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { bannerSchema, defaultValues, BannerFormValues } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BannerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateBannerDto) => void;
  loading?: boolean;
  initialValues?: Partial<CreateBannerDto>;
}

export default function BannerDialog({
  open,
  onClose,
  onSubmit,
  loading,
  initialValues,
}: BannerDialogProps) {
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề banner</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tiêu đề banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actionLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập đường dẫn khi click vào banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh (URL)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập URL hình ảnh banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orderIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Thứ tự hiển thị"
                      disabled={loading}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
