import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/query-keys"
import { mentorApi } from "@/services/react-query/mentor"

export function useMentors(pageNumber = 1, pageSize = 10) {
  return useQuery({
    queryKey: queryKeys.mentors.list(pageNumber, pageSize),
    queryFn: () => mentorApi.getList(pageNumber, pageSize),
    staleTime: 1000 * 60 * 15,
  })
}
