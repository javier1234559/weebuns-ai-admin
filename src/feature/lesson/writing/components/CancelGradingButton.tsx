import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useCancelClaimWritingSubmission } from "../hooks/useWriting"

interface CancelGradingButtonProps {
  submissionId: string;
  onClick: () => void;
}

export default function CancelGradingButton({
  submissionId,
  onClick,
}: CancelGradingButtonProps) {
  const { mutate: cancelGrading, isPending: isCancelling } =
    useCancelClaimWritingSubmission();

  const handleClaimGrading = () => {
    cancelGrading(submissionId);
    onClick();
  };

  return (
    <Button
      size="sm"
      type="button"
      onClick={handleClaimGrading}
      disabled={isCancelling}
      className="gap-2 p-4 bg-red-500 hover:bg-red-600 dark:text-white"
    >
      {isCancelling ? (
        <Loader2 className="size-6 mr-1 animate-spin" />
      ) : (
        <Check className="size-6 mr-1" />
      )}
      {isCancelling ? "Cancelling..." : "Cancel Grading"}
    </Button>
  );
}
