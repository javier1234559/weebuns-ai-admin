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
      </CardContent>
    </Card>
  );
};

export default ContentForm;
