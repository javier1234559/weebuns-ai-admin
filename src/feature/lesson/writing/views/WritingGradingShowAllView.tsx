import AppPagination from "@/components/common/app-pagination";
import { LessonSubmission } from "@/services/swagger-types";
import { LessonSubmissionsResponse } from "@/services/swagger-types";
import { globalConfig } from "@/config";
import { useNavigate } from "react-router-dom";
import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import { SubmissionCardList } from "@/feature/lesson/writing/components/SubmissionCardList";
import { Inbox } from "lucide-react";

interface WritingGradingShowAllViewProps {
  data: LessonSubmissionsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onUpdateQueryParams: (params: { page?: number }) => void;
}

export default function WritingGradingShowAllView({
  data,
  isLoading,
  isError,
  error,
  onUpdateQueryParams,
}: WritingGradingShowAllViewProps) {
  const navigate = useNavigate();

  const handleViewLesson = (submission: LessonSubmission) => {
    const routeName = `${globalConfig.APP_USER_URL}/lesson/writing/${submission.lessonId}/result?submissionId=${submission.id}`;
    window.open(routeName, "_blank");
  };

  const handleEditLesson = (submission: LessonSubmission) => {
    const routeName = `/teacher/writing/grading/${submission.id}/update`;
    navigate(routeName);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data || !data?.pagination) {
    return <AppError error={error} />;
  }

  return (
    <>
      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground ml-auto">
            {data.pagination?.totalItems} bài viết
          </p>
        </div>

        <SubmissionCardList
          submissions={data.data}
          onView={handleViewLesson}
          onEdit={handleEditLesson}
        />

        {data.pagination.totalItems === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 min-h-[200px] shadow-sm">
            <Inbox className="size-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground max-w-md font-medium">
              Không có bài viết nào
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              Bài viết sẽ xuất hiện ở đây khi học viên nộp bài
            </p>
          </div>
        )}

        {data.pagination.totalItems > 0 && (
          <div className="ml-auto w-fit">
            <div className="mt-8 flex justify-center">
              <AppPagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                onPageChange={(page) => onUpdateQueryParams({ page })}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
