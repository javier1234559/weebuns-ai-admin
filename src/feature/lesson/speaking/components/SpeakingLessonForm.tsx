import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "@/feature/lesson/components/BasicInfoForm";
import {
  speakingLessonSchema,
  defaultValues,
  SpeakingLessonFormValues,
} from "@/feature/lesson/speaking/schema";
import { ContentStatus, Lesson } from "@/services/swagger-types";
import { toast } from "sonner";
import { isDev } from "@/lib/utils";
import {
  LessonLevel,
  LessonTopic,
  LessonType,
} from "@/feature/lesson/types/lesson";
import ContentForm from "@/feature/lesson/speaking/components/ContentForm";

interface LessonSpeakingFormProps {
  isEdit?: boolean;
  initialData?: Lesson | null;
  onSubmit: (data: SpeakingLessonFormValues) => Promise<void>;
  isLoading?: boolean;
  onRemove?: () => void;
}

const SpeakingLessonForm = ({
  isEdit = false,
  initialData = null,
  onSubmit,
  isLoading = false,
  onRemove,
}: LessonSpeakingFormProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const methods = useForm<SpeakingLessonFormValues>({
    resolver: zodResolver(speakingLessonSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          level: initialData.level as LessonLevel,
          status: initialData.status as ContentStatus,
          topic: initialData.topic as LessonTopic,
          lessonType: initialData.lessonType as LessonType,
          thumbnailUrl: initialData.thumbnailUrl || "",
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
        thumbnailUrl: initialData.thumbnailUrl || "",
      });
    }
  }, [isEdit, initialData, methods]);

  const handleSubmit = async (data: SpeakingLessonFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const handleInvalid = (data: FieldErrors<SpeakingLessonFormValues>) => {
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
        Back to Lessons
      </Button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? "Edit Speaking Lesson" : "Create Speaking Lesson"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEdit
              ? "Update existing speaking lesson"
              : "Create a new speaking lesson for IELTS preparation"}
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
              Remove Lesson
            </Button>
          )}
          <Button
            type="submit"
            form="reading-lesson-form"
            className="gap-2"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : isEdit ? "Update Lesson" : "Save Lesson"}
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Reading Content</TabsTrigger>
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
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <ContentForm />

              <div className="mt-6 w-full flex justify-end">
                <Button
                  type="button"
                  form="reading-lesson-form"
                  onClick={() => setActiveTab("details")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
};

export default SpeakingLessonForm;
