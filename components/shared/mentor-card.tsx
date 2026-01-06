"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Share2 } from "lucide-react";

type VideoType = "youtube" | "video";

interface MentorCardProps {
  name: string;
  role: string;
  imageUrl: string;
  videoType: VideoType;
  videoSrc: string;
}

// Extract YouTube video ID
const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/shorts\/)([^&\n?#\/]+)/,
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1].split("?")[0];
    }
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
  const [isMuted, setIsMuted] = useState(false); // Default ovoz chiqadi
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const videoId = videoType === "youtube" ? extractYouTubeId(videoSrc) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : imageUrl;

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoType === "youtube") return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [videoType]);

  const handleMouseMove = () => {
    if (!isPlaying) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (videoType === "youtube" && iframeRef.current) {
      const iframe = iframeRef.current;
      if (!isPlaying) {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
        setIsPlaying(true);
      } else {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
        setIsPlaying(false);
      }
    } else if (videoType === "video" && videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (videoType === "youtube" && iframeRef.current) {
      const iframe = iframeRef.current;
      if (isMuted) {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"unMute","args":""}',
          "*"
        );
      } else {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"mute","args":""}',
          "*"
        );
      }
      setIsMuted(!isMuted);
    } else if (videoType === "video" && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      className="group relative cursor-pointer overflow-hidden bg-black"
      style={{ width: "315px", height: "430px", borderRadius: "25px" }}
    >
      {/* Thumbnail - shown when not playing */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={thumbnailUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <div
        className={`absolute inset-0 ${
          isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {videoType === "youtube" && videoId ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1&mute=0`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              border: "none",
              width: "177.78%",
              height: "100%",
              maxWidth: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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

      {/* Play Button - center */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl"
          >
            <Play className="h-7 w-7 fill-current ml-1" />
          </motion.button>
        </div>
      )}

      {/* Top Header - Always visible when playing */}
      {/* <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">OS</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <button className="px-3 py-0.5 bg-white text-black text-xs font-medium rounded mt-0.5">
                    Subscribe
                  </button>
                </div>
              </div>
              <button className="text-white">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Bottom Controls - YouTube Shorts style */}
      <AnimatePresence>
        {isPlaying && (showControls || true) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20"
          >
            {/* Progress Bar */}
            {videoType === "video" && (
              <div className="mb-4">
                <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-red-600 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full transition-all duration-100"
                    style={{
                      left: `${progress}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Control Buttons */}
        
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name and Role - bottom left, when not playing */}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="text-2xl font-bold text-white mb-0.5 tracking-tight">
            {name}
          </h3>
          <p className="text-sm text-white/70 font-medium">{role}</p>
        </div>
      )}
    </motion.div>
  );
}

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, Volume2, VolumeX, Maximize2, Share2 } from "lucide-react";

// type VideoType = "youtube" | "video";

// interface MentorCardProps {
//   name: string;
//   role: string;
//   imageUrl: string;
//   videoType: VideoType;
//   videoSrc: string;
// }

// // Extract YouTube video ID
// const extractYouTubeId = (url: string): string | null => {
//   const patterns = [
//     /(?:youtube\.com\/shorts\/)([^&\n?#\/]+)/,
//     /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
//     /(?:youtu\.be\/)([^&\n?#]+)/,
//     /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
//   ];

//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match?.[1]) {
//       return match[1].split("?")[0];
//     }
//   }
//   return null;
// };

// export function MentorCard({
//   name,
//   role,
//   imageUrl,
//   videoType,
//   videoSrc,
// }: MentorCardProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [showControls, setShowControls] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const controlsTimeoutRef = useRef<NodeJS.Timeout>();

//   const videoId = videoType === "youtube" ? extractYouTubeId(videoSrc) : null;
//   const thumbnailUrl = videoId
//     ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
//     : imageUrl;

//   useEffect(() => {
//     return () => {
//       if (controlsTimeoutRef.current) {
//         clearTimeout(controlsTimeoutRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || videoType === "youtube") return;

//     const updateProgress = () => {
//       const progress = (video.currentTime / video.duration) * 100;
//       setProgress(progress);
//     };

//     video.addEventListener("timeupdate", updateProgress);
//     return () => video.removeEventListener("timeupdate", updateProgress);
//   }, [videoType]);

//   const handleMouseMove = () => {
//     if (!isPlaying) return;
//     setShowControls(true);
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       setShowControls(false);
//     }, 2000);
//   };

//   const togglePlay = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     if (videoType === "youtube" && iframeRef.current) {
//       const iframe = iframeRef.current;
//       if (!isPlaying) {
//         iframe.contentWindow?.postMessage(
//           '{"event":"command","func":"playVideo","args":""}',
//           "*"
//         );
//         setIsPlaying(true);
//       } else {
//         iframe.contentWindow?.postMessage(
//           '{"event":"command","func":"pauseVideo","args":""}',
//           "*"
//         );
//         setIsPlaying(false);
//       }
//     } else if (videoType === "video" && videoRef.current) {
//       if (!isPlaying) {
//         videoRef.current.play();
//         setIsPlaying(true);
//       } else {
//         videoRef.current.pause();
//         setIsPlaying(false);
//       }
//     }
//   };

//   const toggleMute = (e: React.MouseEvent) => {
//     e.stopPropagation();

//     if (videoType === "youtube" && iframeRef.current) {
//       const iframe = iframeRef.current;
//       if (isMuted) {
//         iframe.contentWindow?.postMessage(
//           '{"event":"command","func":"unMute","args":""}',
//           "*"
//         );
//       } else {
//         iframe.contentWindow?.postMessage(
//           '{"event":"command","func":"mute","args":""}',
//           "*"
//         );
//       }
//       setIsMuted(!isMuted);
//     } else if (videoType === "video" && videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       transition={{ duration: 0.3 }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => setShowControls(false)}
//       // className="group relative w-full cursor-pointer overflow-hidden rounded-3xl bg-black"
//       className="group relative cursor-pointer overflow-hidden bg-black"
//       style={{ width: "315px", height: "430px", borderRadius: "25px" }}
//     >
//       {/* Thumbnail - shown when not playing */}
//       <AnimatePresence>
//         {!isPlaying && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0"
//           >
//             <img
//               src={thumbnailUrl}
//               alt={name}
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/40" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Video Player */}
//       <div
//         className={`absolute inset-0 ${
//           isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {videoType === "youtube" && videoId ? (
//           <div className="absolute inset-0 w-full h-full overflow-hidden object-cover">
//             <iframe
//               ref={iframeRef}
//               src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1&mute=${
//                 isMuted ? 1 : 0
//               }`}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
//               style={{
//                 border: "none",
//                 minWidth: "100%",
//                 minHeight: "100%",
//               }}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         ) : (
//           <video
//             ref={videoRef}
//             src={videoSrc}
//             className="absolute inset-0 w-full h-full object-cover"
//             loop
//             muted={isMuted}
//             playsInline
//             onEnded={() => setIsPlaying(false)}
//           />
//         )}
//       </div>

//       {/* Play Button - center */}
//       {!isPlaying && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <motion.button
//             onClick={togglePlay}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl"
//           >
//             <Play className="h-7 w-7 fill-current ml-1" />
//           </motion.button>
//         </div>
//       )}

//       {/* Top Header - Always visible when playing */}
//       <AnimatePresence>
//         {isPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute top-0 left-0 right-0 p-4 bg-linear-to-b from-black/80 to-transparent z-20"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
//                   <span className="text-xs font-bold text-black">OS</span>
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold text-sm">{name}</p>
//                   <button className="px-3 py-0.5 bg-white text-black text-xs font-medium rounded mt-0.5">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//               <button className="text-white">
//                 <Share2 className="h-6 w-6" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Bottom Controls - YouTube Shorts style */}
//       <AnimatePresence>
//         {isPlaying && (showControls || true) && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20"
//           >
//             {/* Progress Bar */}
//             {videoType === "video" && (
//               <div className="mb-4">
//                 <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
//                   <div
//                     className="absolute left-0 top-0 h-full bg-red-600 transition-all duration-100"
//                     style={{ width: `${progress}%` }}
//                   />
//                   <div
//                     className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full transition-all duration-100"
//                     style={{
//                       left: `${progress}%`,
//                       transform: "translate(-50%, -50%)",
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Control Buttons */}
//             <div className="flex items-center justify-between">
//               <button onClick={togglePlay} className="text-white">
//                 <Pause className="h-8 w-8 fill-white" />
//               </button>

//               <div className="flex items-center gap-4">
//                 <button onClick={toggleMute} className="text-white">
//                   {isMuted ? (
//                     <VolumeX className="h-6 w-6" />
//                   ) : (
//                     <Volume2 className="h-6 w-6" />
//                   )}
//                 </button>

//                 <button className="text-white">
//                   <Maximize2 className="h-6 w-6" />
//                 </button>
//               </div>

//               <span className="text-white text-sm font-medium">Shorts</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Name and Role - bottom left, when not playing */}
//       {!isPlaying && (
//         <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
//           <h3 className="text-2xl font-bold text-white mb-0.5 tracking-tight">
//             {name}
//           </h3>
//           <p className="text-sm text-white/70 font-medium">{role}</p>
//         </div>
//       )}
//     </motion.div>
//   );
// }
