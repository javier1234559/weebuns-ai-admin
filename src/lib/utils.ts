/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDev() {
  return import.meta.env.DEV
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}
