import api from "@/services/api"
import type { ApiResponse, ApiSubscriptionPlan } from "@/types/api"

export const subscriptionApi = {
  async getPublicPlans() {
    const response = await api.get<ApiResponse<ApiSubscriptionPlan[]>>("/subscription-plan/public")
    const data = response.data?.data
    return Array.isArray(data) ? data : []
  },
}
