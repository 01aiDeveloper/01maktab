import api from "@/services/api"
import type { GraduateStory, GraduateStoryCard } from "@/types/story"
import type { PaginatedResponse } from '@/types/common'
import { unwrapPaginatedData } from '@/types/api-contracts'

export const graduateApi = {
  async getOne(id: string | number): Promise<GraduateStory> {
    const response = await api.get(`/graduate/public/${id}`)
    return response.data?.data ?? response.data
  },
  async getList(pageSize = 20, pageNumber = 1): Promise<PaginatedResponse<GraduateStoryCard>> {
    const response = await api.get("/graduate/public", { params: { pageSize, pageNumber } })
    return unwrapPaginatedData<GraduateStoryCard>(response.data) as PaginatedResponse<GraduateStoryCard>
  },
}
