import api from "@/services/api"
import type {
  ApiPaymentResponse,
  ApiPromocodeCheck,
  ApiResponse,
  PromocodeTargetType,
} from "@/types/api"

export interface CheckPromocodePayload {
  code: string
  targetId: string
  price: number
  type?: PromocodeTargetType
}

export const commerceApi = {
  async checkPromocode(payload: CheckPromocodePayload) {
    const response = await api.post<ApiResponse<ApiPromocodeCheck>>("/promocode/check", {
      ...payload,
      type: payload.type ?? "course",
    })
    return response.data.data
  },
  async createCoursePayment(provider: "click" | "payme", payload: { courseId: string; promocodeId?: string }) {
    const response = await api.post<ApiResponse<ApiPaymentResponse>>(`/${provider}/course`, payload)
    return response.data.data
  },
}
