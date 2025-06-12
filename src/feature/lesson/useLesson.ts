import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
import {
  CreateSpeakingDTO,
  Lesson,
  LessonsResponse,
  UpdateLessonDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const LESSON_KEY_FACTORY = {
  all: ["lesson"] as const,
  lists: () => [...LESSON_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...LESSON_KEY_FACTORY.lists(), params] as const,
  details: () => [...LESSON_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...LESSON_KEY_FACTORY.details(), id] as const,
};

export const useLessonList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: LESSON_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useLessonDetail = (
  id: string | null,
  options?: UseQueryOptions<Lesson>,
) => {
  return useQuery({
    queryKey: LESSON_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await lessonApi.getSpeakingById(id ?? "");
      return response.data;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useLessonUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLessonDTO }) =>
      lessonApi.updateLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LESSON_KEY_FACTORY.all });
    },
  });
};

export const useLessonCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpeakingDTO) => lessonApi.createSpeaking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LESSON_KEY_FACTORY.all });
    },
  });
};

export const useLessonRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonApi.removeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LESSON_KEY_FACTORY.all });
    },
  });
};
