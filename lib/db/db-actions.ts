"use server";

import { db } from "@/prisma/prisma";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function getAlbums(userId: string) {
  "use cache";

  if (!userId) {
    throw new Error("User not authenticated");
  }

  cacheTag(`albums-${userId}`);
  // const albums = await db.album.findMany({
  //   where: { userId },
  // });
  const albums = [
    { id: 1, term: "book", translation: "kniha", example: "I read a new book today." },
    { id: 2, term: "apple", translation: "jablko", example: "She ate a red apple." },
    { id: 3, term: "house", translation: "dům", example: "Their house is near the park." },
    { id: 4, term: "car", translation: "auto", example: "He washed his car yesterday." },
    { id: 5, term: "music", translation: "hudba", example: "They play music at the party." },
    { id: 6, term: "friend", translation: "přítel", example: "My friend called me this morning." },
    { id: 7, term: "coffee", translation: "káva", example: "I need coffee every day." },
    { id: 8, term: "city", translation: "město", example: "The city looks beautiful at night." },
    { id: 9, term: "garden", translation: "zahrada", example: "She waters her garden daily." },
    { id: 10, term: "movie", translation: "film", example: "We watched a movie last night." }
  ];

  return albums;
}

export async function getAlbumWords(userId: string, albumId: number) {
  const words = await db.word.findMany({
    where: { userId, albumId },
    orderBy: { priority: "desc" },
    take: 10,
  });
  return words;
}
export async function getRandomWords(userId: string) {
  const words = await db.word.findMany({
    where: { userId },
    orderBy: { priority: "desc" },
    take: 10,
  });
  return words;
}