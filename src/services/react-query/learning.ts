import api from "@/services/api"
import type { ApiResponse } from "@/types/api"
import type { Lesson } from "@/types/lesson"

export const learningApi = {
  async getLesson(id: string | number) {
    const response = await api.get<ApiResponse<Lesson>>(`/lesson/${id}`)
    return response.data.data
  },
  async completeLesson(id: string | number) {
    const response = await api.post(`/lesson/${id}/complete`)
    return response.data?.data ?? response.data
  },
  async getModuleTest(id: string | number) {
    const response = await api.get(`/test/module/${id}`)
    return response.data?.data ?? response.data
  },
  async submitTest(url: string, payload: unknown) {
    const response = await api.post(url, payload)
    return response.data?.data ?? response.data
  },
}
