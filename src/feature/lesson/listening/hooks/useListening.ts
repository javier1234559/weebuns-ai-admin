import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
import {
  CreateListeningDTO,
  Lesson,
  LessonsResponse,
  UpdateListeningDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const LISTENING_KEY_FACTORY = {
  all: ["listening"] as const,
  lists: () => [...LISTENING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...LISTENING_KEY_FACTORY.lists(), params] as const,
  details: () => [...LISTENING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...LISTENING_KEY_FACTORY.details(), id] as const,
};

export const useListeningList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: LISTENING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useListeningDetail = (
  id: string | null,
  options?: UseQueryOptions<Lesson>,
) => {
  return useQuery({
    queryKey: LISTENING_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await lessonApi.getListeningById(id ?? "");
      return response.data;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useListeningCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListeningDTO) => lessonApi.createListening(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTENING_KEY_FACTORY.all });
    },
  });
};

export const useListeningUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListeningDTO }) =>
      lessonApi.updateListening(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTENING_KEY_FACTORY.all });
    },
  });
};

export const useLessonRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonApi.removeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTENING_KEY_FACTORY.all });
    },
  });
};
