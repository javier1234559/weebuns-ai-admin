import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";
import { Input } from "@/components/ui/input";

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

        <div className="flex flex-col gap-2 mt-10">
          <FormLabel>URL Youtube</FormLabel>
          <p className="text-sm text-muted-foreground">
            Nhập URL Embed Youtube để hiển thị video chữa bài `trong bài học
          </p>
          <FormField
            control={control}
            name="content.youtube_embed_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <div className="mt-2 w-full">
                  <iframe
                    src={field.value}
                    width="400px"
                    height="200px"
                    frameBorder="0"
                  ></iframe>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentForm;
