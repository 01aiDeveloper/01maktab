import type { Uuid } from "@/types/api-contracts"

export interface Mentor {
  id: Uuid
  fullname: string | null
  photo: string
  position: string | null
  about: string | null
  decorImage: string | null
  createdAt: string
}
