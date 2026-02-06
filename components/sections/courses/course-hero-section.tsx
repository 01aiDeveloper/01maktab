'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Users, FileText, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MainButton } from '@/components/ui/main-button';

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
}: CourseHeroSectionProps) {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-3xl p-6 lg:p-10 overflow-hidden relative"
        >
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga</span>
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

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="font-suisse text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance text-gray-900">
                {title}
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-xl">{description}</p>
              <MainButton
                variant="gradient"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="bg-[#5d7bf5] hover:from-[#4c6ae4] hover:to-[#5d7bf5]"
              >
                Batafsil
              </MainButton>
            </div>

            {/* Right Image */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <Image src={image} alt={title} fill className="object-contain" priority />
            </div>
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
        </motion.div>
      </div>
    </section>
  );
}
