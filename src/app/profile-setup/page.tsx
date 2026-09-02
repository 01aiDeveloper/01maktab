"use client"

import { ProfileSetup } from "@/components/auth/profile-setup"
import { useRouter } from "next/navigation"

export default function ProfileSetupPage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white rounded-[40px] shadow-sm p-8 md:p-12">
        <ProfileSetup onBack={() => router.push("/login")} onComplete={handleComplete} />
      </div>
    </div>
  )
}
