import api from "@/services/api"
import type { GraduateStory, GraduateStoryCard } from "@/types/story"

export const graduateApi = {
  async getOne(id: string | number): Promise<GraduateStory> {
    const response = await api.get(`/graduate/public/${id}`)
    return response.data?.data ?? response.data
  },
  async getList(pageSize = 20): Promise<GraduateStoryCard[]> {
    const response = await api.get("/graduate/public", { params: { pageSize } })
    const data = response.data?.data?.data ?? response.data?.data ?? []
    return Array.isArray(data) ? data : []
  },
}
