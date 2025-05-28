import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "@/feature/lesson/components/BasicInfoForm";
import {
  writingLessonSchema,
  defaultValues,
  WritingLessonFormValues,
} from "@/feature/lesson/writing/schema";
import { ContentStatus, Lesson } from "@/services/swagger-types";
import { toast } from "sonner";
import { isDev } from "@/lib/utils";
import {
  LessonLevel,
  LessonTopic,
  LessonType,
} from "@/feature/lesson/types/lesson";
import ResourceForm from "./ResourceForm";
import TaskForm from "./TaskForm";
import VocabularyForm from "./VocabularyForm";

interface WritingLessonFormProps {
  isEdit?: boolean;
  initialData?: Lesson | null;
  onSubmit: (data: WritingLessonFormValues) => Promise<void>;
  isLoading?: boolean;
  onRemove?: () => void;
}

const WritingLessonForm = ({
  isEdit = false,
  initialData = null,
  onSubmit,
  isLoading = false,
  onRemove,
}: WritingLessonFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const methods = useForm<WritingLessonFormValues>({
    resolver: zodResolver(writingLessonSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          level: initialData.level as LessonLevel,
          thumbnailUrl: initialData.thumbnailUrl as string,
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
        thumbnailUrl: initialData.thumbnailUrl as string,
        status: initialData.status as ContentStatus,
        topic: initialData.topic as LessonTopic,
        lessonType: initialData.lessonType as LessonType,
      });
    }
  }, [isEdit, initialData, methods]);

  const handleSubmit = async (data: WritingLessonFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const handleInvalid = (data: FieldErrors<WritingLessonFormValues>) => {
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
          <p className="text-muted-foreground">
            {isEdit
              ? "Cập nhật chi tiết bài viết"
              : "Điền chi tiết để tạo bài viết mới"}
          </p>
        </div>
        <div className="flex gap-2">
          {isEdit && onRemove && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onRemove}
              disabled={isLoading}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          <Button
            type="submit"
            form="writing-lesson-form"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              "Đang lưu..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? "Cập nhật" : "Tạo"}
              </>
            )}
          </Button>
        </div>
      </div>

      <FormProvider {...methods}>
        <form
          id="writing-lesson-form"
          onSubmit={methods.handleSubmit(handleSubmit, handleInvalid)}
          className="space-y-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="task">Prompt AI</TabsTrigger>
              <TabsTrigger value="resources">Tài liệu</TabsTrigger>
              <TabsTrigger value="vocabulary">Từ vựng</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6">
              <BasicInfoForm />
              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="writing-lesson-form"
                  onClick={() => setActiveTab("task")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="task" className="space-y-6">
              <TaskForm />
              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="writing-lesson-form"
                  onClick={() => setActiveTab("resources")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="resources" className="space-y-6">
              <ResourceForm />
              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="writing-lesson-form"
                  onClick={() => setActiveTab("vocabulary")}
                >
                  <ArrowRight className="h-4 w-4" />
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="vocabulary" className="space-y-6">
              <VocabularyForm />
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
};

export default WritingLessonForm;
