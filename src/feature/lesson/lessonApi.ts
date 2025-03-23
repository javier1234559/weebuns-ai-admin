import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import { SkillType } from "@/services/swagger-types";
import { LessonType } from "@/services/swagger-types";
import { ContentStatus } from "@/services/swagger-types";

export interface LessonQueryParams {
  limit?: number;
  skill?: SkillType;
  lessonType?: LessonType;
  topic?: string;
  title?: string;
  status?: ContentStatus;
  createdById?: string;
  level?: string;
  tags?: string;
}

const lessonApi = {
  getAllLessons(params: LessonQueryParams) {
    return api
      .lessonControllerGetLessons(params)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  getLessonById(id: string) {
    return api
      .lessonControllerGetLessonById(id)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  createLesson(data: any) {
    return api
      .lessonControllerCreateLesson(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  updateLesson(id: string, data: any) {
    return api
      .lessonControllerUpdateLesson(id, data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default lessonApi;
