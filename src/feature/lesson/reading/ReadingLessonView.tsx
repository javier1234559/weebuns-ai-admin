import { useState, useEffect } from "react";
import { lessonApi } from "./lessonApi";
import ReadingLessonForm from "./components/LessonReadingForm";
import { toast } from "sonner";
import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";

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
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!isEdit || !lessonId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await lessonApi.getLessonById(lessonId);
        setLesson(response.data);
      } catch (err: any) {
        console.error("Error fetching lesson:", err);
        setError(err.message || "Failed to load lesson data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [isEdit, lessonId]);

  const handleSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      let response;

      if (isEdit) {
        response = await lessonApi.updateLesson(lessonId, formData);
        toast.success("Lesson updated");
      } else {
        response = await lessonApi.createLesson(formData);
        toast.success("Lesson created");
      }
      console.log(response);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err: any) {
      console.error("Error saving lesson:", err);
      setError(err.message || "Failed to save lesson");

      toast.error("Error saving lesson");
    } finally {
      setIsLoading(false);
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
