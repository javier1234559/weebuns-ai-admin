import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import {
  useReadingCreate,
  useReadingDetail,
  useReadingUpdate,
} from "@/feature/lesson/reading/hooks/useReading";
import ReadingLessonForm from "./components/LessonReadingForm";
import { toast } from "sonner";

interface ReadingLessonViewProps {
  isEdit?: boolean;
  lessonId?: string | null;
  onSuccess?: (response: any) => void;
}

const ReadingLessonView = ({
  isEdit = false,
  lessonId = null,
  onSuccess = () => {},
}: ReadingLessonViewProps) => {
  const createMutation = useReadingCreate();
  const updateMutation = useReadingUpdate();

  // Query only in Edit mode
  const {
    data: lesson,
    isLoading,
    error,
  } = useReadingDetail(isEdit ? lessonId : null);

  const handleSubmit = async (formData: any) => {
    try {
      console.log(formData);
      if (isEdit && lessonId) {
        await updateMutation.mutateAsync({ id: lessonId, data: formData });
        toast.success("Lesson updated successfully");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Lesson created successfully");
      }
      onSuccess(formData);
    } catch (error: any) {
      toast.error("Failed to save lesson");
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <ReadingLessonForm
      isEdit={isEdit}
      initialData={lesson}
      onSubmit={handleSubmit}
    />
  );
};

export default ReadingLessonView;
