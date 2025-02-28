import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function getRedirectToLoginUrl() {
  const requestUrl = new URL(window.location.href)

  const loginParams = new URLSearchParams(requestUrl.search)
  if (!loginParams.has("redirectTo")) {
    loginParams.append("redirectTo", requestUrl.pathname)
  }
  return `/login?${loginParams.toString()}`
}
