import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";

const ContentForm = () => {
  const { control, watch, setValue } = useFormContext();
  const followupExamples = watch("content.followupExamples") || [];

  const addFollowupExample = () => {
    const currentExamples = [...followupExamples];
    currentExamples.push("");
    setValue("content.followupExamples", currentExamples);
  };

  const removeFollowupExample = (index: number) => {
    const currentExamples = [...followupExamples];
    currentExamples.splice(index, 1);
    setValue("content.followupExamples", currentExamples);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Nội dung</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tạo bài viết bằng cách cung cấp chủ đề, prompt và câu hỏi theo sau
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <FormField
          control={control}
          name="content.topicText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Chủ đề</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ví dụ: Du lịch và Du lịch, Cuộc sống gia đình, Công nghệ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content.promptText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Prompt chính</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Nhập prompt chính"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel className="text-xl">
              Câu hỏi cho AI sử dụng (tùy chọn)
            </FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFollowupExample}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Thêm câu hỏi
            </Button>
          </div>
          {followupExamples.map((_: any, index: number) => (
            <FormField
              key={index}
              control={control}
              name={`content.followupExamples.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} placeholder="Nhập câu hỏi theo sau" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFollowupExample(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={control}
          name="content.backgroundKnowledge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">
                Ngữ cảnh & Từ vựng (tùy chọn)
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Thêm từ vựng, ngữ cảnh văn hóa hoặc khái niệm quan trọng có thể giúp cho cuộc thảo luận"
                  className="min-h-[100px]"
                />
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
