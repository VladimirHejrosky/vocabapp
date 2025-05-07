import { Language, Word } from "../generated/prisma";

export type AlbumWithCount = {
    id: number;
    name: string;
    description?: string | null;
    language: Language;
    _count: {
      words: number;};
  }
  
export type AlbumWithWords = {
    id: number;
    name: string;
    description?: string | null;
    language: Language;
    words: Word[];
  }
  
  