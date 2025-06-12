import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IELTS_TOPICS } from "@/feature/lesson/types/lesson";
import UploadImage from "@/components/feature/UploadImage";
import { CONTENT_STATUS_TEACHER } from "@/constraints";
import { capitalize } from "@/lib/text";

const BasicInfoForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề bài viết</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề bài viết" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tiêu đề ngắn gọn và mô tả cho bài viết
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chủ đề</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chủ đề" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IELTS_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic.toLowerCase()}>
                          {topic.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Chọn chủ đề phù hợp nhất cho bài viết
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả ngắn gọn cho bài viết"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tóm tắt những gì học viên sẽ học từ bài viết
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FormField
              control={control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Độ khó</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn độ khó" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Độ khó của bài viết</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian (phút)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormDescription>
                    Thời gian để hoàn thành bài viết
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lessonType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại bài viết</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại bài viết" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="practice">Practice</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Định dạng của bài viết</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh bìa</FormLabel>
                <UploadImage value={field.value} onChange={field.onChange} />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt xuất bản</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(CONTENT_STATUS_TEACHER).map((status) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {capitalize(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Bài viết nháp chỉ hiển thị cho bạn. Bài viết đã xuất bản sẽ
                  hiển thị cho tất cả học viên.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BasicInfoForm;
