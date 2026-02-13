'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { getYoutubeEmbedUrl } from '@/lib/lesson-utils';

interface UniversalVideoPlayerProps {
  sourceUrl: string;
  sourceType: 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN';
  poster?: string;
}

export function UniversalVideoPlayer({ sourceUrl, sourceType, poster }: UniversalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hlsLoaded, setHlsLoaded] = useState(false);

  useEffect(() => {
    if (sourceType !== 'BUNNY_STREAM' || !videoRef.current) return;

    const video = videoRef.current;
    let hlsInstance: any = null;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = sourceUrl;
      setHlsLoaded(true);
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported() && videoRef.current) {
          hlsInstance = new Hls();
          hlsInstance.loadSource(sourceUrl);
          hlsInstance.attachMedia(videoRef.current);
          hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            setHlsLoaded(true);
          });
        }
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [sourceUrl, sourceType]);

  if (sourceType === 'YOU_TUBE') {
    const embedUrl = getYoutubeEmbedUrl(sourceUrl);
    return (
      <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-lg">
        {!isPlaying && (
          <div
            className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-10"
            onClick={() => setIsPlaying(true)}
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
            </div>
          </div>
        )}
        {isPlaying ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img src={poster || `https://img.youtube.com/vi/${embedUrl.split('/').pop()}/maxresdefault.jpg`} alt="Video thumbnail" className="w-full h-full object-cover" />
        )}
      </div>
    );
  }

  if (sourceType === 'BUNNY_STREAM') {
    return (
      <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-lg">
        <video ref={videoRef} controls className="w-full h-full" poster={poster}>
          {!hlsLoaded && <source src={sourceUrl} type="application/x-mpegURL" />}
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center">
      <p className="text-gray-500">Unsupported video format</p>
    </div>
  );
}
