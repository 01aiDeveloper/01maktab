import api from "@/services/api"

export const authApi = {
  async telegramLogin(user: unknown) {
    const response = await api.post("/auth/telegram/login", user)
    return response.data?.data ?? response.data
  },
}
