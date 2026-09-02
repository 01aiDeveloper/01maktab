import api from "@/services/api"
import type {
  ApiCourse,
  ApiCourseModules,
  ApiProfession,
  ApiResponse,
  ApiSkill,
  ApiWaitlistEntry,
  ApiExamResponse,
  ApiSubmitExamPayload,
  ApiSubmitExamResponse,
} from "@/types/api"

export type CourseKind = "course" | "skill" | "profession"

const detailPath = (kind: CourseKind, id: string | number, authenticated = false) => {
  const mode = authenticated ? "client" : "public"
  return kind === "course" ? `/course/${id}/${mode}` : `/course/${kind}/${id}/${mode}`
}

const modulePath = (kind: CourseKind, id: string | number) =>
  kind === "course" ? `/course/${id}/module` : `/course/${kind}/${id}/module`

export const courseApi = {
  async getCourse(id: string | number, authenticated = false) {
    const response = await api.get<ApiResponse<ApiCourse>>(detailPath("course", id, authenticated))
    return response.data.data
  },
  async getSkill(id: string | number, authenticated = false) {
    const response = await api.get<ApiResponse<ApiSkill>>(detailPath("skill", id, authenticated))
    return response.data.data
  },
  async getProfession(id: string | number, authenticated = false) {
    const response = await api.get<ApiResponse<ApiProfession>>(detailPath("profession", id, authenticated))
    return response.data.data
  },
  async getModules(kind: CourseKind, id: string | number) {
    const response = await api.get<ApiResponse<ApiCourseModules>>(modulePath(kind, id))
    return response.data.data
  },
  async getPublicInfo(id: string | number) {
    const response = await api.get(`/course/${id}/public/info`)
    return response.data?.data ?? response.data
  },
  async getMine<T>(kind: "courses" | "skills" | "professions") {
    const response = await api.get<ApiResponse<T[]>>(`/course/my/${kind}`)
    return response.data.data
  },
  async getMyWaitlist() {
    const response = await api.get<ApiResponse<ApiWaitlistEntry[]>>("/course/my/waitlist")
    return response.data.data
  },
  async getBadges() {
    const response = await api.get("/course-badge/my")
    return response.data?.data?.data ?? response.data?.data ?? []
  },
  async getExam(courseId: string | number) {
    const response = await api.get<ApiResponse<ApiExamResponse>>(`/exam/course/${courseId}`)
    return response.data?.data ?? response.data
  },
  async submitExam(courseId: string | number, payload: ApiSubmitExamPayload) {
    const response = await api.post<ApiResponse<ApiSubmitExamResponse>>(`/exam/course/${courseId}/submit`, payload)
    return response.data?.data ?? response.data
  },
  async generateCertificate(courseId: string | number) {
    const response = await api.get(`/course-certificate/generate/${courseId}`)
    return response.data?.data ?? response.data
  },
  async getMyCertificates(pageNumber = 1, pageSize = 10) {
    const response = await api.get("/course-certificate/my", { params: { pageNumber, pageSize } })
    return response.data?.data ?? response.data
  },
  async enroll(courseId: string | number) {
    const response = await api.post(`/course/${courseId}/enroll`)
    return response.data?.data ?? response.data
  },
  async applyProfession(courseId: string | number) {
    const response = await api.post(`/course/${courseId}/apply/profession`)
    return response.data?.data ?? response.data
  },
  async addToWaitlist(courseId: string | number) {
    const response = await api.post(`/course/${courseId}/waitlist`)
    return response.data?.data ?? response.data
  },
}
