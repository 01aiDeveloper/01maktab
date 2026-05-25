"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

type VideoType = "youtube" | "video";

interface MentorCardProps {
  name: string;
  role: string;
  imageUrl: string;
  videoType: VideoType;
  videoSrc: string;
}

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/shorts\/)([^&\n?#\/]+)/,
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1].split("?")[0];
  }
  return null;
};

export function MentorCard({
  name,
  role,
  imageUrl,
  videoType,
  videoSrc,
}: MentorCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimer = useRef<NodeJS.Timeout>();

  const videoId = videoType === "youtube" ? extractYouTubeId(videoSrc) : null;
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : imageUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoType !== "video") return;
    const onTime = () =>
      setProgress((video.currentTime / video.duration) * 100 || 0);
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [videoType]);

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 2500);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoType === "youtube" && iframeRef.current) {
      const cmd = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow?.postMessage(
        `{"event":"command","func":"${cmd}","args":""}`,
        "*",
      );
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
    showControlsTemporarily();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoType === "youtube" && iframeRef.current) {
      const cmd = isMuted ? "unMute" : "mute";
      iframeRef.current.contentWindow?.postMessage(
        `{"event":"command","func":"${cmd}","args":""}`,
        "*",
      );
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
    showControlsTemporarily();
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={togglePlay}
      onMouseMove={() => isPlaying && showControlsTemporarily()}
      onMouseLeave={() => setShowControls(false)}
      className="relative overflow-hidden rounded-[25px] bg-black cursor-pointer select-none"
      style={{ width: "310px", height: "410px" }}
    >
      {/* Thumbnail */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image quality={95} src={thumbnail} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {videoType === "youtube" && videoId ? (
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1&mute=0&fs=0`}
              style={{
                border: "none",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "135%", // Covers the width for 9:16 shorts in a ~3:4 container
                height: "100%",
                pointerEvents: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Play tugmasi */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-xl backdrop-blur-sm"
          >
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </motion.button>
        </div>
      )}

      {/* Controls */}
      <AnimatePresence>
        {isPlaying && showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col justify-between"
          >
            <div className="h-16 bg-gradient-to-b from-black/50 to-transparent" />
            <div className="bg-gradient-to-t from-black/70 to-transparent p-4">
              {videoType === "video" && (
                <div className="mb-3 h-1 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Pause className="h-5 w-5 fill-white" />
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ism va rol */}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-xl font-bold text-white leading-tight">{name}</h3>
          <p className="text-sm text-white/65 mt-0.5">{role}</p>
        </div>
      )}
    </motion.div>
  );
}
