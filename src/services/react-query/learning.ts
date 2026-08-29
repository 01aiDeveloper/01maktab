import api from "@/services/api"
import type {
  ApiResponse,
  ApiModuleTestResponse,
  ApiSubmitTestResponse,
  ApiSubmitExamPayload,
} from "@/types/api"
import type { Lesson } from "@/types/lesson"

export const learningApi = {
  async getLesson(id: string | number, isPublic = false) {
    const path = isPublic ? `/lesson/public/${id}` : `/lesson/${id}`
    const response = await api.get<ApiResponse<Lesson>>(path)
    return response.data.data
  },
  async completeLesson(id: string | number) {
    const response = await api.post(`/lesson/${id}/complete`)
    return response.data?.data ?? response.data
  },
  async getModuleTest(moduleId: string | number) {
    const response = await api.get<ApiResponse<ApiModuleTestResponse>>(`/test/module/${moduleId}`)
    return response.data?.data ?? response.data
  },
  async submitModuleTest(moduleId: string | number, payload: ApiSubmitExamPayload) {
    const response = await api.post<ApiResponse<ApiSubmitTestResponse>>(`/test/module/${moduleId}/submit`, payload)
    return response.data?.data ?? response.data
  },
  async submitTest(url: string, payload: unknown) {
    const response = await api.post(url, payload)
    return response.data?.data ?? response.data
  },
}
