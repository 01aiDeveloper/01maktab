# Graduate Story Detail Page

## Overview
This is a complete implementation of the Graduate Story Detail page that displays individual graduate success stories with dynamic content blocks.

## Features

### ✅ Implemented Components
1. **GraduateStoryPage** (`/app/graduates/[id]/page.tsx`)
   - Dynamic routing with `[id]` parameter
   - Server-side data fetching
   - Loading and error states
   - Responsive hero section with graduate photo

2. **StoryBlocksRenderer** (`/components/story/story-blocks-renderer.tsx`)
   - Extensible block rendering system
   - Supports multiple block types
   - Automatic sorting by order
   - Graceful handling of unknown types

3. **ImageGroupGallery** (`/components/story/image-group-gallery.tsx`)
   - Responsive grid layout (2 columns on desktop, 1 on mobile)
   - Image lightbox with next/prev navigation
   - Keyboard support (ESC, Arrow keys)
   - Smooth animations

4. **HtmlBlock** (`/components/story/html-block.tsx`)
   - Sanitized HTML rendering using DOMPurify
   - Tailwind prose styles
   - Safe against XSS attacks

## Block Types Supported

### 1. Text Block
```typescript
{
  type: "text",
  order: 1,
  value: "<p>HTML content here</p>"
}
```
- Renders sanitized HTML
- Supports headings, paragraphs, lists, etc.
- Styled with Tailwind prose

### 2. Image Block
```typescript
{
  type: "image",
  order: 2,
  url: "/path/to/image.jpg"
}
```
- Single responsive image
- Rounded corners with shadow
- Proper aspect ratio

### 3. Image Group Block
```typescript
{
  type: "image_group",
  order: 3,
  images: [
    "/path/to/image1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    "/path/to/image4.jpg"
  ]
}
```
- Responsive gallery grid
- Clickable images with lightbox
- Smooth hover effects

## Page Structure

### Hero Section
- **Left Column**:
  - Back link to all graduates
  - Story title and subtitle
  - Graduate name, position, company
  - CTA button "Hozir boshlash"

- **Right Column**:
  - Large rounded graduate photo
  - Aspect ratio: square on mobile, 3:4 on desktop

### Content Section
- Renders all story blocks in order
- Maximum width container for readability
- Responsive spacing

### Other Stories Section
- Shows 4 other graduate stories (excluding current)
- Grid layout: 1/2/4 columns (mobile/tablet/desktop)
- Hover effects on cards
- Direct links to other stories

## Configuration

### Environment Variables
Create a `.env.local` file:

```bash
NEXT_PUBLIC_MEDIA_URL=https://your-media-server.com/media/
NEXT_PUBLIC_API_URL=https://your-api-server.com/api
```

### API Endpoints Required

1. **Get Single Story**
```
GET /graduates/:id
Response: { data: GraduateStory }
```

2. **Get Other Stories**
```
GET /graduates?exclude={id}&limit=4
Response: { data: GraduateStoryCard[] }
```

## Usage Example

### Navigate to Story
```typescript
// From any component
router.push(`/graduates/${storyId}`);

// Or use Link
<Link href={`/graduates/${storyId}`}>View Story</Link>
```

### Story Data Format
```typescript
{
  id: "123",
  fullname: "John Doe",
  photo: "/graduates/john-doe.jpg",
  company: "Tech Company",
  position: "Senior Developer",
  title: "How I became a developer",
  subtitle: "My journey from beginner to senior",
  blocks: [
    {
      type: "text",
      order: 1,
      value: "<h2>My Story</h2><p>It started...</p>"
    },
    {
      type: "image_group",
      order: 2,
      images: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"]
    },
    {
      type: "image",
      order: 3,
      url: "/certificate.jpg"
    }
  ]
}
```

## Extensibility

### Adding New Block Types

To add a new block type (e.g., "video"):

1. **Update types** (`types/story.ts`):
```typescript
export type StoryBlock =
  | { type: "text"; order: number; value: string }
  | { type: "image"; order: number; url: string }
  | { type: "image_group"; order: number; images: string[] }
  | { type: "video"; order: number; url: string; thumbnail: string } // NEW
  | { type: string; order: number; [key: string]: any };
```

2. **Add renderer** (`story-blocks-renderer.tsx`):
```typescript
{block.type === "video" && "url" in block && (
  <VideoBlock url={block.url} thumbnail={block.thumbnail} />
)}
```

3. **Create component** (`components/story/video-block.tsx`):
```typescript
export function VideoBlock({ url, thumbnail }) {
  // Your video player implementation
}
```

## Error Handling

### Story Not Found
- Shows friendly error message
- Provides button to return to all graduates
- Maintains header and footer

### Loading State
- Shows centered spinner
- Loading text
- Maintains header and footer

### Empty Blocks
- Shows "Ma'lumot yo'q" message
- Styled placeholder

### Empty Image Group
- Renders nothing (null)
- No broken layout

## Performance Optimizations

1. **Image Optimization**
   - Using Next.js Image component
   - Automatic lazy loading
   - Priority loading for hero image

2. **Animation Performance**
   - Framer Motion with GPU acceleration
   - Smooth transitions

3. **Code Splitting**
   - Client components are code-split
   - Lightbox only loads when needed

## Accessibility

- Keyboard navigation in lightbox
- Semantic HTML structure
- Alt text for all images
- Focus management
- ARIA labels where needed

## Styling

- **Theme**: Light (neutral grays and white)
- **Rounded Corners**: 2xl and 3xl throughout
- **Typography**: Using Tailwind prose for content
- **Shadows**: Subtle elevation
- **Hover States**: Scale and shadow effects

## Dependencies

```json
{
  "isomorphic-dompurify": "^2.x", // HTML sanitization
  "framer-motion": "^11.x",        // Animations
  "lucide-react": "^0.x"           // Icons
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch gestures for lightbox

## Testing Checklist

- [ ] Story loads correctly
- [ ] All block types render
- [ ] Images load from MEDIA_URL
- [ ] Lightbox opens and closes
- [ ] Keyboard navigation works
- [ ] Back button navigates correctly
- [ ] Other stories load
- [ ] Mobile responsive
- [ ] Loading state shows
- [ ] Error state shows for invalid ID
- [ ] HTML content is sanitized
- [ ] CTA button works

## Future Enhancements

1. Social sharing buttons
2. Print-friendly version
3. Related stories based on tags
4. Reading time estimation
5. Progress indicator for long stories
6. Comments section
7. Bookmark/favorite functionality
8. Search within story
