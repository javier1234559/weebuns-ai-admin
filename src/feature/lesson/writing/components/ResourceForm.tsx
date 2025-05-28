import TipTapEditor from "@/components/feature/editor/TipTapEditor";
import { FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDescription } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function ResourceForm() {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài liệu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Analysis Guide */}
        <FormField
          control={control}
          name="content.resources.analysis_guide"
          render={({ field }) => (
            <FormItem>
              <Label>Hướng dẫn phân tích</Label>
              <FormControl className="h-full">
                <TipTapEditor {...field} />
              </FormControl>
              <FormDescription>
                HTML formatting có thể được sử dụng cho các đoạn văn, tiêu đề và
                các phần văn bản khác
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        {/* Sample Essay */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Bài viết mẫu (Tùy chọn)</h3>

          <FormField
            control={control}
            name="content.resources.sample_essay.instruction"
            render={({ field }) => (
              <FormItem>
                <Label>Hướng dẫn</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.body1"
            render={({ field }) => (
              <FormItem>
                <Label>Đoạn văn 1</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.body2"
            render={({ field }) => (
              <FormItem>
                <Label>Đoạn văn 2</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content.resources.sample_essay.conclusion"
            render={({ field }) => (
              <FormItem>
                <Label>Kết luận</Label>
                <FormControl>
                  <TipTapEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ResourceForm;
