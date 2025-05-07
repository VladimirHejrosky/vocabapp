"use server";

import { db } from "@/prisma/prisma";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { auth } from '@clerk/nextjs/server'
import { z } from "zod";
import { albumSchema } from "@/validation/form-validations";
import { redirect } from "next/navigation"
import { AlbumWithCount, AlbumWithWords } from "./db-types";


// Albums
export async function getAlbums(userId:string): Promise<AlbumWithCount[]> {
  "use cache";
  cacheTag(`albums-${userId}`);
  const albums = await db.album.findMany({
    where: { userId },
    include: {
      _count: {
        select: { words: true },
      },
    },
  });

  return albums;
}

export async function upsertAlbum(unsafeData: z.infer<typeof albumSchema>) {
  const { userId } = await auth()
  const { success, data } = albumSchema.safeParse(unsafeData);
if (!success || !userId ) return { error: true}

if (data.id) {
  await db.album.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      language: data.language,
    },
  });
} else {
  await db.album.create({
    data: {
      name: data.name,
      description: data.description,
      language: data.language,
      userId,
    },
  });
}

revalidateTag(`albums-${userId}`)
redirect("/albums/" + data.id);
}

export async function getAlbum(userId: string, albumId: number): Promise<AlbumWithWords | null> {
  "use cache";
  cacheTag(`album-${albumId}`);
  const album = await db.album.findFirst({
    where: { id: albumId, userId },
    include: {
      words: true
      },
  });
  return album;
}


// Words
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