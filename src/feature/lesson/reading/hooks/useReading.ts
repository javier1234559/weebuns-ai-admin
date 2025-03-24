import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
import {
  CreateReadingDTO,
  Lesson,
  LessonsResponse,
  UpdateReadingDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const READING_KEY_FACTORY = {
  all: ["reading"] as const,
  lists: () => [...READING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...READING_KEY_FACTORY.lists(), params] as const,
  details: () => [...READING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...READING_KEY_FACTORY.details(), id] as const,
};

export const useReadingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useReadingDetail = (
  id: string | null,
  options?: UseQueryOptions<Lesson>,
) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await lessonApi.getReadingById(id ?? "");
      return response.data;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useReadingCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReadingDTO) => lessonApi.createReading(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: READING_KEY_FACTORY.all });
    },
  });
};

export const useReadingUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReadingDTO }) =>
      lessonApi.updateReading(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: READING_KEY_FACTORY.all });
    },
  });
};

export const useLessonRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonApi.removeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: READING_KEY_FACTORY.all });
    },
  });
};
