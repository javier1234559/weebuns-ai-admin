import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const lessonApi = {
  getLessons: (params = {}) => {
    return api.get("/lessons", { params });
  },

  getLessonById: (id: string) => {
    return api.get(`/lessons/${id}`);
  },

  createLesson: (lessonData: any) => {
    const data = {
      ...lessonData,
      skill: "reading",
      skill_type: "academic",
      image_url: "/images/lessons/default.png",
      created_by: "current-user-id", // Thường sẽ lấy từ context xác thực
      created_at: new Date(),
      updated_at: new Date(),
    };

    return api.post("/lessons", data);
  },

  updateLesson: (id: string | null, lessonData: any) => {
    const data = {
      ...lessonData,
      updated_at: new Date(),
    };

    return api.put(`/lessons/${id}`, data);
  },

  deleteLesson: (id: string) => {
    return api.delete(`/lessons/${id}`);
  },

  updateLessonStatus: (id: string, status: string) => {
    return api.patch(`/lessons/${id}/status`, { status });
  },
};
