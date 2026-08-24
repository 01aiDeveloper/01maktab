import api from "@/services/api"
import type { CourseKind } from "@/services/react-query/course"

const formats = {
  skill: "SKILL",
  course: "COURSE",
  profession: "PROFESSION",
} as const

export const catalogApi = {
  async getList(kind: CourseKind, authenticated = false, pageSize = 20) {
    const response = await api.get(authenticated ? "/course/client" : "/course/public", {
      params: { format: formats[kind], pageSize },
    })
    const data = response.data?.data?.data ?? response.data?.data ?? []
    return Array.isArray(data) ? data : []
  },
  async getDetail(kind: CourseKind, id: string | number) {
    const path = kind === "course" ? `/course/${id}/public` : `/course/${kind}/${id}/public`
    const response = await api.get(path)
    return response.data?.data ?? response.data
  },
}
