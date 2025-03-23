import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lesson, LESSONS_STATUS, LEVELS } from "@/feature/lesson/types/lesson";
import { Plus, Search, Filter } from "lucide-react";

import { mockIELTSLessons } from "@/feature/lesson/data";
import { LessonCardGrid } from "@/feature/lesson/components/LessonCardGrid";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";
import { useNavigate } from "react-router-dom";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { globalConfig } from "@/config";
import { capitalize } from "@/lib/text";
import usePaginationUrl from "@/hooks/use-pagination-url";
import AppPagination from "@/components/common/app-pagination";

export default function LessonManagementPage() {
  const navigate = useNavigate();
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { search, setSearch, page, perPage, updateQueryParams } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const handleViewLesson = (lesson: Lesson) => {
    const routeName = replaceRouteName(
      `${globalConfig.APP_USER_URL}/${RouteNames.ReadingDetail}` as RouteNames,
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

  const filteredLessons = mockIELTSLessons.filter((lesson) => {
    const matchesSearch =
      search === "" ||
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      levelFilter === "all" || lesson.level.toLowerCase() === levelFilter;

    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Quản lý bài đọc
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Tạo và quản lý nội dung bài đọc IELTS
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h2 className="text-xl font-semibold tracking-tight capitalize">
            Bài đọc
          </h2>
          <Button
            size="sm"
            className="gap-1 h-9"
            onClick={handleNavigateToCreate}
          >
            <Plus className="size-4" />
            <span>Tạo bài đọc đầu tiên</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-10 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-10 text-sm w-[130px]">
                <Filter className="mr-1 h-3.5 w-3.5" />
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((level) => (
                  <SelectItem key={level} value={level} className="capitalize">
                    {capitalize(level)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 text-sm w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {LESSONS_STATUS.map((status) => (
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

        <div className="w-full mt-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredLessons.length} bài đọc
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
              lessons={filteredLessons}
              onView={handleViewLesson}
              onEdit={handleEditLesson}
            />
          ) : (
            <LessonCardList
              lessons={filteredLessons}
              onView={handleViewLesson}
              onEdit={handleEditLesson}
            />
          )}

          {filteredLessons.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
              <h3 className="mb-2 text-lg font-medium">
                Không tìm thấy bài học
              </h3>
              <p className="mb-6 text-sm text-muted-foreground max-w-md">
                {search || levelFilter !== "all" || statusFilter !== "all"
                  ? "Thử điều chỉnh các bộ lọc để tìm kiếm những gì bạn đang tìm kiếm."
                  : `Bạn chưa tạo bài đọc nào cả.`}
              </p>
              <Button onClick={handleNavigateToCreate}>
                <Plus className="mr-2 size-4" />
                Tạo bài đọc đầu tiên
              </Button>
            </div>
          )}

          {filteredLessons.length > 0 && (
            <div className="ml-auto w-fit">
              <div className="mt-8 flex justify-center">
                <AppPagination
                  currentPage={page}
                  totalPages={Math.ceil(filteredLessons.length / perPage)}
                  onPageChange={(page) => updateQueryParams({ page })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
