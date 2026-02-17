'use client';

import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { getYoutubeEmbedUrl } from '@/lib/lesson-utils';

interface UniversalVideoPlayerProps {
  sourceUrl: string;
  sourceType: 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN';
  poster?: string;
  isFirst?: boolean;
}

export function UniversalVideoPlayer({ sourceUrl, sourceType, poster, isFirst = false }: UniversalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (sourceType === 'YOU_TUBE') {
        // YouTube with Plyr iframe support
        if (iframeRef.current) {
          const embedUrl = getYoutubeEmbedUrl(sourceUrl);
          iframeRef.current.src = embedUrl;

          // Initialize Plyr on iframe
          setTimeout(() => {
            if (iframeRef.current) {
              new Plyr(iframeRef.current, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
              });
            }
          }, 100);
        }
      } else if (sourceType === 'BUNNY_STREAM') {
        // HLS Stream with Plyr
        if (videoRef.current) {
          const video = videoRef.current;

          // Check if browser supports HLS natively (Safari)
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = sourceUrl;
          } else if (window.Hls && window.Hls.isSupported()) {
            // Use HLS.js for other browsers
            const hls = new (window.Hls as any)();
            hls.loadSource(sourceUrl);
            hls.attachMedia(video);
          }

          // Initialize Plyr on video
          new Plyr(video, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
            poster,
          });
        }
      }
    } catch (error) {
      console.error('[Player] Error initializing player:', error);
    }
  }, [sourceUrl, sourceType, poster]);

  if (sourceType === 'YOU_TUBE') {
    return (
      <div ref={containerRef} className="relative w-full bg-black rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
        <iframe
          ref={iframeRef}
          className="plyr__iframe w-full h-full"
          title="YouTube video player"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  if (sourceType === 'BUNNY_STREAM') {
    return (
      <div ref={containerRef} className="relative w-full bg-black rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          className="plyr-video w-full h-full"
          poster={poster}
          controls
          crossOrigin="anonymous"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center">
      <p className="text-gray-500">Unsupported video format</p>
    </div>
  );
}
