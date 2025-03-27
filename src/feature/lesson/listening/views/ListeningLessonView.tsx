import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import {
  useLessonRemove,
  useListeningCreate,
  useListeningDetail,
  useListeningUpdate,
} from "@/feature/lesson/listening/hooks/useListening";
import { toast } from "sonner";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { log } from "@/lib/utils";
import { useState } from "react";
import ListeningLessonForm from "../components/ListeningLessonForm";

interface ListeningLessonViewProps {
  isEdit?: boolean;
  lessonId?: string | null;
  onSuccess?: (response: any) => void;
}

const ListeningLessonView = ({
  isEdit = false,
  lessonId = null,
  onSuccess = () => {},
}: ListeningLessonViewProps) => {
  const navigate = useNavigate();
  const createMutation = useListeningCreate();
  const updateMutation = useListeningUpdate();
  const removeMutation = useLessonRemove();
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  // Query only in Edit mode
  const {
    data: lesson,
    isLoading,
    error,
  } = useListeningDetail(isEdit ? lessonId : null);

  const handleRemove = async () => {
    try {
      setIsMutationLoading(true);
      if (!lessonId) {
        toast.error("Lesson ID is required");
        return;
      }
      await removeMutation.mutateAsync(lessonId as string);
      toast.success("Lesson removed successfully");
      navigate(RouteNames.TeacherListeningShowAll);
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
        navigate(RouteNames.TeacherListeningShowAll);
      } else {
        setIsMutationLoading(true);
        await createMutation.mutateAsync(formData);
        toast.success("Lesson created successfully");
        navigate(RouteNames.TeacherListeningShowAll);
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
    <ListeningLessonForm
      isEdit={isEdit}
      initialData={lesson}
      onSubmit={handleSubmit}
      isLoading={isMutationLoading}
      onRemove={handleRemove}
    />
  );
};

export default ListeningLessonView;
