"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export type VideoType = "youtube" | "vimeo" | "video";

export interface SimpleVideoPlayerProps {
  type: VideoType;
  url: string;
  onEnded?: () => void;
  onProgress?: (percent: number) => void;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

/**
 * SimpleVideoPlayer - A lightweight, production-ready video player component
 * Supports YouTube, Vimeo, and local MP4/WebM videos using Plyr
 *
 * @example
 * ```tsx
 * <SimpleVideoPlayer
 *   type="youtube"
 *   url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   onProgress={(percent) => console.log(`Watched: ${percent}%`)}
 *   onEnded={() => console.log("Video ended")}
 * />
 * ```
 */
export default function SimpleVideoPlayer({
  type,
  url,
  onEnded,
  onProgress,
  className = "",
  autoplay = false,
  muted = false,
  loop = false,
}: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let player: Plyr | null = null;

    try {
      // Initialize Plyr based on video type
      if (type === "youtube" || type === "vimeo") {
        // For YouTube/Vimeo, Plyr handles iframe embedding
        if (!containerRef.current) return;

        player = new Plyr(containerRef.current, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
          autoplay,
          muted,
          loop,
          ratio: null, // Let it be responsive
        });

        // Set the video source
        if (type === "youtube") {
          const videoId = extractYouTubeId(url);
          if (videoId) {
            player.source = {
              type: "video",
              sources: [
                {
                  src: videoId,
                  provider: "youtube",
                },
              ],
            };
          }
        } else if (type === "vimeo") {
          const videoId = extractVimeoId(url);
          if (videoId) {
            player.source = {
              type: "video",
              sources: [
                {
                  src: videoId,
                  provider: "vimeo",
                },
              ],
            };
          }
        }
      } else {
        // For local videos (MP4/WebM)
        if (!videoRef.current) return;

        player = new Plyr(videoRef.current, {
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
        });

        // Set video source
        if (videoRef.current) {
          videoRef.current.src = url;
        }
      }

      playerRef.current = player;

      // Handle ready event
      player.on("ready", () => {
        setIsReady(true);
      });

      // Track progress
      player.on("timeupdate", () => {
        if (onProgress && player) {
          const current = player.currentTime;
          const duration = player.duration;
          if (duration > 0) {
            const percent = (current / duration) * 100;
            onProgress(percent);
          }
        }
      });

      // Handle video end
      player.on("ended", () => {
        if (onEnded) {
          onEnded();
        }
      });

      // Handle errors
      player.on("error", (error) => {
        console.error("Video player error:", error);
      });
    } catch (error) {
      console.error("Failed to initialize Plyr:", error);
    }

    // Cleanup function
    return () => {
      if (player) {
        try {
          player.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
      playerRef.current = null;
    };
  }, [type, url, autoplay, muted, loop, onEnded, onProgress]);

  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Extract Vimeo video ID from various URL formats
  const extractVimeoId = (url: string): string | null => {
    const patterns = [
      /(?:vimeo\.com\/)(\d+)/,
      /(?:vimeo\.com\/video\/)(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Render based on video type
  if (type === "youtube" || type === "vimeo") {
    return (
      <div
        ref={containerRef}
        className={`plyr__video-embed ${className}`}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  // Local video (MP4/WebM)
  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="plyr__video"
        playsInline
        preload="metadata"
      >
        <source src={url} type={`video/${url.split(".").pop()}`} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

