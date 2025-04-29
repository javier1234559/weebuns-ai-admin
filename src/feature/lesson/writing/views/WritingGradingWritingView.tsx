import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import {
  useWritingSubmissionDetail,
  useWritingUpdateSubmissionTeacher,
} from "@/feature/lesson/writing/hooks/useWriting";
import { toast } from "sonner";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { log } from "@/lib/utils";
import { useState } from "react";
import WritingGradingForm from "@/feature/lesson/writing/components/WritingGradingForm";
import { WritingGradingFormValues } from "@/feature/lesson/writing/components/WritingGradingForm/schema";

interface WritingGradingWritingViewProps {
  submissionId?: string | null;
  onSuccess?: (response: any) => void;
}

const WritingGradingWritingView = ({
  submissionId = null,
  onSuccess = () => {},
}: WritingGradingWritingViewProps) => {
  const navigate = useNavigate();
  const updateMutation = useWritingUpdateSubmissionTeacher();
  const [isMutationLoading, setIsMutationLoading] = useState(false);

  const {
    data: submission,
    isLoading,
    error,
  } = useWritingSubmissionDetail(submissionId ?? null);

  const handleSubmit = async (formData: WritingGradingFormValues) => {
    try {
      console.log(formData);
      setIsMutationLoading(true);

      const feedback = {
        overall_score: formData.gradingCriteria.overall_score,
        task_response: formData.gradingCriteria.task_response,
        coherence_cohesion: formData.gradingCriteria.coherence_cohesion,
        lexical_resource: formData.gradingCriteria.lexical_resource,
        grammar: formData.gradingCriteria.grammar,
        corrections: formData.corrections,
        overall_feedback: formData.overallFeedback,
      };
      console.log(JSON.stringify(formData, null, 2));
      await updateMutation.mutateAsync({
        id: submissionId ?? "",
        data: {
          lessonId: submission?.lessonId ?? "",
          submissionType: submission?.submissionType ?? "writing",
          tokensUsed: submission?.tokensUsed ?? 0,
          feedback: feedback,
        },
      });
      toast.success("Submission updated successfully");
      navigate(RouteNames.TeacherWritingGrading);
      onSuccess(formData);
    } catch (error: any) {
      toast.error("Failed to save submission");
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
    <WritingGradingForm
      initialData={submission}
      onSubmit={handleSubmit}
      isLoading={isMutationLoading}
    />
  );
};

export default WritingGradingWritingView;
