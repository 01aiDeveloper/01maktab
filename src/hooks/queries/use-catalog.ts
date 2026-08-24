import { useQuery } from "@tanstack/react-query"
import { catalogApi } from "@/services/react-query/catalog"
import type { CourseKind } from "@/services/react-query/course"

export function useCatalog(kind: CourseKind, authenticated = false, pageSize = 20) {
  return useQuery({
    queryKey: ["catalog", kind, authenticated ? "client" : "public", pageSize],
    queryFn: () => catalogApi.getList(kind, authenticated, pageSize),
  })
}
