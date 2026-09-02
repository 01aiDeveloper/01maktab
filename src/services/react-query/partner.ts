import api from "@/services/api"
import type { Partner } from "@/types/common"

export const partnerApi = {
  async getPublicList(pageSize = 20, pageNumber = 1): Promise<Partner[]> {
    const response = await api.get("/partner/public", { params: { pageSize, pageNumber } })
    const data = response.data?.data?.data ?? response.data?.data ?? []
    return Array.isArray(data) ? data : []
  },
  async getOne(id: string | number): Promise<Partner> {
    const response = await api.get(`/partner/${id}`)
    return response.data?.data ?? response.data
  },
}
