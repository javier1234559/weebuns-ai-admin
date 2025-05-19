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
import { useSendNotification } from "../hooks/useNotification";
import { useForm } from "react-hook-form";
import { CreateNotificationDto } from "@/services/swagger-types";

interface CreateNotificationFormProps {
  onSuccess?: () => void;
}

export default function CreateNotificationForm({ onSuccess }: CreateNotificationFormProps) {
  const { mutate: sendNotification } = useSendNotification();
  const { register, handleSubmit, setValue, watch } = useForm<CreateNotificationDto>({
    defaultValues: {
      userId: "be6b4aab-d36d-4cd8-a23e-562c4448913f",
      type: "comment_reply" as const,
      isGlobal: false,
    }
  });

  const isGlobal = watch("isGlobal");

  const onSubmit = (data: CreateNotificationDto) => {
    sendNotification(data, {
      onSuccess: () => {
        onSuccess?.();
      }
    });
  };

  return (
    <form id="notification-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Tiêu đề thông báo</Label>
        <Input
          id="title"
          placeholder="Nhập tiêu đề thông báo"
          {...register("title", { required: true })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Loại thông báo</Label>
        <Select
          onValueChange={(value: CreateNotificationDto["type"]) => setValue("type", value)}
          defaultValue={watch("type")}
        >
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
        <Label htmlFor="actionUrl">Đường dẫn hành động</Label>
        <Input
          id="actionUrl"
          placeholder="Nhập đường dẫn khi click vào thông báo"
          {...register("actionUrl")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="thumbnailUrl">URL ảnh thumbnail</Label>
        <Input
          id="thumbnailUrl"
          placeholder="Nhập URL ảnh thumbnail"
          {...register("thumbnailUrl")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="isGlobal">Phạm vi thông báo</Label>
        <Select
          onValueChange={(value) => setValue("isGlobal", value === "true")}
          defaultValue={watch("isGlobal") ? "true" : "false"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn phạm vi thông báo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Thông báo toàn cục</SelectItem>
            <SelectItem value="false">Thông báo cá nhân</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!isGlobal && (
        <div className="grid gap-2">
          <Label htmlFor="userId">ID người dùng</Label>
          <Input
            id="userId"
            placeholder="Nhập ID người dùng nhận thông báo"
            {...register("userId", { required: !isGlobal })}
          />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="content">Nội dung thông báo</Label>
        <textarea
          className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Nhập nội dung chi tiết của thông báo"
          {...register("content", { required: true })}
        />
      </div>
    </form>
  );
}
