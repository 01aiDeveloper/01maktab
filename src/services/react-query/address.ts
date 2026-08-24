import api from "@/services/api"
import type { District, Region } from "@/types/address"
import { unwrapApiData } from "@/types/api-contracts"

export const addressApi = {
  async getRegions(search?: string) {
    const response = await api.get("/address/regions", { params: search ? { search } : undefined })
    return unwrapApiData<Region[]>(response.data)
  },
  async getDistricts(regionId?: string, search?: string) {
    const response = await api.get("/address/districts", {
      params: { regionId: regionId || undefined, search: search || undefined },
    })
    return unwrapApiData<District[]>(response.data)
  },
}
