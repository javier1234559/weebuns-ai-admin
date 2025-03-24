import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  DeleteLessonResponse,
  LessonsResponse,
  ReadingResponse,
  SkillType,
} from "@/services/swagger-types";
import { LessonType } from "@/services/swagger-types";
import { ContentStatus } from "@/services/swagger-types";

export interface LessonQueryParams {
  page?: number;
  perPage?: number;
  skill?: SkillType;
  lessonType?: LessonType;
  topic?: string;
  search?: string;
  status?: ContentStatus;
  level?: string;
  tags?: string;
}

const lessonApi = {
  getAllLessons(params: LessonQueryParams) {
    return api
      .lessonControllerFindAll(params)
      .then((res: any) => res.data as LessonsResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  getReadingById(id: string) {
    return api
      .lessonControllerFindOneReading(id)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  createReading(data: any) {
    return api
      .lessonControllerCreateReading(data)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  updateReading(id: string, data: any) {
    return api
      .lessonControllerUpdateReading(id, data)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  removeLesson(id: string) {
    return api
      .lessonControllerRemove(id)
      .then((res: any) => res.data as DeleteLessonResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default lessonApi;
