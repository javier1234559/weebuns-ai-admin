import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  LoginDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from "@/services/swagger-types";

const authApi = {
  login: (form: LoginDto) =>
    api
      .authControllerLogin(form)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi đăng nhập",
        );
      }),

  register: (form: RegisterDto) =>
    api
      .authControllerRegister(form)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi đăng ký",
        );
      }),

  loginGoogle: (accessToken: string) =>
    api
      .authControllerLoginWithGoogle({ accessToken })
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi đăng nhập với Google",
        );
      }),

  loginFacebook: (accessToken: string) =>
    api
      .authControllerLoginWithFacebook({ accessToken })
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi đăng nhập với Facebook",
        );
      }),

  getCurrentUser: () =>
    api
      .authControllerMe()
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi lấy thông tin người dùng",
        );
      }),

  logout: () =>
    api
      .authControllerLogout()
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi đăng xuất",
        );
      }),

  requestResetPass: (data: RequestResetPasswordDto) =>
    api
      .authControllerRequestPasswordReset(data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi yêu cầu đặt lại mật khẩu",
        );
      }),

  verifyResetPass: (data: VerifyResetCodeDto) =>
    api
      .authControllerVerifyResetCode(data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi xác thực mã đặt lại mật khẩu",
        );
      }),

  resetPassword: (data: ResetPasswordDto) =>
    api
      .authControllerResetPassword(data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi đặt lại mật khẩu",
        );
      }),

  updateProfile: (id: string, data: any) =>
    api
      .userControllerUpdateTeacherProfile(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật thông tin",
        );
      }),
};

export default authApi;
