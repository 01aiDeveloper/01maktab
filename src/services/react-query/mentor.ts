import api from "@/services/api"
import type { Mentor } from "@/types/mentor"
import { unwrapPaginatedData } from "@/types/api-contracts"

export const mentorApi = {
  async getList(pageNumber = 1, pageSize = 10) {
    const response = await api.get("/mentor", { params: { pageNumber, pageSize } })
    return unwrapPaginatedData<Mentor>(response.data)
  },
  async getById(id: string) {
    const response = await api.get(`/mentor/${id}`)
    return response.data?.data ?? response.data
  },
}
