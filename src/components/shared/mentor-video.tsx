"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export type MentorVideoType = "youtube" | "video";

export interface MentorVideoProps {
  type: MentorVideoType;
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export interface MentorVideoHandle {
  play: () => Promise<void>;
  pause: () => void;
  isPlaying: () => boolean;
}

/**
 * MentorVideo - Lightweight video component for mentor cards
 * Supports YouTube embeds and local MP4/WebM videos
 * 
 * @example
 * ```tsx
 * const videoRef = useRef<MentorVideoHandle>(null);
 * 
 * <MentorVideo
 *   ref={videoRef}
 *   type="youtube"
 *   src="https://www.youtube.com/watch?v=..."
 *   className="h-full w-full object-cover"
 *   loop
 *   muted
 *   playsInline
 * />
 * 
 * // Control video
 * videoRef.current?.play();
 * videoRef.current?.pause();
 * ```
 */
export const MentorVideo = forwardRef<MentorVideoHandle, MentorVideoProps>(
  ({ type, src, className = "", loop = true, muted = true, playsInline = true }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const isPlayingRef = useRef(false);

    // Extract YouTube video ID (supports regular videos and Shorts)
    const extractYouTubeId = (url: string): string | null => {
      const patterns = [
        // YouTube Shorts format: youtube.com/shorts/VIDEO_ID or www.youtube.com/shorts/VIDEO_ID
        /(?:youtube\.com\/shorts\/)([^&\n?#\/]+)/,
        // Regular YouTube formats
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          // Remove query parameters if any (for Shorts URLs with ?si=...)
          return match[1].split('?')[0];
        }
      }
      return null;
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (type === "video" && videoRef.current) {
          try {
            await videoRef.current.play();
            isPlayingRef.current = true;
          } catch (error) {
            console.error("Error playing video:", error);
          }
        } else if (type === "youtube" && iframeRef.current) {
          // For YouTube, we need to use postMessage API
          const videoId = extractYouTubeId(src);
          if (videoId && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
                args: "",
              }),
              "https://www.youtube.com"
            );
            isPlayingRef.current = true;
          }
        }
      },
      pause: () => {
        if (type === "video" && videoRef.current) {
          videoRef.current.pause();
          isPlayingRef.current = false;
        } else if (type === "youtube" && iframeRef.current) {
          const videoId = extractYouTubeId(src);
          if (videoId && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "pauseVideo",
                args: "",
              }),
              "https://www.youtube.com"
            );
            isPlayingRef.current = false;
          }
        }
      },
      isPlaying: () => {
        if (type === "video" && videoRef.current) {
          return !videoRef.current.paused;
        }
        return isPlayingRef.current;
      },
    }));

    // Handle video events
    useEffect(() => {
      const video = videoRef.current;
      if (!video || type !== "video") return;

      const handlePlay = () => {
        isPlayingRef.current = true;
      };

      const handlePause = () => {
        isPlayingRef.current = false;
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }, [type]);

    // Render YouTube iframe
    if (type === "youtube") {
      const videoId = extractYouTubeId(src);
      if (!videoId) {
        console.error("Invalid YouTube URL:", src);
        return null;
      }

      // Check if it's a Shorts video
      const isShorts = src.includes("/shorts/");
      
      // For Shorts, use embed format with proper parameters
      // controls=1 enables video controls (play, pause, volume, etc.)
      const embedUrl = isShorts
        ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1`
        : `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${loop ? videoId : ""}&controls=1&modestbranding=1&rel=0`;

      return (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className={className}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: "none" }}
        />
      );
    }

    // Render local video
    return (
      <video
        ref={videoRef}
        src={src}
        className={className}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
      />
    );
  }
);

MentorVideo.displayName = "MentorVideo";

