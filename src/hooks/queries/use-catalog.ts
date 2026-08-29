import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/common/use-auth"
import { catalogApi } from "@/services/react-query/catalog"
import type { CourseKind } from "@/services/react-query/course"

export function useCatalog(
  kind: CourseKind,
  pageSizeOrAuth?: number | boolean,
  pageSize = 20,
  pageNumber = 1,
) {
  const { accessToken } = useAuth()
  const isAuthenticated =
    typeof pageSizeOrAuth === "boolean" ? pageSizeOrAuth : Boolean(accessToken)
  const size = typeof pageSizeOrAuth === "number" ? pageSizeOrAuth : pageSize

  return useQuery({
    queryKey: ["catalog", kind, isAuthenticated ? "client" : "public", size, pageNumber],
    queryFn: () => catalogApi.getList(kind, isAuthenticated, size, pageNumber),
  })
}
