import api from "@/services/api"
import type {
  ApiCourse,
  ApiCourseModules,
  ApiProfession,
  ApiResponse,
  ApiSkill,
} from "@/types/api"

export type CourseKind = "course" | "skill" | "profession"

const publicDetailPath = (kind: CourseKind, id: string | number) =>
  kind === "course" ? `/course/${id}/public` : `/course/${kind}/${id}/public`

const modulePath = (kind: CourseKind, id: string | number) =>
  kind === "course" ? `/course/${id}/module` : `/course/${kind}/${id}/module`

export const courseApi = {
  async getCourse(id: string | number) {
    const response = await api.get<ApiResponse<ApiCourse>>(publicDetailPath("course", id))
    return response.data.data
  },
  async getSkill(id: string | number) {
    const response = await api.get<ApiResponse<ApiSkill>>(publicDetailPath("skill", id))
    return response.data.data
  },
  async getProfession(id: string | number) {
    const response = await api.get<ApiResponse<ApiProfession>>(publicDetailPath("profession", id))
    return response.data.data
  },
  async getModules(kind: CourseKind, id: string | number) {
    const response = await api.get<ApiResponse<ApiCourseModules>>(modulePath(kind, id))
    return response.data.data
  },
  async getPublicInfo(kind: CourseKind, id: string | number) {
    const prefix = kind === "course" ? "course" : kind
    const response = await api.get(`/${prefix}/${id}/public/info`)
    return response.data?.data ?? response.data
  },
  async getMine<T>(kind: "courses" | "skills" | "professions") {
    const response = await api.get<ApiResponse<T[]>>(`/course/my/${kind}`)
    return response.data.data
  },
  async getBadges(courseId: number) {
    const response = await api.get("/course-badge", { params: { courseId } })
    return response.data?.data?.data ?? response.data?.data ?? []
  },
  async getExam(courseId: string | number) {
    const response = await api.get(`/exam/course/${courseId}`)
    return response.data?.data ?? response.data
  },
  async generateCertificate(courseId: string | number) {
    const response = await api.get(`/course-certificate/generate/${courseId}`)
    return response.data?.data ?? response.data
  },
  async enroll(courseId: string | number) {
    const response = await api.post(`/course/${courseId}/enroll`)
    return response.data?.data ?? response.data
  },
}
