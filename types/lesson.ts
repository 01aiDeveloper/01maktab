export interface LessonVideo {
  id: number;
  link: string;
  linkType: 'YOU_TUBE' | 'BUNNY_STREAM';
  orderId: number;
}

export type LessonBlock =
  | { type: 'code'; order: number; value: string }
  | { type: 'info_block'; order: number; blocks: { text: string; status: 'Important' | 'Tip' | 'Attention' } }
  | { type: 'image_group'; order: number; images: string[] }
  | { type: 'file'; order: number; url: string }
  | { type: 'image'; order: number; url: string }
  | { type: 'text'; order: number; value: string }
  | { type: string; order: number; [key: string]: any };

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  orderId: number;
  duration: number;
  blocks: LessonBlock[];
  isPublic: boolean;
  videos: LessonVideo[];
}
