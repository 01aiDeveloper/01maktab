export type Uuid = string
export type Locale = "uz" | "ru" | "en"

export interface ApiEnvelope<T> {
  statusCode: number
  message: string
  data: T
}

export interface PaginationMeta {
  pageNumber: number
  pageSize: number
  count: number
  pageCount: number
}

export interface PaginatedData<T> {
  data: T[]
  meta: { pagination: PaginationMeta }
}

export interface TranslationDto {
  locale: Locale
}

export function unwrapApiData<T>(payload: ApiEnvelope<T> | T): T {
  if (typeof payload === "object" && payload !== null && "statusCode" in payload && "data" in payload) {
    return (payload as ApiEnvelope<T>).data
  }
  return payload as T
}

export function unwrapPaginatedData<T>(payload: unknown): PaginatedData<T> {
  const first = unwrapApiData(payload as ApiEnvelope<unknown>)
  const value = unwrapApiData(first as ApiEnvelope<unknown>)

  if (Array.isArray(value)) {
    return {
      data: value as T[],
      meta: { pagination: { pageNumber: 1, pageSize: value.length, count: value.length, pageCount: 1 } },
    }
  }

  const candidate = value as Partial<PaginatedData<T>> | null
  return {
    data: Array.isArray(candidate?.data) ? candidate.data : [],
    meta: candidate?.meta ?? {
      pagination: { pageNumber: 1, pageSize: 0, count: 0, pageCount: 0 },
    },
  }
}
