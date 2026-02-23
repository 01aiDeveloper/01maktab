'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

type SourceType = 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN';

interface StoryVideoCardProps {
  name: string;
  role: string;
  thumbnail?: string;
  sourceUrl: string;
  sourceType: SourceType;
}

function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:.*[?&]v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
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

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

const PLYR_CONTROLS = ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'] as const;

export function StoryVideoCard({ name, role, thumbnail, sourceUrl, sourceType }: StoryVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const isYouTube = useMemo(() => isYouTubeUrl(sourceUrl) || sourceType === 'YOU_TUBE', [sourceUrl, sourceType]);

  const thumbSrc = thumbnail ?? (isYouTube ? getYouTubeThumbnail(sourceUrl) : '');

  // Init Plyr when user presses play
  useEffect(() => {
    if (!isPlaying) return;

    // Destroy previous
    if (plyrRef.current) {
      try { plyrRef.current.destroy(); } catch { /* noop */ }
      plyrRef.current = null;
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isYouTube) {
      const container = containerRef.current;
      if (!container) return;
      const youtubeId = getYouTubeId(sourceUrl);

      const el = document.createElement('div');
      el.setAttribute('data-plyr-provider', 'youtube');
      el.setAttribute('data-plyr-embed-id', youtubeId);
      container.innerHTML = '';
      container.appendChild(el);

      const player = new Plyr(el, {
        controls: [...PLYR_CONTROLS],
        settings: ['speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1 },
        autoplay: true,
      });
      plyrRef.current = player;
      player.on('ended', () => setIsPlaying(false));

      return () => {
        try { player.destroy(); } catch { /* noop */ }
        plyrRef.current = null;
      };
    }

    // HLS / BUNNY
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const player = new Plyr(videoEl, {
      controls: [...PLYR_CONTROLS],
      settings: ['speed'],
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
      clickToPlay: true,
      autoplay: true,
    });
    plyrRef.current = player;
    player.on('ended', () => setIsPlaying(false));

    const src = getHlsUrl(sourceUrl);

    if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hlsRef.current = hls;
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
    }

    return () => {
      try { player.destroy(); } catch { /* noop */ }
      plyrRef.current = null;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isPlaying, isYouTube, sourceUrl]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-[25px] bg-black select-none"
      style={{ width: 315, height: 430 }}
    >
      {/* Thumbnail + play — when not playing */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* thumbnail image */}
            {thumbSrc && (
              <img
                src={thumbSrc}
                alt={name}
                className="h-full w-full object-cover"
              />
            )}

            {/* gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/30" />

            {/* center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-xl backdrop-blur-sm"
              >
                <Play className="h-6 w-6 fill-current ml-0.5" />
              </motion.div>
            </div>

            {/* name & role bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
              <p className="text-sm text-white/65 mt-0.5">{role}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plyr player — mounted when playing */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {isYouTube
          ? <div ref={containerRef} className="w-full h-full" />
          : <video ref={videoRef} className="w-full h-full" playsInline />
        }
      </div>
    </motion.div>
  );
}
