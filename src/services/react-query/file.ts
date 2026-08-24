import api from "@/services/api"

export const fileApi = {
  async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)
    const response = await api.post("/file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data?.data?.data as string
  },
}
