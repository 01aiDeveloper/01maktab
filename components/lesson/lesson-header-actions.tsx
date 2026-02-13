import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonHeaderActionsProps {
  isPublic: boolean;
}

export function LessonHeaderActions({ isPublic }: LessonHeaderActionsProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link href="/lessons" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        <span>Orqaga</span>
      </Link>

      <div className="flex items-center gap-3">
        {isPublic && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">Bepul sinov darsi</div>
        )}
        <Button variant="outline" size="icon" className="rounded-full">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full" disabled>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
