"use client";

import Image from "next/image";
import { StoryBlock } from "@/types/story";
import { HtmlBlock } from "./html-block";
import { ImageGroupGallery } from "./image-group-gallery";
import { getMediaUrl } from "@/lib/utils";

interface StoryBlocksRendererProps {
  blocks: StoryBlock[];
}

export function StoryBlocksRenderer({ blocks }: StoryBlocksRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="bg-gray-50 rounded-3xl p-8 text-center">
        <p className="text-gray-500">Ma'lumot yo'q</p>
      </div>
    );
  }

  // Sort blocks by order
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 lg:space-y-8">
      {sortedBlocks.map((block, index) => (
        <div key={index}>
          {block.type === "text" && "value" in block && (
            <div className="bg-white rounded-3xl p-6 lg:p-8">
              <HtmlBlock html={block.value} />
            </div>
          )}

          {block.type === "image" && "url" in block && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden">
              <Image
                src={getMediaUrl(block.url)}
                alt="Story image"
                fill
                className="object-cover"
              />
            </div>
          )}

          {block.type === "image_group" && "images" in block && (
            <ImageGroupGallery images={block.images} />
          )}

          {/* Fallback for unknown types - render nothing */}
          {!["text", "image", "image_group"].includes(block.type) && null}
        </div>
      ))}
    </div>
  );
}
