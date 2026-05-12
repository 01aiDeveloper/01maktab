export function getYoutubeEmbedUrl(url: string): string {
  // Handle youtu.be/ID
  const youtubeShortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtubeShortMatch) {
    return `https://www.youtube.com/embed/${youtubeShortMatch[1]}`;
  }

  // Handle youtube.com/watch?v=ID
  const youtubeWatchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (youtubeWatchMatch) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`;
  }

  // Already embed URL
  if (url.includes('/embed/')) {
    return url;
  }

  return url;
}

export function detectVideoType(url: string): 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'YOU_TUBE';
  }
  if (url.includes('.m3u8')) {
    return 'BUNNY_STREAM';
  }
  return 'UNKNOWN';
}

type Orderable = {
  order?: number;
  orderId?: number;
  title?: string;
  id?: number;
};

function extractOrder(item: Orderable): number {
  if (typeof item.order === 'number') return item.order;
  if (typeof item.orderId === 'number') return item.orderId;
  if (item.title) {
    // "Lesson 1: ..." / "Dars 1. ..." / "Module 2: ..." patterns
    const m = item.title.match(/^(?:Lesson|Dars|Module|Modul|Glava|Bob)\s*(\d+)/i);
    if (m) return Number(m[1]);
    // Fallback: any leading number
    const n = item.title.match(/^(\d+)/);
    if (n) return Number(n[1]);
  }
  return item.id ?? 0;
}

export function sortByOrder<T>(items: T[]): T[] {
  return [...items].sort((a, b) => extractOrder(a as Orderable) - extractOrder(b as Orderable));
}

type ResumeModule = {
  id: number;
  lessons?: { id: number; isCompleted?: boolean }[] | null;
};

type ResumeProgress = {
  completedLessonsCount?: number;
  totalLessonsCount?: number;
} | null | undefined;

export function pickResumeLesson(
  modules: ResumeModule[] | null | undefined,
  progress: ResumeProgress,
): { moduleId: number; id: number } | null {
  const mods = sortByOrder(modules ?? []);
  const flat = mods.flatMap((m) =>
    sortByOrder(m.lessons ?? []).map((l) => ({ id: l.id, isCompleted: !!l.isCompleted, moduleId: m.id })),
  );
  if (flat.length === 0) return null;

  const byFlag = flat.findIndex((l) => !l.isCompleted);
  const anyCompletedFlag = flat.some((l) => l.isCompleted);
  const completedCount = progress?.completedLessonsCount ?? 0;

  // Backend may not populate per-lesson `isCompleted`. If no lesson flagged
  // completed but progress count > 0, trust the count.
  let idx: number;
  if (!anyCompletedFlag && completedCount > 0) {
    idx = Math.min(completedCount, flat.length - 1);
  } else if (byFlag >= 0) {
    idx = byFlag;
  } else {
    idx = flat.length - 1;
  }

  const target = flat[idx];
  return { moduleId: target.moduleId, id: target.id };
}
