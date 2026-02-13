'use client';

import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import api from '@/lib/api';

interface Payment {
  id: number;
  courseName: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending';
}

export function TabPayments() {
  const [items, setItems] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/payment/my');
        const data = response.data?.data?.data || response.data?.data || [];
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="max-w-300 mx-auto px-4 pb-8">
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-300 mx-auto px-4 pb-8">
        <div className="bg-white rounded-[22px] p-16 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cloud className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm">To&apos;lovlar mavjud emas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto px-4 pb-8">
      <div className="bg-white rounded-[22px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-400 w-6">{index + 1}</span>
              <span className="flex-1 text-sm font-medium text-gray-900">{item.courseName}</span>
              <span className="text-xs text-gray-400 hidden sm:block">{item.date}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-500 text-white text-xs font-semibold">
                Оплачено
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
