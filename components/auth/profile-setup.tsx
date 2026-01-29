"use client"
import { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import api from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"

interface ProfileSetupProps {
  onBack: () => void
  onComplete: () => void
  isModal?: boolean
}

export function ProfileSetup({ onBack, onComplete, isModal }: ProfileSetupProps) {
  const { setUser } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // phone: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    // region: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Format birthday if all parts are provided
      let birthday = undefined
      if (formData.birthYear && formData.birthMonth && formData.birthDay) {
        birthday = new Date(
          parseInt(formData.birthYear),
          parseInt(formData.birthMonth) - 1,
          parseInt(formData.birthDay),
        ).toISOString()
      }

      // Prepare API payload
      const payload: any = {
        firstname: formData.firstName,
        lastname: formData.lastName,
      }

      // Add optional fields only if they have values
      if (formData.gender) {
        payload.gender = formData.gender.toUpperCase()
      }
      if (birthday) {
        payload.birthday = birthday
      }
      // if (formData.phone) {
      //   payload.phone = formData.phone
      // }
      // if (formData.region) {
      //   payload.region = formData.region
      // }

      // Send to API
      const response = await api.patch("/user/me", payload)

      // Update user in store
      if (response.data?.data) {
        setUser(response.data.data)
      }

      // Call onComplete callback
      onComplete()

      // Redirect to home page to show PrivateHomePage
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Ma'lumotlarni saqlashda xatolik yuz berdi")
      console.error("Profile setup failed", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const regions = [
    "Toshkent shahri",
    "Toshkent viloyati",
    "Andijon",
    "Buxoro",
    "Farg'ona",
    "Jizzax",
    "Xorazm",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Samarqand",
    "Sirdaryo",
    "Surxondaryo",
    "Qoraqalpog'iston Respublikasi",
  ]

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ]
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString())

  return (
    <div className={cn("w-full flex flex-col items-center", isModal ? "p-0" : "p-0")}>
      <div className="w-full flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">01MAKTAB</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
          Keling tanishamiz 👋
        </h2>
        <p className="text-sm text-gray-400">Pastdagi ma'lumotlarni to'ldiring</p>
      </div>

      {error && <p className="text-sm text-red-500 font-medium mb-4 text-center">{error}</p>}

      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-600 ml-1">Ism *</label>
            <Input
              placeholder="Ism"
              className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 transition-all"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-600 ml-1">Familiya *</label>
            <Input
              placeholder="Familiya"
              className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 transition-all"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>

        {/* <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Telefon raqami *</label>
          <div className="relative flex items-center bg-gray-50 border border-transparent rounded-xl p-3 focus-within:bg-white focus-within:border-gray-200 transition-all">
            <div className="flex items-center gap-2 pr-3 border-r border-gray-200 mr-3">
              <img src="https://flagcdn.com/uz.svg" alt="UZ" className="w-6 h-4 rounded-sm object-cover" />
              <span className="text-gray-900 font-medium">+998</span>
            </div>
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-gray-900 font-medium"
              placeholder="(90) 123-45-67"
              required
            />
          </div>
        </div> */}

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Tug'ilgan kuningiz</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthDay}
                onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
              >
                <option value="">Kun</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthMonth}
                onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
              >
                <option value="">Oy</option>
                {months.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              >
                <option value="">Yil</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Jins</label>
          <div className="relative">
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Jins</option>
              <option value="MALE">Erkak</option>
              <option value="FEMALE">Ayol</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-gray-600 ml-1">Viloyat</label>
          <div className="relative">
            <select
              className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 appearance-none text-gray-900 focus:bg-white focus:border-gray-200 transition-all outline-none"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            >
              <option value="">Qaysi viloyatdansiz?</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div> */}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E5E7EB] hover:bg-gray-300 text-gray-600 font-semibold py-7 rounded-2xl shadow-none mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saqlanmoqda..." : "Boshlash"}
        </Button>
      </form>
    </div>
  )
}
