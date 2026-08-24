"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";

export interface StreamVideoPlayerProps {
  src: string;
  onEnded?: () => void;
  onProgress?: (percent: number) => void;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

/**
 * StreamVideoPlayer - Production-ready HLS streaming video player
 * Uses hls.js for HLS playback with Safari native fallback
 * Perfect for education platforms and streaming services
 *
 * @example
 * ```tsx
 * <StreamVideoPlayer
 *   src="https://example.com/video.m3u8"
 *   onProgress={(percent) => console.log(`Watched: ${percent}%`)}
 *   onEnded={() => console.log("Stream ended")}
 * />
 * ```
 */
export default function StreamVideoPlayer({
  src,
  onEnded,
  onProgress,
  className = "",
  autoplay = false,
  muted = false,
  loop = false,
}: StreamVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    let hls: Hls | null = null;
    let player: Plyr | null = null;

    const initializePlayer = () => {
      try {
        // Initialize Plyr
        player = new Plyr(video, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
          autoplay,
          muted,
          loop,
          keyboard: {
            focused: true,
            global: false,
          },
          tooltips: {
            controls: true,
            seek: true,
          },
        });

        playerRef.current = player;

        // Handle ready event
        player.on("ready", () => {
          setIsReady(true);
          setError(null);
        });

        // Track progress
        player.on("timeupdate", () => {
          if (onProgress && player) {
            const current = player.currentTime;
            const duration = player.duration;
            if (duration > 0 && !isNaN(current) && !isNaN(duration)) {
              const percent = (current / duration) * 100;
              onProgress(Math.min(100, Math.max(0, percent)));
            }
          }
        });

        // Handle video end
        player.on("ended", () => {
          if (onEnded) {
            onEnded();
          }
        });

        // Handle player errors
        player.on("error", (event) => {
          console.error("Plyr error:", event);
          setError("Video player error occurred");
        });
      } catch (err) {
        console.error("Failed to initialize Plyr:", err);
        setError("Failed to initialize video player");
      }
    };

    const initializeHLS = () => {
      // Check if HLS is supported natively (Safari)
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        video.src = src;
        initializePlayer();
        return;
      }

      // Check if hls.js is supported
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          maxBufferSize: 60 * 1000 * 1000, // 60MB
          maxBufferHole: 0.5,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 3,
          maxFragLoadingTimeOut: 20,
          maxMaxFragLoadingTimeOut: 600,
          fragLoadingTimeOut: 20,
          manifestLoadingTimeOut: 10,
          manifestLoadingMaxRetry: 1,
          levelLoadingTimeOut: 10,
          levelLoadingMaxRetry: 4,
          fragLoadingMaxRetry: 6,
          startFragPrefetch: false,
          testBandwidth: true,
          progressive: false,
          abrEwmaDefaultEstimate: 500000,
          abrBandWidthFactor: 0.95,
          abrBandWidthUpFactor: 0.7,
          abrMaxWithRealBitrate: false,
          maxStarvationDelay: 4,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          emeEnabled: false,
          widevineLicenseUrl: undefined,
          drmSystemOptions: {},
          requestMediaKeySystemAccessFunc: undefined,
        });

        hlsRef.current = hls;

        // Load the source
        hls.loadSource(src);
        hls.attachMedia(video);

        // Handle HLS events
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          initializePlayer();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Fatal network error, trying to recover...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Fatal media error, trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                console.error("Fatal error, cannot recover");
                setError("Failed to load video stream");
                hls?.destroy();
                break;
            }
          }
        });

        hls.on(Hls.Events.FRAG_LOADED, () => {
          setError(null);
        });
      } else {
        // Fallback: try to use native video element
        console.warn("HLS.js not supported, trying native playback");
        video.src = src;
        initializePlayer();
      }
    };

    // Initialize HLS
    initializeHLS();

    // Cleanup function
    return () => {
      // Destroy HLS instance
      if (hls) {
        try {
          hls.destroy();
        } catch (err) {
          console.error("Error destroying HLS:", err);
        }
        hlsRef.current = null;
      }

      // Destroy Plyr instance
      if (player) {
        try {
          player.destroy();
        } catch (err) {
          console.error("Error destroying Plyr:", err);
        }
        playerRef.current = null;
      }

      // Clean up video element
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }

      setIsReady(false);
      setError(null);
    };
  }, [src, autoplay, muted, loop, onEnded, onProgress]);

  return (
    <div className={className}>
      <div ref={containerRef} className="relative w-full">
        <video
          ref={videoRef}
          className="plyr__video"
          playsInline
          preload="metadata"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <div className="text-center">
              <p className="text-lg font-semibold">Error loading video</p>
              <p className="text-sm text-white/70 mt-1">{error}</p>
            </div>
          </div>
        )}
        {!isReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-white">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
}

