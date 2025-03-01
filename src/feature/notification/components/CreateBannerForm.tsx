import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

export default function CreateBannerForm() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Tiêu đề banner</Label>
        <Input id="title" placeholder="Nhập tiêu đề banner" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="link">Đường dẫn</Label>
        <Input id="link" placeholder="Nhập đường dẫn khi click vào banner" />
      </div>

      <div className="grid gap-2">
        <Label>Hình ảnh</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="banner-image"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer
              bg-background hover:bg-accent
              border-border hover:border-border/50
              transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                Nhấp để tải lên
              </p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG (Tỷ lệ: 795x308)
              </p>
            </div>
            <input id="banner-image" type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="position">Vị trí</Label>
        <Input
          id="position"
          type="number"
          min="1"
          placeholder="Thứ tự hiển thị"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="schedule">Thời gian hiển thị</Label>
        <div className="flex gap-2">
          <DatePicker
            date={startDate}
            onSelect={setStartDate}
            placeholder="Bắt đầu"
          />
          <DatePicker
            date={endDate}
            onSelect={setEndDate}
            placeholder="Kết thúc"
          />
        </div>
      </div>
    </div>
  );
}
