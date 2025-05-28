import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";

const ContentForm = () => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nội dung</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tạo bài viết bằng cách cung cấp văn bản đọc và câu hỏi
        </p>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="content.text"
          render={({ field }) => (
            <FormItem>
              <FormControl className="h-full">
                <TipTapEditor {...field} />
              </FormControl>
              <FormDescription>
                HTML có thể được sử dụng cho các đoạn văn, tiêu đề và các phần
                văn bản khác
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ContentForm;
