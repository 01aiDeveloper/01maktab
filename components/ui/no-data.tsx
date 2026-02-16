import Image from 'next/image';

interface NoDataProps {
  title?: string;
  description?: string;
  image?: string;
}

export function NoData({
  title = "Здесь пока ничего нет",
  description,
  image = "/icons/no-data.svg",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Image src={image} alt="No data" width={120} height={100} className="mb-4 opacity-60" />
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      {description && (
        <p className="text-gray-300 text-xs mt-1 max-w-xs">{description}</p>
      )}
    </div>
  );
}
