export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  course: {
    detail: (id: string | number) => ["course", String(id)] as const,
    modules: (kind: string, id: string | number) => ["modules", kind, String(id)] as const,
    info: (kind: string, id: string | number) => ["course-info", kind, String(id)] as const,
    badges: (id: string | number) => ["course-badges", String(id)] as const,
    exam: (id: string | number) => ["course-exam", String(id)] as const,
    mine: (kind: string) => ["my", kind] as const,
  },
  lesson: {
    detail: (id: string | number) => ["lesson", String(id)] as const,
    moduleTest: (id: string | number) => ["module-test", String(id)] as const,
  },
  waitlist: {
    mine: ["waitlist", "mine"] as const,
  },
  market: {
    list: ["market", "products"] as const,
    detail: (id: string) => ["market", "product", id] as const,
  },
  address: {
    regions: (search = "") => ["address", "regions", search] as const,
    districts: (regionId = "", search = "") => ["address", "districts", regionId, search] as const,
  },
  mentors: {
    list: (pageNumber = 1, pageSize = 10) => ["mentors", pageNumber, pageSize] as const,
  },
  notifications: {
    list: (pageNumber = 1, pageSize = 20) => ["notifications", pageNumber, pageSize] as const,
    unreadCount: ["notifications", "unread-count"] as const,
  },
} as const
