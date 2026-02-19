'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import { CircularProgress, Box } from '@mui/material';

interface UniversalVideoPlayerProps {
  sourceUrl: string;
  sourceType: 'YOU_TUBE' | 'BUNNY_STREAM' | 'UNKNOWN';
  poster?: string;
  isFirst?: boolean;
  onEnded?: () => void;
}

export function UniversalVideoPlayer({
  sourceUrl,
  sourceType,
  poster,
  isFirst = false,
  onEnded,
}: UniversalVideoPlayerProps) {
  const plyrRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isYouTube = useMemo(() => {
    return /youtu(?:\.be|be\.com)/i.test(sourceUrl);
  }, [sourceUrl]);

  // YouTube ID ajratish
  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|v\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : url;
  };

  // Plyr options
  const options = useMemo(
    () => ({
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      settings: ['speed', 'quality'],
      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      clickToPlay: true,
      keyboard: { focused: true, global: true },
      ...(isYouTube
        ? {
            youtube: {
              noCookie: true,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1,
            },
          }
        : {}),
    }),
    [isYouTube]
  );

  // YouTube ID ajratib YouTube iframe HTML orta
  const renderYouTubePlayer = () => {
    const youtubeId = getYouTubeId(sourceUrl);
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?controls=1&modestbranding=1&rel=0&iv_load_policy=3`;
    return (
      <Box
        component="iframe"
        sx={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  // HLS manbai uchun video element
  const getHlsUrl = () => {
    return sourceUrl.startsWith('http') && sourceUrl.includes('.m3u8')
      ? sourceUrl
      : `https://vz-15554dc1-9a5.b-cdn.net/${sourceUrl}/playlist.m3u8`;
  };

  // Plyr initialize qilish va HLS attach qilish
  useEffect(() => {
    setError(null);
    setLoading(true);

    // YouTube bo'lsa
    if (isYouTube) {
      setLoading(false);
      return;
    }

    // Video element uchun Plyr instance yaratish
    if (plyrRef.current && !plyrRef.current._plyr) {
      const playerInstance = new Plyr(plyrRef.current, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['speed', 'quality'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
        clickToPlay: true,
        keyboard: { focused: true, global: true },
      });
    }

    const media: HTMLVideoElement | null = plyrRef.current ?? null;

    if (!media) {
      let tries = 0;
      const maxTries = 10;
      const t = setInterval(() => {
        tries += 1;
        const p = plyrRef.current;
        const m: HTMLVideoElement | null = p?.media ?? null;
        if (m) {
          clearInterval(t);
          attachHls(m);
        } else if (tries >= maxTries) {
          clearInterval(t);
          setError('Player media topilmadi');
          setLoading(false);
        }
      }, 200);

      return () => clearInterval(t);
    }

    attachHls(media);

    function attachHls(videoEl: HTMLVideoElement) {
      const src = getHlsUrl();

      if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        videoEl.src = src;
        videoEl.addEventListener('loadedmetadata', () => setLoading(false), { once: true });
        videoEl.addEventListener(
          'error',
          () => {
            setError('Video yuklashda xato (native)');
            setLoading(false);
          },
          { once: true }
        );
        return;
      }

      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        const hls = new Hls({ enableWorker: true });
        hlsRef.current = hls;

        hls.attachMedia(videoEl);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(src);
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLoading(false);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.warn('HLS error', data);
          if (data.fatal) {
            setError(`HLS fatal error: ${data.type} ${data.details}`);
            setLoading(false);
            try {
              hls.destroy();
              hlsRef.current = null;
            } catch (e) {
              // noop
            }
          }
        });

        return () => {
          try {
            hls.destroy();
          } catch (e) {
            // noop
          }
          hlsRef.current = null;
        };
      }

      setError("Brauzer HLSni qo'llab-quvvatlamaydi");
      setLoading(false);
    }
  }, [sourceUrl, isYouTube]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  // Video tugaganda onEnded callback
  useEffect(() => {
    if (!onEnded) return;

    let cleanup: (() => void) | null = null;

    const setupEndedListener = () => {
      const player = plyrRef.current?.plyr;
      if (!player || typeof player.on !== 'function') {
        return;
      }

      const handleEnded = () => {
        onEnded();
      };

      player.on('ended', handleEnded);

      cleanup = () => {
        if (player && typeof player.off === 'function') {
          player.off('ended', handleEnded);
        }
      };
    };

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      const player = plyrRef.current?.plyr;

      if (player && typeof player.on === 'function') {
        clearInterval(interval);
        setupEndedListener();
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (cleanup) {
        cleanup();
      }
    };
  }, [onEnded, sourceUrl]);

  if (sourceType === 'YOU_TUBE') {
    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#000',
          position: 'relative',
        }}
      >
        {error && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 20,
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              background: 'rgba(0,0,0,0.6)',
              p: 2,
            }}
          >
            <div>{error}</div>
          </Box>
        )}
        {renderYouTubePlayer()}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#000',
        position: 'relative',
        '& .plyr--full-ui': {
          '--plyr-color-main': '#CB5280',
        },
        '& .plyr': { width: '100%', height: '100%' },
      }}
    >
      {error && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 20,
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            background: 'rgba(0,0,0,0.6)',
            p: 2,
          }}
        >
          <div>{error}</div>
        </Box>
      )}

      {loading && !error && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}

      <video
        ref={plyrRef}
        className="plyr-video"
        poster={poster}
        crossOrigin="anonymous"
        controls
      />
    </Box>
  );
}
