import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/query-keys"
import { addressApi } from "@/services/react-query/address"

export function useRegions(search = "") {
  return useQuery({
    queryKey: queryKeys.address.regions(search),
    queryFn: () => addressApi.getRegions(search || undefined),
    staleTime: 1000 * 60 * 60,
  })
}

export function useDistricts(regionId?: string, search = "") {
  return useQuery({
    queryKey: queryKeys.address.districts(regionId, search),
    queryFn: () => addressApi.getDistricts(regionId, search || undefined),
    enabled: Boolean(regionId),
    staleTime: 1000 * 60 * 60,
  })
}
