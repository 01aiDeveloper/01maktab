# Video Player Components

Production-ready video player components for Next.js applications using Plyr and hls.js.

## 📦 Installation

The required dependencies are already installed:
```bash
npm install plyr hls.js
```

Plyr CSS is already imported in `app/globals.css`.

## 🎬 Components

### 1. SimpleVideoPlayer

A lightweight video player supporting YouTube, Vimeo, and local MP4/WebM videos.

**Features:**
- ✅ YouTube video support
- ✅ Vimeo video support
- ✅ Local MP4/WebM video support
- ✅ Progress tracking
- ✅ End event handling
- ✅ Responsive by default
- ✅ Clean architecture with proper cleanup

**Props:**
```typescript
interface SimpleVideoPlayerProps {
  type: "youtube" | "vimeo" | "video";
  url: string;
  onEnded?: () => void;
  onProgress?: (percent: number) => void;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}
```

### 2. StreamVideoPlayer

Professional HLS streaming player for `.m3u8` video streams.

**Features:**
- ✅ HLS (.m3u8) streaming support
- ✅ Safari native HLS fallback
- ✅ hls.js integration
- ✅ Progress tracking
- ✅ End event handling
- ✅ Error handling and recovery
- ✅ Memory-safe cleanup

**Props:**
```typescript
interface StreamVideoPlayerProps {
  src: string; // HLS stream URL (.m3u8)
  onEnded?: () => void;
  onProgress?: (percent: number) => void;
  className?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}
```

## 📖 Usage Examples

### YouTube Video

```tsx
import SimpleVideoPlayer from "@/components/shared/simple-video-player";

export default function LessonPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <SimpleVideoPlayer
        type="youtube"
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        onProgress={(percent) => {
          console.log(`Watched: ${percent}%`);
          // Save progress to database
        }}
        onEnded={() => {
          console.log("Video completed!");
          // Mark lesson as completed
        }}
        className="aspect-video"
      />
    </div>
  );
}
```

### Vimeo Video

```tsx
<SimpleVideoPlayer
  type="vimeo"
  url="https://vimeo.com/123456789"
  onProgress={(percent) => {
    localStorage.setItem("progress", percent.toString());
  }}
  className="aspect-video"
/>
```

### Local Video (MP4/WebM)

```tsx
<SimpleVideoPlayer
  type="video"
  url="/videos/lesson-1.mp4"
  onProgress={(percent) => {
    if (percent >= 50) {
      console.log("Halfway through!");
    }
  }}
  onEnded={() => {
    // Unlock next lesson
  }}
  className="aspect-video"
/>
```

### HLS Streaming Video

```tsx
import StreamVideoPlayer from "@/components/shared/stream-video-player";

export default function StreamingPage() {
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
          console.log("Stream completed!");
        }}
        className="aspect-video"
      />
    </div>
  );
}
```

### Autoplay Video (Muted)

```tsx
<SimpleVideoPlayer
  type="video"
  url="/videos/intro.mp4"
  autoplay={true}
  muted={true}
  loop={true}
  className="aspect-video"
/>
```

## 🎨 Styling

Both components accept a `className` prop for custom styling. The players are responsive by default.

```tsx
<SimpleVideoPlayer
  type="youtube"
  url="https://www.youtube.com/watch?v=..."
  className="w-full rounded-2xl overflow-hidden shadow-2xl aspect-video"
/>
```

## 🔧 Advanced Usage

### Tracking Progress in Database

```tsx
const handleProgress = useCallback(
  debounce((percent: number) => {
    // Save to database every 10%
    if (percent % 10 < 1) {
      fetch("/api/lessons/progress", {
        method: "POST",
        body: JSON.stringify({
          lessonId: lesson.id,
          progress: percent,
        }),
      });
    }
  }, 1000),
  [lesson.id]
);

<SimpleVideoPlayer
  type="video"
  url={lesson.videoUrl}
  onProgress={handleProgress}
/>
```

### Conditional Rendering Based on Completion

```tsx
const [isCompleted, setIsCompleted] = useState(false);

<SimpleVideoPlayer
  type="youtube"
  url={lesson.videoUrl}
  onEnded={() => {
    setIsCompleted(true);
    // Unlock next lesson
  }}
/>

{isCompleted && (
  <div className="mt-4">
    <Button>Next Lesson</Button>
  </div>
)}
```

## 🏗️ File Structure

```
components/
  shared/
    simple-video-player.tsx      # YouTube, Vimeo, Local videos
    stream-video-player.tsx       # HLS streaming videos
    video-player-examples.tsx     # Usage examples
    VIDEO_PLAYERS_README.md        # This file
```

## ⚠️ Important Notes

1. **Client Components**: Both components are marked with `"use client"` as they use browser APIs.

2. **Cleanup**: Both components properly clean up resources on unmount to prevent memory leaks.

3. **Error Handling**: StreamVideoPlayer includes automatic error recovery for network and media errors.

4. **Safari Support**: StreamVideoPlayer automatically uses Safari's native HLS support when available.

5. **Progress Tracking**: Progress is calculated as a percentage (0-100) of total video duration.

## 🐛 Troubleshooting

### Video not loading
- Check that the URL is correct and accessible
- For YouTube/Vimeo, ensure the video is not private or restricted
- For HLS, verify the `.m3u8` file is accessible and CORS is configured

### Progress not updating
- Ensure `onProgress` callback is provided
- Check browser console for errors
- Verify video metadata is loaded (duration available)

### Player not showing
- Ensure Plyr CSS is imported (already done in `globals.css`)
- Check that the container has proper dimensions
- Verify the component is used in a client component

## 📚 Additional Resources

- [Plyr Documentation](https://plyr.io/)
- [hls.js Documentation](https://github.com/video-dev/hls.js/)
- [Next.js App Router](https://nextjs.org/docs/app)

