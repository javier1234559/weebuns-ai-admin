import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BannerCard({
  banner,
  onEdit,
  onDelete,
  loading,
}: {
  banner: any;
  onEdit: () => void;
  onDelete: () => void;
  loading?: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[795/308] w-full">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="default">Hiển thị</Badge>
        </div>
      </div>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-base truncate">{banner.title}</CardTitle>
        <CardDescription className="text-xs truncate">
          Vị trí: {banner.orderIndex} • Tạo ngày:{" "}
          {format(new Date(banner.createdAt), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between p-3">
        <div className="text-xs truncate text-muted-foreground">
          <a
            href={banner.actionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {banner.actionLink}
          </a>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDelete}
            disabled={loading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
