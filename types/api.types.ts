// Generic API Response Types
export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  pagination: {
    pageNumber: number
    pageSize: number
    count: number
    pageCount: number
  }
}

// Course Types
export type CourseFormat = "COURSE" | "BOOTCAMP" | "WORKSHOP"
export type CourseDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
export type CoursePricingType = "FREE" | "PAID"

export interface Course {
  id: number
  format: CourseFormat
  name: string
  title: string
  description: string
  photo: string
  icon: string
  difficulty: CourseDifficulty
  duration: number
  price: number
  pricingType: CoursePricingType
  direction: string
  createdAt: string
}

// User Types
export interface User {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  avatar?: string
  gender?: "MALE" | "FEMALE"
  birthday?: string
}

// Auth Types
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  prompt: "signin" | "signup"
  user?: User
}
