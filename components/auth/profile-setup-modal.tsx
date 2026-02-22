"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUpdateProfile } from "@/hooks/use-update-profile"

interface ProfileSetupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileSetupModal({ isOpen, onClose }: ProfileSetupModalProps) {
  const { updateProfile, isLoading: isSubmitting, error, setError } = useUpdateProfile()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
  })

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        gender: "",
      })
      setError(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    let birthday: string | undefined
    if (formData.birthYear && formData.birthMonth && formData.birthDay) {
      birthday = new Date(
        parseInt(formData.birthYear),
        parseInt(formData.birthMonth) - 1,
        parseInt(formData.birthDay),
      ).toISOString()
    }

    const payload: Record<string, string> = {
      firstname: formData.firstName,
      lastname: formData.lastName,
    }
    if (formData.gender) payload.gender = formData.gender.toUpperCase()
    if (birthday) payload.birthday = birthday

    try {
      await updateProfile(payload)
      onClose()
    } catch {
      // error is handled inside hook
    }
  }

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
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString())

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - shaffof va yopib bo'lmaydigan (click qilganda hech narsa bo'lmaydi) */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={(e) => e.preventDefault()} />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">01MAKTAB</h1>

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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E5E7EB] hover:bg-gray-300 text-gray-600 font-semibold py-7 rounded-2xl shadow-none mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saqlanmoqda..." : "Boshlash"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
