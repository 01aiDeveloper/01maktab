import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { WelcomeModal } from '@/components/lesson/welcome-modal';
import { LessonContent } from '@/components/lesson/lesson-content';

export default function LessonPage() {
  return (
    <>
      <SiteHeader variant="light" />

      <WelcomeModal />

      <main className="min-h-screen bg-[#f5f5f5] py-8">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <LessonContent />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
