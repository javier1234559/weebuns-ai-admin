import { SampleEssayDTO, UserDataDTO } from "@/services/swagger-types";

export const mergedContentHtml = (data: UserDataDTO | SampleEssayDTO) => {
  const { instruction, body1, body2, conclusion } = data;
  return [instruction, body1, body2, conclusion].filter(Boolean).join("<br>");
};
