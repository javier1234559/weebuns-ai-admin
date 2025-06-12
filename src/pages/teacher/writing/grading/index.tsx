import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { capitalize } from "@/lib/text";
import usePaginationUrl from "@/hooks/use-pagination-url";
import { SkillType, SubmissionStatus } from "@/services/swagger-types";
import { useWritingSubmissionTeacher } from "@/feature/lesson/writing/hooks/useWriting";
import WritingGradingShowAllView from "@/feature/lesson/writing/views/WritingGradingShowAllView";

export enum SubmissionStatusTeacher {
  Submitted = "submitted",
  Scored = "scored",
}

export default function GradeWritingLessonPage() {
  const [statusFilter, setStatusFilter] = useState<SubmissionStatusTeacher>(
    SubmissionStatusTeacher.Submitted,
  );

  const { search, searchParam, setSearch, page, perPage, updateQueryParams } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const { data, isLoading, isError, error } = useWritingSubmissionTeacher({
    submissionType: "writing" as SkillType,
    page,
    perPage,
    search: searchParam || undefined,
    status: statusFilter as unknown as SubmissionStatus,
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Quản lý bài chấm điểm
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Chấm điểm bài viết
            </p>
          </div>
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
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as SubmissionStatusTeacher)
              }
            >
              <SelectTrigger className="h-10 text-sm w-[130px]">
                <Filter className="mr-1 h-3.5 w-3.5" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SubmissionStatusTeacher).map((status) => (
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

        <WritingGradingShowAllView
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
