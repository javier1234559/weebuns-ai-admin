/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteNames } from "@/constraints/route-name";
import { getRedirectToLoginUrl } from "@/lib/utils"

// type ApiRequestInit = Omit<RequestInit, 'body'> & {
//   body?: Record<string, any> | string;
// }

// export async function apiFetch<T = any>(url: string, options: ApiRequestInit = {}): Promise<T> {
//   const headers = new Headers(options.headers)

//   const fetchOptions: RequestInit = {
//     ...options,
//     credentials: 'include',
//     headers,
//   }

//   // Handle non-GET requests body formatting
//   if (options.method && options.method.toLowerCase() !== "get") {
//     if (typeof options.body === "string") {
//       fetchOptions.body = JSON.parse(options.body)
//     }
//     if (!fetchOptions.body) {
//       fetchOptions.body = {}
//     }
//     // Ensure body is stringified for fetch
//     if (typeof fetchOptions.body === "object") {
//       fetchOptions.body = JSON.stringify(fetchOptions.body)
//     }
//   }

//   try {
//     const response = await fetch(url, fetchOptions)
//     if (response.status === 401) {
//       redirectToLogin()
//       throw new Error('Unauthorized')
//     }

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return await response.json()
//   } catch (error) {
//     throw error
//   }
// }

export const apiFetch = <T>(url: string, options?: RequestInit) => {
  return fetch(url, options).then(res => res.json()) as Promise<T>
}



export function redirectToLogin() {
  if (window.location.pathname === RouteNames.SignIn) {
    return
  }
  const redirectUrl = getRedirectToLoginUrl()
  window.location.replace(redirectUrl)
}

export const getFetchErrorMessage = (error: Error) => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
