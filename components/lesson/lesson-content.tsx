'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonHeaderActions } from '@/components/lesson/lesson-header-actions';
import { UniversalVideoPlayer } from '@/components/lesson/universal-video-player';
import { LessonBlockRenderer } from '@/components/lesson/lesson-block-renderer';
import { AuthRequiredCard } from '@/components/lesson/auth-required-card';
import { Lesson } from '@/types/lesson';
import { sortByOrder } from '@/lib/lesson-utils';
import api from '@/lib/api';

export function LessonContent() {
  const params = useParams();
  const id = params.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        console.log(`[Lesson] Fetching lesson with ID: ${id}`);
        const response = await api.get(`/lesson/${id}`);
        const lessonData = response.data?.data || null;
        console.log(`[Lesson] Successfully fetched lesson:`, { id, title: lessonData?.title, status: 'success' });
        setLesson(lessonData);
      } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        console.error(`[Lesson] Error fetching lesson ${id}:`, { status, message });

        if (status === 401) {
          console.log(`[Lesson] Authentication required for lesson ${id}`);
          setRequiresAuth(true);
        } else {
          console.log(`[Lesson] Lesson not found`);
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3B5BFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dars topilmadi</h2>
        <p className="text-gray-500">Kechirasiz, bu dars mavjud emas</p>
      </div>
    );
  }

  if (requiresAuth) {
    return <AuthRequiredCard />;
  }

  if (!lesson) {
    return null;
  }

  return (
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
            {sortByOrder(lesson.videos).map((video, index) => (
              <UniversalVideoPlayer
                key={video.id}
                sourceUrl={video.link}
                sourceType={video.linkType}
                isFirst={index === 0}
              />
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
  );
}
