import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useClaimWritingSubmission } from "../hooks/useWriting";

interface ClaimGradingButtonProps {
  submissionId: string;
  onClick: () => void;
}

export default function ClaimGradingButton({
  submissionId,
  onClick,
}: ClaimGradingButtonProps) {
  const { mutate: claimWritingSubmission, isPending: isClaiming } =
    useClaimWritingSubmission();

  const handleClaimGrading = () => {
    claimWritingSubmission(submissionId);
    onClick();
  };

  return (
    <Button
      size="sm"
      onClick={handleClaimGrading}
      disabled={isClaiming}
    >
      {isClaiming ? (
        <Loader2 className="size-3.5 mr-1 animate-spin" />
      ) : (
        <Check className="size-3.5 mr-1" />
      )}
      {isClaiming ? "Claiming..." : "Claim Grading"}
    </Button>
  );
}
