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
        <p className="text-gray-500">Ma&apos;lumot yo&apos;q</p>
      </div>
    );
  }

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8 lg:space-y-10">
      {sortedBlocks.map((block, index) => (
        <div key={index}>
          {block.type === "text" && "value" in block && (
            <HtmlBlock html={block.value} />
          )}

          {block.type === "image" && "url" in block && (
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
              <Image
                quality={90} src={getMediaUrl(block.url)}
                alt="Story image"
                fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}

          {block.type === "image_group" && "images" in block && (
            <ImageGroupGallery images={block.images} />
          )}

          {!["text", "image", "image_group"].includes(block.type) && null}
        </div>
      ))}
    </div>
  );
}
