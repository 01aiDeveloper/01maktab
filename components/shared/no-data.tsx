import Image from "next/image"

interface NoDataProps {
  message?: string
  description?: string
}

export function NoData({
  message = "Ma'lumot topilmadi",
  description = "Bu yerda hozircha hech qanday ma'lumot yo'q"
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-48 h-48 mb-6">
        <Image
          src="/images/common/nodata.png"
          alt="No data"
          fill
          className="object-contain opacity-60"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-sm text-gray-500 text-center max-w-md">{description}</p>
    </div>
  )
}
