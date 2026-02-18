import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import api from "../api/posts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function createSessionLog(userId: number, sessionType: string, durationSeconds: number, durationMinutes: number, completedAt: string, status: string) {
  try {
    const response = await api.post('/sessions', {
      userId,
      sessionType,
      durationSeconds,
      durationMinutes,
      completedAt,
      status
    })
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
