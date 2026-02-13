import { LessonBlock } from '@/types/lesson';
import { sortByOrder } from '@/lib/lesson-utils';
import { CodeBlock } from './code-block';
import { InfoBlock } from './info-block';
import { ImageGroupBlock } from './image-group-block';
import { TextBlock } from './text-block';
import { FileBlock } from './file-block';
import { SingleImageBlock } from './single-image-block';

interface LessonBlockRendererProps {
  blocks: LessonBlock[];
}

export function LessonBlockRenderer({ blocks }: LessonBlockRendererProps) {
  const sortedBlocks = sortByOrder(blocks);

  return (
    <div className="space-y-6">
      {sortedBlocks.map((block, index) => {
        if (block.type === 'code' && 'value' in block) {
          return <CodeBlock key={index} code={block.value} />;
        }

        if (block.type === 'info_block' && 'blocks' in block) {
          return <InfoBlock key={index} text={block.blocks.text} status={block.blocks.status} />;
        }

        if (block.type === 'image_group' && 'images' in block) {
          return <ImageGroupBlock key={index} images={block.images} />;
        }

        if (block.type === 'text' && 'value' in block) {
          return <TextBlock key={index} html={block.value} />;
        }

        if (block.type === 'file' && 'url' in block) {
          return <FileBlock key={index} url={block.url} />;
        }

        if (block.type === 'image' && 'url' in block) {
          return <SingleImageBlock key={index} url={block.url} />;
        }

        return null;
      })}
    </div>
  );
}
