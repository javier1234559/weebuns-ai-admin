import userApi from "@/feature/user/services/userApi";
import { LoginDto } from "@/services/swagger-types";
import { useMutation } from "@tanstack/react-query";

export const USER_KEY_FACTORY = {
  login: ["login"] as const,
  all: ["users"] as const,
  lists: () => [...USER_KEY_FACTORY.all, "list"] as const,
  details: () => [...USER_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...USER_KEY_FACTORY.details(), id] as const,
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (form: LoginDto) => userApi.login(form),
  });
};
