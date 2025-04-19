import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import {
  useWritingCreate,
  useWritingRemove,
  useWritingUpdate,
} from "@/feature/lesson/writing/hooks/useWriting";
import { toast } from "sonner";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { log } from "@/lib/utils";
import { useState } from "react";
import { useWritingDetail } from "@/feature/lesson/writing/hooks/useWriting";
import WritingLessonForm from "@/feature/lesson/writing/components/WritingLessonForm";

interface WritingLessonViewProps {
  isEdit?: boolean;
  lessonId?: string | null;
  onSuccess?: (response: any) => void;
}

const WritingLessonView = ({
  isEdit = false,
  lessonId = null,
  onSuccess = () => {},
}: WritingLessonViewProps) => {
  const navigate = useNavigate();
  const createMutation = useWritingCreate();
  const updateMutation = useWritingUpdate();
  const removeMutation = useWritingRemove();
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  // Query only in Edit mode
  const {
    data: lesson,
    isLoading,
    error,
  } = useWritingDetail(isEdit ? lessonId : null);

  console.log(lesson);

  const handleRemove = async () => {
    try {
      setIsMutationLoading(true);
      if (!lessonId) {
        toast.error("Lesson ID is required");
        return;
      }
      await removeMutation.mutateAsync(lessonId as string);
      toast.success("Lesson removed successfully");
      navigate(RouteNames.TeacherWritingShowAll);
    } catch (error: any) {
      toast.error("Failed to remove lesson");
      log(error);
    } finally {
      setIsMutationLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      console.log(formData);
      if (isEdit && lessonId) {
        setIsMutationLoading(true);
        console.log(JSON.stringify(formData, null, 2));
        await updateMutation.mutateAsync({ id: lessonId, data: formData });
        toast.success("Lesson updated successfully");
        navigate(RouteNames.TeacherWritingShowAll);
      } else {
        setIsMutationLoading(true);
        console.log(JSON.stringify(formData, null, 2));
        await createMutation.mutateAsync(formData);
        toast.success("Lesson created successfully");
        navigate(RouteNames.TeacherWritingShowAll);
      }
      onSuccess(formData);
    } catch (error: any) {
      toast.error("Failed to save lesson");
      log(error);
    } finally {
      setIsMutationLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <WritingLessonForm
      isEdit={isEdit}
      initialData={lesson}
      onSubmit={handleSubmit}
      isLoading={isMutationLoading}
      onRemove={handleRemove}
    />
  );
};

export default WritingLessonView;
