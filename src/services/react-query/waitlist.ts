import api from "@/services/api"
import type { ApiResponse, ApiWaitlistEntry } from "@/types/api"

export const waitlistApi = {
  async getMine() {
    const response = await api.get<ApiResponse<ApiWaitlistEntry[]>>("/course/my/waitlist")
    return response.data.data
  },
  async join(courseId: string | number) {
    const response = await api.post<ApiResponse<ApiWaitlistEntry>>(`/course/${courseId}/waitlist`)
    return response.data.data
  },
}
