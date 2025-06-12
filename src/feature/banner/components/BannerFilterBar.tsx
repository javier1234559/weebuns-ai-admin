import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BannerFilterBar({
  search,
  onSearch,
  status,
  onStatusChange,
}: {
  search: string;
  onSearch: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm banner..."
          className="pl-8 w-full sm:w-[300px]"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select value={status} onValueChange={onStatusChange}>
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
  );
}
