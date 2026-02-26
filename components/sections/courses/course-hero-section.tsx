'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Users, FileText, Heart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';

interface CourseProgress {
  moduleTitile: string | null;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

interface CourseHeroSectionProps {
  title: string;
  description: string;
  image: string;
  videosCount: number;
  tasksCount: number;
  projectsCount: number;
  duration: string;
  level: string;
  price: string;
  stats: {
    graduates: number;
  };
  progress?: CourseProgress | null;
  onStart?: () => void;
  startLoading?: boolean;
}

export function CourseHeroSection({
  title,
  description,
  image,
  videosCount,
  tasksCount,
  projectsCount,
  duration,
  level,
  price,
  stats,
  progress,
  onStart,
  startLoading = false,
}: CourseHeroSectionProps) {
  const hasProgress = progress && progress.totalLessonsCount > 0;
  const progressPercent = hasProgress
    ? Math.round((progress.completedLessonsCount / progress.totalLessonsCount) * 100)
    : 0;
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[40px] overflow-hidden relative min-h-[500px] lg:min-h-[600px]"
        >
          {/* Background Image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Content Overlay */}
          <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center min-h-[500px] lg:min-h-[600px]">
            {/* Back button */}
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Orqaga</span>
            </Link>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                {videosCount} soat video darslar
              </Badge>
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {tasksCount} ta mavzu
              </Badge>
              <Badge className="bg-black text-white border-0 rounded-full px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                {projectsCount} ta loyiha
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-6 max-w-2xl">
              <h1 className="font-suisse text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance text-gray-900">
                {title}
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">{description}</p>
              {hasProgress ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                      Модуль: {progress.moduleTitile ?? '—'}
                    </span>
                    <span className="text-xs bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                      Dars: {progress.completedLessonsCount}/{progress.totalLessonsCount}
                    </span>
                  </div>
                  <div className="w-full max-w-sm bg-white/30 rounded-full h-2">
                    <div
                      className="bg-[#5d7bf5] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <MainButton
                    variant="gradient"
                    size="lg"
                    icon={startLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5]"
                    onClick={onStart}
                    disabled={startLoading}
                  >
                    {startLoading ? 'Yuklanmoqda...' : 'Продолжить обучение'}
                  </MainButton>
                </div>
              ) : (
                <MainButton
                  variant="gradient"
                  size="lg"
                  icon={startLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5]"
                  onClick={onStart}
                  disabled={startLoading}
                >
                  {startLoading ? 'Yuklanmoqda...' : 'Boshlash'}
                </MainButton>
              )}
            </div>

            {/* Bottom stats badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {level}
              </Badge>
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Kreativlik talab etmaz
              </Badge>
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-gray-700 border-0 rounded-full px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2 text-red-500 fill-red-500" />
                {stats.graduates.toLocaleString()} talaba boshlagan
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
