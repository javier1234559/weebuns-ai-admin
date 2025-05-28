import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "@/feature/lesson/components/BasicInfoForm";
import ContentForm from "@/feature/lesson/reading/components/ContentForm";
import QuestionsForm from "@/feature/lesson/quiz/components/QuestionsForm";
import {
  readingLessonSchema,
  defaultValues,
  ReadingLessonFormValues,
} from "@/feature/lesson/reading/schema";
import PreviewTab from "@/feature/lesson/reading/components/PreviewTab";
import { ContentStatus, Lesson } from "@/services/swagger-types";
import { toast } from "sonner";
import { isDev } from "@/lib/utils";
import {
  LessonLevel,
  LessonTopic,
  LessonType,
} from "@/feature/lesson/types/lesson";

interface LessonReadingFormProps {
  isEdit?: boolean;
  initialData?: Lesson | null;
  onSubmit: (data: ReadingLessonFormValues) => Promise<void>;
  isLoading?: boolean;
  onRemove?: () => void;
}

const ReadingLessonForm = ({
  isEdit = false,
  initialData = null,
  onSubmit,
  isLoading = false,
  onRemove,
}: LessonReadingFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const methods = useForm<ReadingLessonFormValues>({
    resolver: zodResolver(readingLessonSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          level: initialData.level as LessonLevel,
          status: initialData.status as ContentStatus,
          topic: initialData.topic as LessonTopic,
          lessonType: initialData.lessonType as LessonType,
        }
      : defaultValues,
  });

  useEffect(() => {
    if (isEdit && initialData) {
      methods.reset({
        ...initialData,
        level: initialData.level as LessonLevel,
        status: initialData.status as ContentStatus,
        topic: initialData.topic as LessonTopic,
        lessonType: initialData.lessonType as LessonType,
      });
    }
  }, [isEdit, initialData, methods]);

  const handleSubmit = async (data: ReadingLessonFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const handleInvalid = (data: FieldErrors<ReadingLessonFormValues>) => {
    toast.error("Form is invalid. Please check your inputs !");
    if (isDev()) {
      console.log(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
        size="sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại
      </Button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEdit ? "Cập nhật bài viết" : "Tạo bài viết mới"}
          </p>
        </div>
        <div className="flex gap-2">
          {isEdit && (
            <Button
              variant="destructive"
              onClick={onRemove}
              disabled={isLoading}
            >
              <Trash className="h-4 w-4" />
              Xóa bài viết
            </Button>
          )}
          <Button
            type="submit"
            form="reading-lesson-form"
            className="gap-2"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Lưu"}
          </Button>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          id="reading-lesson-form"
          onSubmit={methods.handleSubmit(handleSubmit, handleInvalid)}
          className="space-y-8"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="content">Nội dung</TabsTrigger>
              <TabsTrigger value="questions">Câu hỏi</TabsTrigger>
              <TabsTrigger value="preview">Xem trước</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <BasicInfoForm />

              <div className="w-full flex justify-end">
                <Button
                  type="button"
                  form="reading-lesson-form"
                  onClick={() => setActiveTab("content")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <ContentForm />

              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="reading-lesson-form"
                  onClick={() => setActiveTab("questions")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="mt-6">
              <QuestionsForm />

              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="reading-lesson-form"
                  onClick={() => setActiveTab("preview")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <PreviewTab />

              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="reading-lesson-form"
                  onClick={() => setActiveTab("details")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Quay lại
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
};

export default ReadingLessonForm;
