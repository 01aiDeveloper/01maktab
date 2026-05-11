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

export function sortByOrder<T>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aAny = a as { order?: number; orderId?: number };
    const bAny = b as { order?: number; orderId?: number };
    const aOrder = aAny.order ?? aAny.orderId ?? 0;
    const bOrder = bAny.order ?? bAny.orderId ?? 0;
    return aOrder - bOrder;
  });
}
