'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { NoData } from '@/components/ui/no-data';

interface Certificate {
  id: number;
  title: string;
  date: string;
}

export function TabCertificates() {
  const { data: items = [], isLoading: loading } = useQuery<Certificate[]>({
    queryKey: ['my-certificates'],
    queryFn: async () => {
      const response = await api.get('/user/me/certificates');
      const data = response.data?.data?.data || response.data?.data || [];
      return Array.isArray(data) ? data : [];
    },
  });

  if (loading) {
    return (
      <div className=" pb-8">
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className=" pb-8">
        <div className="bg-white rounded-[22px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <NoData
            title="Здесь пока ничего нет"
            description="Пройдите курс и получите профессиональный сертификат"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto px-4 pb-8">
      <div className="bg-white rounded-[22px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-medium text-gray-900">{item.title}</span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
