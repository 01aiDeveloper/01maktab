import api from "@/lib/api"
import type {
  ApiResponse,
  Course,
  CourseFormat,
  PaginatedResponse,
} from "@/types/api.types"

interface GetCoursesParams {
  format?: CourseFormat
  pageNumber?: number
  pageSize?: number
  difficulty?: string
  pricingType?: string
  asClient?: boolean
}

export const courseService = {
  /**
   * Get courses list. When asClient=true, hits /course/client (returns hasPurchased).
   */
  async getCourses(params: GetCoursesParams = {}) {
    const { format = "COURSE", pageNumber = 1, pageSize = 10, asClient, ...rest } = params

    const response = await api.get<ApiResponse<PaginatedResponse<Course>>>(
      asClient ? "/course/client" : "/course/public",
      {
        params: {
          format,
          pageNumber,
          pageSize,
          ...rest,
        },
      },
    )

    return response.data
  },

  /**
   * Get course by ID
   */
  async getCourseById(id: number) {
    const response = await api.get<ApiResponse<Course>>(`/course/public/${id}`)
    return response.data
  },
}
