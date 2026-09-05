import api from "@/services/api"
import type { CourseKind } from "@/services/react-query/course"
import type { PaginatedResponse } from '@/types/common'
import { unwrapPaginatedData } from '@/types/api-contracts'

const formats = {
  skill: "SKILL",
  course: "COURSE",
  profession: "PROFESSION",
} as const

export const catalogApi = {
  async getList(kind: CourseKind, authenticated = false, pageSize = 20, pageNumber = 1) {
    const response = await api.get(authenticated ? "/course/client" : "/course/public", {
      params: { format: formats[kind], pageSize, pageNumber },
    })
    return unwrapPaginatedData<unknown>(response.data) as PaginatedResponse<unknown>
  },
  async getDetail(kind: CourseKind, id: string | number, authenticated = false) {
    const mode = authenticated ? "client" : "public"
    const path = kind === "course" ? `/course/${id}/${mode}` : `/course/${kind}/${id}/${mode}`
    const response = await api.get(path)
    return response.data?.data ?? response.data
  },
}
