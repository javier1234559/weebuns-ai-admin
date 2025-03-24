import AppPagination from "@/components/common/app-pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteNames } from "@/constraints/route-name";
import { Lesson } from "@/services/swagger-types";
import { LessonCardGrid } from "@/feature/lesson/components/LessonCardGrid";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";
import { LessonsResponse } from "@/services/swagger-types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { replaceRouteName } from "@/constraints/route-name";
import { globalConfig } from "@/config";
import { useNavigate } from "react-router-dom";
import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";

interface ReadingShowAllViewProps {
  data: LessonsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onUpdateQueryParams: (params: { page?: number }) => void;
}

export default function ReadingShowAllView({
  data,
  isLoading,
  isError,
  error,
  onUpdateQueryParams,
}: ReadingShowAllViewProps) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleViewLesson = (lesson: Lesson) => {
    const routeName = replaceRouteName(
      `${globalConfig.APP_USER_URL}${RouteNames.ReadingDetail}` as RouteNames,
      { id: lesson.id },
    );
    window.open(routeName, "_blank");
  };

  const handleEditLesson = (lesson: Lesson) => {
    const routeName = replaceRouteName(RouteNames.TeacherReadingUpdate, {
      id: lesson.id,
    });
    navigate(routeName);
  };

  const handleNavigateToCreate = () => {
    navigate(`${RouteNames.TeacherReadingCreate}`);
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
          <p className="text-sm text-muted-foreground">
            {data.pagination?.totalItems} bài đọc
          </p>
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "grid" | "list")}
            className="w-auto"
          >
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="text-xs px-3">
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="text-xs px-3">
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {viewMode === "grid" ? (
          <LessonCardGrid
            lessons={data.data}
            onView={handleViewLesson}
            onEdit={handleEditLesson}
          />
        ) : (
          <LessonCardList
            lessons={data.data}
            onView={handleViewLesson}
            onEdit={handleEditLesson}
          />
        )}

        {data.pagination.totalItems === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
            <h3 className="mb-2 text-lg font-medium">Không tìm thấy bài học</h3>
            <p className="mb-6 text-sm text-muted-foreground max-w-md">
              Bạn chưa tạo bài đọc nào cả.
            </p>
            <Button onClick={handleNavigateToCreate}>
              <Plus className="mr-2 size-4" />
              Tạo bài đọc đầu tiên
            </Button>
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
