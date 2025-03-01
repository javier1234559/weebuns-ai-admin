import { RouteNames } from "@/constraints/route-name"

export function getRedirectToLoginUrl() {
  const requestUrl = new URL(window.location.href)

  const loginParams = new URLSearchParams(requestUrl.search)
  if (!loginParams.has("redirectTo")) {
    loginParams.append("redirectTo", requestUrl.pathname)
  }
  return `/${RouteNames.SignIn}?${loginParams.toString()}`
}

export function getRedirectUrl() {
  const redirectUrl =
    new URLSearchParams(window.location.search).get("redirectTo")

  return redirectUrl
}
