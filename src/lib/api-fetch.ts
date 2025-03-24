/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteNames } from "@/constraints/route-name";
import { getRedirectToLoginUrl } from "@/feature/user/utils";

export function redirectToLogin() {
  if (window.location.pathname === RouteNames.SignIn) {
    return;
  }
  const redirectUrl = getRedirectToLoginUrl();
  window.location.replace(redirectUrl);
}

export const getFetchErrorMessage = (error: Error) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
