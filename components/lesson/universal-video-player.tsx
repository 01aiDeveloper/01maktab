'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

interface UniversalVideoPlayerProps {
  sourceUrl: string;
  sourceType: 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN';
  poster?: string;
  isFirst?: boolean;
  onEnded?: () => void;
  onComplete?: () => void; // called once when >= 80% watched
}

const PLYR_CONTROLS = ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'] as const;

// Extract YouTube video ID from any YouTube URL
function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:.*[?&]v=|v\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : url;
}

function isYouTubeUrl(url: string): boolean {
  return /youtu(?:\.be|be\.com)/i.test(url);
}

function getHlsUrl(url: string): string {
  return url.startsWith('http') && url.includes('.m3u8')
    ? url
    : `https://vz-15554dc1-9a5.b-cdn.net/${url}/playlist.m3u8`;
}

export function UniversalVideoPlayer({
  sourceUrl,
  sourceType,
  poster,
  onEnded,
  onComplete,
}: UniversalVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const completedRef = useRef(false); // fire onComplete only once
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isYouTube = useMemo(() => isYouTubeUrl(sourceUrl) || sourceType === 'YOU_TUBE', [sourceUrl, sourceType]);

  // Reset completed flag when source changes
  useEffect(() => { completedRef.current = false; }, [sourceUrl]);

  useEffect(() => {
    setError(null);
    setLoading(true);

    // Destroy previous instances
    if (plyrRef.current) {
      try { plyrRef.current.destroy(); } catch { /* noop */ }
      plyrRef.current = null;
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isYouTube) {
      // Plyr with YouTube provider
      const youtubeId = getYouTubeId(sourceUrl);
      const container = containerRef.current;
      if (!container) return;

      // Create a div element for Plyr YouTube embed
      const el = document.createElement('div');
      el.setAttribute('data-plyr-provider', 'youtube');
      el.setAttribute('data-plyr-embed-id', youtubeId);
      container.innerHTML = '';
      container.appendChild(el);

      const player = new Plyr(el, {
        controls: [...PLYR_CONTROLS],
        settings: ['speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 },
      });

      plyrRef.current = player;
      player.on('ready', () => setLoading(false));
      player.on('error', () => { setError('YouTube video yuklanmadi'); setLoading(false); });

      if (onEnded) player.on('ended', onEnded);

      if (onComplete) {
        player.on('ended', () => {
          if (!completedRef.current) {
            console.log('[VideoComplete] YouTube ended → calling complete');
            completedRef.current = true;
            onComplete();
          }
        });
      }

      return () => {
        try { player.destroy(); } catch { /* noop */ }
        plyrRef.current = null;
      };
    }

    // HLS / BUNNY_STREAM — use <video> element with Plyr
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const player = new Plyr(videoEl, {
      controls: [...PLYR_CONTROLS],
      settings: ['speed', 'quality'],
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      clickToPlay: true,
      keyboard: { focused: true, global: true },
    });
    plyrRef.current = player;
    if (onEnded) player.on('ended', onEnded);

    const triggerComplete = (source: string) => {
      if (!completedRef.current) {
        console.log(`[VideoComplete] stream "${source}" ended → calling complete`);
        completedRef.current = true;
        onComplete?.();
      }
    };

    const onNativeEnded = () => triggerComplete('native');

    // Plyr-level ended event
    player.on('ended', () => triggerComplete('plyr'));
    // Native video element fallback (in case Plyr doesn't fire)
    videoEl.addEventListener('ended', onNativeEnded);

    const src = getHlsUrl(sourceUrl);

    if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
      videoEl.addEventListener('loadedmetadata', () => setLoading(false), { once: true });
      videoEl.addEventListener('error', () => { setError('Video yuklanmadi'); setLoading(false); }, { once: true });
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hlsRef.current = hls;
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
      hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false));
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError(`Video yuklanmadi`);
          setLoading(false);
          try { hls.destroy(); hlsRef.current = null; } catch { /* noop */ }
        }
      });
    } else {
      setError("Brauzer HLS-ni qo'llab-quvvatlamaydi");
      setLoading(false);
    }

    return () => {
      videoEl.removeEventListener('ended', onNativeEnded);
      try { player.destroy(); } catch { /* noop */ }
      plyrRef.current = null;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [sourceUrl, isYouTube, onEnded]);

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#000',
        position: 'relative',
      }}
    >
      {/* Loading overlay */}
      {loading && !error && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#000',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.2)',
            borderTopColor: '#fff',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', background: 'rgba(0,0,0,0.7)', padding: '16px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}

      {/* YouTube container (Plyr mounts here dynamically) */}
      {isYouTube && <div ref={containerRef} style={{ width: '100%', height: '100%' }} />}

      {/* HLS video element */}
      {!isYouTube && (
        <video
          ref={videoRef}
          poster={poster}
          crossOrigin="anonymous"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}
