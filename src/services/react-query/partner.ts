import api from "@/services/api"
import type { Partner } from "@/types/common"
import type { PaginatedResponse } from '@/types/common'
import { unwrapPaginatedData } from '@/types/api-contracts'

export const partnerApi = {
  async getPublicList(pageSize = 20, pageNumber = 1): Promise<PaginatedResponse<Partner>> {
    const response = await api.get("/partner/public", { params: { pageSize, pageNumber } })
    return unwrapPaginatedData<Partner>(response.data) as PaginatedResponse<Partner>
  },
  async getOne(id: string | number): Promise<Partner> {
    const response = await api.get(`/partner/${id}`)
    return response.data?.data ?? response.data
  },
}
