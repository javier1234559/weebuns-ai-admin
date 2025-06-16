import AppPagination from "@/components/common/app-pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonCardGrid } from "@/feature/lesson/components/LessonCardGrid";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";
import {
  ContentStatus,
  Lesson,
  LessonsResponse,
} from "@/services/swagger-types";
import { Plus } from "lucide-react";
import { useState } from "react";
import AppError from "@/components/common/app-error";
import LoadingPage from "@/pages/loading";
import { toast } from "sonner";
import { useLessonUpdate } from "@/feature/lesson/useLesson";
import { CONTENT_STATUS } from "@/constraints";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { globalConfig } from "@/config";
import { capitalize } from "@/lib/text";

interface LessonShowAllViewProps {
  data: LessonsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onUpdateQueryParams: (params: { page?: number }) => void;
}

export default function LessonShowAllView({
  data,
  isLoading,
  isError,
  error,
  onUpdateQueryParams,
}: LessonShowAllViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ContentStatus>(
    CONTENT_STATUS.PUBLISHED as ContentStatus,
  );
  const { mutate: updateLesson } = useLessonUpdate();

  const handleViewLesson = (lesson: Lesson) => {
    window.open(
      `${globalConfig.APP_USER_URL}/lesson/${lesson.skill.toLowerCase()}/${lesson.id}`,
      "_blank",
    );
  };

  const handleApproveLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setSelectedStatus(lesson.status);
  };

  const handleUpdateStatus = () => {
    if (!selectedLesson) return;

    updateLesson(
      {
        id: selectedLesson.id,
        data: {
          status: selectedStatus,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cập nhật trạng thái bài học thành công");
          setSelectedLesson(null);
        },
        onError: () => {
          toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
        },
      },
    );
  };

  const handleNavigateToCreate = () => {
    toast.error("Login với tài khoản teacher để tạo bài học");
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
            {data.pagination?.totalItems} bài học
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
            onEdit={handleApproveLesson}
            isAdmin={true}
          />
        ) : (
          <LessonCardList
            lessons={data.data}
            onView={handleViewLesson}
            onEdit={handleApproveLesson}
            isAdmin={true}
          />
        )}

        {data.pagination.totalItems === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
            <h3 className="mb-2 text-lg font-medium">Không tìm thấy bài học</h3>
            <p className="mb-6 text-sm text-muted-foreground max-w-md">
              Bạn chưa tạo bài học nào cả.
            </p>
            <Button onClick={handleNavigateToCreate}>
              <Plus className="mr-2 size-4" />
              Tạo bài học đầu tiên
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

      <Dialog
        open={!!selectedLesson}
        onOpenChange={(open) => !open && setSelectedLesson(null)}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Duyệt bài học</DialogTitle>
            <DialogDescription>
              Vui lòng kiểm tra thông tin và chọn trạng thái phù hợp
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Thông tin bài học</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono">{selectedLesson?.id}</span>

                <span className="text-muted-foreground">Tiêu đề:</span>
                <span>{selectedLesson?.title}</span>

                <span className="text-muted-foreground">Mô tả:</span>
                <span className="break-words">
                  {selectedLesson?.description}
                </span>

                <span className="text-muted-foreground">Kỹ năng:</span>
                <span className="capitalize">{selectedLesson?.skill}</span>

                <span className="text-muted-foreground">Loại bài học:</span>
                <span className="capitalize">{selectedLesson?.lessonType}</span>

                <span className="text-muted-foreground">Cấp độ:</span>
                <span className="capitalize">{selectedLesson?.level}</span>

                <span className="text-muted-foreground">Chủ đề:</span>
                <span className="capitalize">{selectedLesson?.topic}</span>

                <span className="text-muted-foreground">Thời gian (phút):</span>
                <span>{selectedLesson?.timeLimit}</span>

                <span className="text-muted-foreground">Trạng thái:</span>
                <Select
                  value={selectedStatus as string}
                  onValueChange={(value) =>
                    setSelectedStatus(value as unknown as ContentStatus)
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CONTENT_STATUS).map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {capitalize(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLesson(null)}>
              Hủy
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedLesson && handleViewLesson(selectedLesson)}
            >
              Xem bài học
            </Button>
            <Button onClick={handleUpdateStatus}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
