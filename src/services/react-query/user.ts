import api from "@/services/api"
import type { AuthUser } from "@/store/features/auth/auth-slice"

export interface UpdateProfilePayload {
  firstname?: string
  lastname?: string
  phone?: number | string
  email?: string
  birthday?: string
  gender?: string
  region?: string
  photo?: string
}

export const userApi = {
  async getMe(): Promise<AuthUser> {
    const response = await api.get("/user/me")
    return response.data?.data ?? response.data
  },
  async updateMe(payload: UpdateProfilePayload): Promise<AuthUser> {
    const response = await api.patch("/user/me", payload)
    return response.data?.data ?? response.data
  },
  async getPayments(pageNumber = 1, pageSize = 10) {
    const response = await api.get("/user/my/payments", { params: { pageNumber, pageSize } })
    return response.data?.data ?? response.data
  },
  async getCertificates(pageNumber = 1, pageSize = 10) {
    const response = await api.get("/course-certificate/my", { params: { pageNumber, pageSize } })
    return response.data?.data ?? response.data
  },
  async getAchievements(pageNumber = 1, pageSize = 10) {
    const response = await api.get("/course-badge/user", { params: { pageNumber, pageSize } })
    return response.data?.data ?? response.data
  },
}
