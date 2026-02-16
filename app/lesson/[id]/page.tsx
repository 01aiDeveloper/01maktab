import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';
import { LessonHeaderActions } from '@/components/lesson/lesson-header-actions';
import { UniversalVideoPlayer } from '@/components/lesson/universal-video-player';
import { LessonBlockRenderer } from '@/components/lesson/lesson-block-renderer';
import { AuthRequiredCard } from '@/components/lesson/auth-required-card';
import { WelcomeModal } from '@/components/lesson/welcome-modal';
import { Lesson } from '@/types/lesson';
import { sortByOrder } from '@/lib/lesson-utils';
import api from '@/lib/api';

async function getLesson(id: string): Promise<{ lesson: Lesson | null; requiresAuth: boolean }> {
  try {
    const response = await api.get(`/lesson/${id}`);
    return { lesson: response.data?.data || null, requiresAuth: false };
  } catch (error: any) {
    console.error('Failed to fetch lesson:', error);
    // Check if it's 401 Unauthorized
    if (error.response?.status === 401) {
      return { lesson: null, requiresAuth: true };
    }
    return { lesson: null, requiresAuth: false };
  }
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { lesson, requiresAuth } = await getLesson(id);

  console.log(lesson)
  if (!lesson && !requiresAuth) {
    notFound();
  }

  return (
    <>
      <SiteHeader variant="light" />

      <WelcomeModal />

      <main className="min-h-screen bg-[#f5f5f5] py-8">
        <div className="container mx-auto px-4 max-w-[1100px]">
          {requiresAuth ? (
            <AuthRequiredCard />
          ) : lesson ? (
            <>
              <LessonHeaderActions isPublic={lesson.isPublic} />

              <div className="bg-white rounded-3xl p-8 lg:p-12 mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Dars {lesson.orderId}. {lesson.title}
                </h1>
                {lesson.description && (
                  <p className="text-muted-foreground mb-8">
                    {lesson.description}
                  </p>
                )}

                {/* Videos */}
                {lesson.videos && lesson.videos.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {sortByOrder(lesson.videos).map((video) => (
                      <UniversalVideoPlayer key={video.id} sourceUrl={video.link} sourceType={video.linkType} />
                    ))}
                  </div>
                )}

                {/* Content Blocks */}
                {lesson.blocks && lesson.blocks.length > 0 && <LessonBlockRenderer blocks={lesson.blocks} />}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center gap-4 max-w-[520px] mx-auto">
                <Button size="lg" variant="outline" className="flex-1 rounded-xl" disabled>
                  <ArrowLeft className="w-4 h-4" />
                  Oldingi dars
                </Button>
                <Button size="lg" className="flex-1 rounded-xl">
                  Keyingi dars
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="h-12" />
            </>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
