import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
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
  options?: UseQueryOptions,
) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useReadingDetail = (id: string | null, options?: unknown) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.detail(id ?? ""),
    queryFn: () => lessonApi.getLessonById(id ?? ""),
    enabled: !!id,
    // select: (response) => response.data,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useReadingCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => lessonApi.createLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: READING_KEY_FACTORY.all });
    },
  });
};

export const useReadingUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => lessonApi.updateLesson(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: READING_KEY_FACTORY.all });
      // queryClient.invalidateQueries({
      //   queryKey: READING_KEY_FACTORY.detail(data.id),
      // });
    },
  });
};
