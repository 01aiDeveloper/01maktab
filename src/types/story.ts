// Story types with discriminated union for blocks
export type StoryBlock =
  | { type: "text"; order: number; value: string }
  | { type: "image"; order: number; url: string }
  | { type: "image_group"; order: number; images: string[] }
  | { type: string; order: number; [key: string]: any };

export interface GraduateStory {
  id: string;
  fullname: string;
  photo: string;
  company: string;
  position: string;
  title: string;
  subtitle: string;
  blocks: StoryBlock[];
}

export interface GraduateStoryCard {
  id: number;
  fullname: string;
  photo: string;
  company: string;
  position: string;
}
