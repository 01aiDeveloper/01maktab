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
