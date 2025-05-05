import userApi from "@/feature/user/services/authApi";
import { LoginDto } from "@/services/swagger-types";
import { useMutation } from "@tanstack/react-query";

export const AUTH_KEY_FACTORY = {
  login: ["login"] as const,
  all: ["auth"] as const,
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (form: LoginDto) => userApi.login(form),
  });
};
