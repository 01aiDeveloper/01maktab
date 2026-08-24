import type { Uuid } from "@/types/api-contracts"

export interface Region {
  id: Uuid
  region: string
}

export interface District {
  id: Uuid
  district: string
  regionId: Uuid
}
