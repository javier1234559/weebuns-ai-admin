import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
import submissionApi from "@/feature/lesson/submissionApi";
import {
  CreateWritingDTO,
  Lesson,
  LessonsResponse,
  LessonSubmissionsResponse,
  SkillType,
  SubmissionStatus,
  UpdateWritingDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const WRITING_KEY_FACTORY = {
  all: ["writing"] as const,
  lists: () => [...WRITING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...WRITING_KEY_FACTORY.lists(), params] as const,
  details: () => [...WRITING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...WRITING_KEY_FACTORY.details(), id] as const,
};

export const useWritingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: WRITING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useWritingDetail = (
  id: string | null,
  options?: UseQueryOptions<Lesson>,
) => {
  return useQuery({
    queryKey: WRITING_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await lessonApi.getWritingById(id ?? "");
      return response.data;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useWritingCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWritingDTO) => lessonApi.createWriting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WRITING_KEY_FACTORY.all });
    },
  });
};

export const useWritingUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWritingDTO }) =>
      lessonApi.updateWriting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WRITING_KEY_FACTORY.all });
    },
  });
};

export const useWritingRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonApi.removeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WRITING_KEY_FACTORY.all });
    },
  });
};

export interface SubmissionQueryParams {
  page?: number;
  perPage?: number;
  skill?: SkillType;
  submissionType?: SkillType;
  topic?: string;
  search?: string;
  status?: SubmissionStatus;
  level?: string;
  tags?: string;
}

export const useWritingSubmissionTeacher = (
  params: SubmissionQueryParams,
  options?: UseQueryOptions<LessonSubmissionsResponse>,
) => {
  return useQuery({
    queryKey: WRITING_KEY_FACTORY.list(params),
    queryFn: () => submissionApi.getAllSubmissions(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};
