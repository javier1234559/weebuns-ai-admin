import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadAudio from "@/components/feature/UploadAudio";
import { Input } from "@/components/ui/input";

const ContentForm = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nội dung</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tạo bài viết bằng cách cung cấp âm thanh, câu hỏi và câu trả lời
        </p>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="content.audio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tệp âm thanh</FormLabel>
              <FormControl>
                <UploadAudio value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 mt-10">
          <FormLabel>URL Youtube</FormLabel>
          <p className="text-sm text-muted-foreground">
            Nhập URL Embed Youtube để hiển thị video chữa bài trong bài học
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
