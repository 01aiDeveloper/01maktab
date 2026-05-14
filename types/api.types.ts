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
  subtitle?: string
  description: string
  photo: string
  cardImage?: string
  icon: string
  difficulty: CourseDifficulty
  duration: number
  price: number
  pricingType: CoursePricingType
  direction: string
  enrollmentCount?: number
  createdAt: string
}

// User Types
export interface User {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  photo?: string
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

// Partner Types
export type ContentBlock =
  | { type: 'text'; value: string; order: number }
  | { type: 'image'; url: string; order: number }
  | { type: 'image_group'; images: string[]; order: number }

export interface Partner {
  id: number
  name: string
  logo: string
  image?: string
  description: string
  website: string
  blocks?: ContentBlock[]
}

// Career/Profession Types
export interface Career {
  id: number
  format: string
  name: string
  slug?: string
  title: string
  subtitle?: string
  description: string
  photo: string
  cardImage?: string
  icon: string | null
  decorImage: string
  enrollmentCount?: number
  waitlistCount?: number
  price?: number
  pricingType?: 'FREE' | 'PAID'
  presalesEnabled?: boolean
  waitlistEnabled?: boolean
  hasPurchased?: boolean
}

// Payment Types
export interface Payment {
  id: number
  amount: number
  status: 'PAID' | 'PENDING' | 'FAILED'
  provider: string
  createdAt: string
}

// Course Certificate Types
export interface CourseCertificate {
  id: number
  /** PDF fayli (yuklash uchun) */
  file: string
  /** Preview rasm (sertifikat thumbnail) */
  thumbnail?: string
  /** Shablon rasmi (preview bo'lmasa, fallback) */
  template?: string
  title: string
  createdAt: string
}

// Course Badge Types
export interface CourseBadge {
  id: number
  title: string
  icon: string
  description: string
  isClaimed: boolean
}

// Skill Types
export interface Skill {
  id: number
  format: string
  name: string
  title: string
  subtitle?: string
  description: string
  photo: string
  cardImage?: string
  icon: string | null
  enrollmentCount?: number
  waitlistCount?: number
  price?: number
  pricingType?: 'FREE' | 'PAID'
  presalesEnabled?: boolean
  waitlistEnabled?: boolean
  hasPurchased?: boolean
}
