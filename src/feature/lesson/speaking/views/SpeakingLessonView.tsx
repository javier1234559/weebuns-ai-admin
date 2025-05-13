import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import { toast } from "sonner";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { log } from "@/lib/utils";
import { useState } from "react";
import { useSpeakingDetail } from "@/feature/lesson/speaking/hooks/useSpeaking";
import SpeakingLessonForm from "@/feature/lesson/speaking/components/SpeakingLessonForm";
import {
  useSpeakingCreate,
  useSpeakingRemove,
  useSpeakingUpdate,
} from "@/feature/lesson/speaking/hooks/useSpeaking";

interface SpeakingLessonViewProps {
  isEdit?: boolean;
  lessonId?: string | null;
  onSuccess?: (response: any) => void;
}

const SpeakingLessonView = ({
  isEdit = false,
  lessonId = null,
  onSuccess = () => {},
}: SpeakingLessonViewProps) => {
  const navigate = useNavigate();
  const createMutation = useSpeakingCreate();
  const updateMutation = useSpeakingUpdate();
  const removeMutation = useSpeakingRemove();
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  // Query only in Edit mode
  const {
    data: lesson,
    isLoading,
    error,
  } = useSpeakingDetail(isEdit ? lessonId : null);

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
        await updateMutation.mutateAsync({ id: lessonId, data: formData });
        toast.success("Lesson updated successfully");
        navigate(RouteNames.TeacherSpeakingShowAll);
      } else {
        setIsMutationLoading(true);
        await createMutation.mutateAsync(formData);
        toast.success("Lesson created successfully");
        navigate(RouteNames.TeacherSpeakingShowAll);
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
    <SpeakingLessonForm
      isEdit={isEdit}
      initialData={lesson}
      onSubmit={handleSubmit}
      isLoading={isMutationLoading}
      onRemove={handleRemove}
    />
  );
};

export default SpeakingLessonView;
