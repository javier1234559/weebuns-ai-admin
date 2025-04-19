import lessonApi, { LessonQueryParams } from "@/feature/lesson/lessonApi";
import {
  CreateSpeakingDTO,
  Lesson,
  LessonsResponse,
  UpdateSpeakingDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const SPEAKING_KEY_FACTORY = {
  all: ["speaking"] as const,
  lists: () => [...SPEAKING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...SPEAKING_KEY_FACTORY.lists(), params] as const,
  details: () => [...SPEAKING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...SPEAKING_KEY_FACTORY.details(), id] as const,
};

export const useSpeakingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: SPEAKING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useSpeakingDetail = (
  id: string | null,
  options?: UseQueryOptions<Lesson>,
) => {
  return useQuery({
    queryKey: SPEAKING_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await lessonApi.getSpeakingById(id ?? "");
      return response.data;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useSpeakingCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpeakingDTO) => lessonApi.createSpeaking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPEAKING_KEY_FACTORY.all });
    },
  });
};

export const useSpeakingUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpeakingDTO }) =>
      lessonApi.updateSpeaking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPEAKING_KEY_FACTORY.all });
    },
  });
};

export const useSpeakingRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lessonApi.removeLesson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPEAKING_KEY_FACTORY.all });
    },
  });
};
