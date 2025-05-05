import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentStatus } from "@/services/swagger-types";
import { Search, Filter } from "lucide-react";

import usePaginationUrl from "@/hooks/use-pagination-url";
import { useLessonList } from "@/feature/lesson/useLesson";
import { capitalize } from "@/lib/text";
import { LESSONS_STATUS, LEVELS } from "@/feature/lesson/types/lesson";
import LessonShowAllView from "@/feature/lesson/views/LessonShowAllView";

export default function LessonPage() {
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { search, searchParam, setSearch, page, perPage, updateQueryParams } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const { data, isLoading, isError, error } = useLessonList({
    page,
    perPage,
    search: searchParam || undefined,
    level: levelFilter !== "all" ? levelFilter : undefined,
    status:
      statusFilter !== "all" ? (statusFilter as ContentStatus) : undefined,
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Lesson Show All
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage lesson content
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h2 className="text-xl font-semibold tracking-tight capitalize">
            Lesson
          </h2>
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

        <LessonShowAllView
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onUpdateQueryParams={updateQueryParams}
        />
      </div>
    </div>
  );
}
