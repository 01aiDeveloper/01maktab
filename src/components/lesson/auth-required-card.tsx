'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function AuthRequiredCard() {
  const t = useTranslations('lesson');
  return (
    <div className="bg-white rounded-3xl p-12 text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="w-10 h-10 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-4">
        {t('authTitle')}
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        {t('authDescription')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/login">
          <Button size="lg" className="rounded-xl w-full sm:w-auto">
            {t('register')}
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline" className="rounded-xl w-full sm:w-auto">
            {t('login')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
