"use client";

/**
 * Video Player Usage Examples
 * 
 * This file demonstrates how to use SimpleVideoPlayer and StreamVideoPlayer
 * in your Next.js application.
 */

import SimpleVideoPlayer from "./simple-video-player";
import StreamVideoPlayer from "./stream-video-player";

// ============================================
// Example 1: YouTube Video
// ============================================
export function YouTubeExample() {
  const handleProgress = (percent: number) => {
    console.log(`Video progress: ${percent.toFixed(1)}%`);
    // Track analytics, save progress, etc.
  };

  const handleEnded = () => {
    console.log("YouTube video finished!");
    // Mark as completed, show next video, etc.
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SimpleVideoPlayer
        type="youtube"
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        onProgress={handleProgress}
        onEnded={handleEnded}
        className="aspect-video"
        autoplay={false}
        muted={false}
      />
    </div>
  );
}

// ============================================
// Example 2: Vimeo Video
// ============================================
export function VimeoExample() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <SimpleVideoPlayer
        type="vimeo"
        url="https://vimeo.com/123456789"
        onProgress={(percent) => {
          // Save progress to database
          localStorage.setItem("vimeo-progress", percent.toString());
        }}
        onEnded={() => {
          // Mark lesson as completed
          console.log("Lesson completed!");
        }}
        className="aspect-video"
      />
    </div>
  );
}

// ============================================
// Example 3: Local MP4/WebM Video
// ============================================
export function LocalVideoExample() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <SimpleVideoPlayer
        type="video"
        url="/videos/lesson-1.mp4"
        onProgress={(percent) => {
          // Track viewing progress
          if (percent >= 50) {
            console.log("Halfway through!");
          }
        }}
        onEnded={() => {
          console.log("Video completed!");
        }}
        className="aspect-video"
        autoplay={false}
        loop={false}
      />
    </div>
  );
}

// ============================================
// Example 4: HLS Streaming Video
// ============================================
export function HLSStreamExample() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <StreamVideoPlayer
        src="https://example.com/videos/stream.m3u8"
        onProgress={(percent) => {
          // Save progress to backend
          fetch("/api/save-progress", {
            method: "POST",
            body: JSON.stringify({ progress: percent }),
          });
        }}
        onEnded={() => {
          // Unlock next lesson
          console.log("Stream completed!");
        }}
        className="aspect-video"
        autoplay={false}
        muted={false}
      />
    </div>
  );
}

// ============================================
// Example 5: Video with Custom Styling
// ============================================
export function CustomStyledVideo() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
      <SimpleVideoPlayer
        type="youtube"
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="w-full aspect-video"
        onProgress={(percent) => {
          // Custom progress tracking
          if (percent > 80) {
            console.log("Almost done!");
          }
        }}
      />
    </div>
  );
}

// ============================================
// Example 6: Autoplay Video (Muted)
// ============================================
export function AutoplayVideo() {
  return (
    <div className="w-full">
      <SimpleVideoPlayer
        type="video"
        url="/videos/intro.mp4"
        autoplay={true}
        muted={true}
        loop={true}
        className="aspect-video"
      />
    </div>
  );
}

