import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, FileText, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { LessonSubmission, SubmissionStatus } from "@/services/swagger-types";
import ClaimGradingButton from "./ClaimGradingButton";

interface SubmissionCardListProps {
  submissions: LessonSubmission[];
  onView?: (submission: LessonSubmission) => void;
  onEdit?: (submission: LessonSubmission) => void;
}

export function SubmissionCardList({
  submissions,
  onView,
  onEdit,
}: SubmissionCardListProps) {
  // Map skill to a theme-compatible color class
  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "writing":
        return "bg-primary/10 text-primary";
      case "speaking":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "reading":
        return "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400";
      case "listening":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Map status to theme-compatible color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "draft":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      case "deleted":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <Badge
                  className={cn(
                    "capitalize text-xs",
                    getSkillColor(submission.submissionType),
                  )}
                >
                  {submission.submissionType}
                </Badge>
                <Badge
                  className={cn(
                    "capitalize text-xs",
                    getStatusColor(submission.status),
                  )}
                >
                  {submission.status}
                </Badge>
              </div>

              <h3 className="text-sm font-medium line-clamp-2">
                {submission.lesson?.title || "Untitled Lesson"}
              </h3>

              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>
                    {submission.submittedAt
                      ? format(new Date(submission.submittedAt), "MMM dd, yyyy")
                      : "No date"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Tokens: {submission.tokensUsed}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {onView && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(submission)}
                >
                  <FileText className="size-3.5 mr-1" />
                  Result
                </Button>
              )}
              {onEdit && (
                <>
                  {submission.status !== SubmissionStatus.Scored &&
                    submission.status !== SubmissionStatus.Taken && (
                      <ClaimGradingButton
                        submissionId={submission.id}
                        onClick={() => onEdit(submission)}
                      />
                    )}

                  {submission.status === SubmissionStatus.Taken && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(submission)}
                    >
                      <Pencil className="size-3.5 mr-1" />
                      Edit
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
