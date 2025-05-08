"use server";

import { db } from "@/prisma/prisma";
import {
  albumSchema,
  wordPairFormSchema
} from "@/validation/form-validations";
import { auth } from "@clerk/nextjs/server";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { z } from "zod";
import { AlbumWithCount, AlbumWithWords } from "./db-types";
import { cookies } from "next/headers";
import { Language } from "../generated/prisma";


export async function getAlbums(userId: string): Promise<AlbumWithCount[]> {
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

export async function upsertAlbum(
  unsafeData: z.infer<typeof albumSchema>,
  albumId?: number
) {
  const { userId } = await auth();
  const { success, data } = albumSchema.safeParse(unsafeData);
  if (!success || !userId) return { error: true };

  if (albumId) {
    await db.album.update({
      where: { id: albumId, userId },
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

  revalidateTag(`albums-${userId}`);
  revalidateTag(`album-${albumId}`);
}

export async function getAlbum(
  userId: string,
  albumId: number
): Promise<AlbumWithWords | null> {
  "use cache";
  cacheTag(`album-${albumId}`);
  const album = await db.album.findFirst({
    where: { id: albumId, userId },
    include: {
      words: true,
    },
  });
  return album;
}

export async function getAlbumWithWords(userId: string, albumId: number) {
  return db.album.findFirst({
    where: {
      id: albumId,
      userId,
    },
    select: {
      name: true,
      language: true,
      words: {
        orderBy: { priority: "desc" },
        take: 10,
        select: {
          id: true,
          term: true,
          translation: true,
          example: true,
          priority: true,
        },
      },
    },
  });
}

export async function getRandomWords(userId: string) {
  const rawLang = (await cookies()).get("lang")?.value;
  const langCookie: Language | undefined = isValidLanguage(rawLang) ? rawLang : undefined;

  const words = await db.word.findMany({
    where: {
      userId,
      ...(langCookie && {
        album: {
          language: langCookie,
        },
      }),
    },
    orderBy: { priority: "desc" },
    take: 10,
  });
  return words;
}

export async function saveNewWords(
  unsafeData: z.infer<typeof wordPairFormSchema>
) {
  const { userId } = await auth();
  const { success, data } = wordPairFormSchema.safeParse(unsafeData);
  if (!success || !userId) return { error: true };

  const { albumId, pairs } = data;
  try {
    await db.word.createMany({
      data: pairs.map((pair) => ({
        term: pair.term,
        translation: pair.translation,
        example: pair.example || null,
        userId,
        albumId,
      })),
    });
    revalidateTag(`albums-${userId}`);
    revalidateTag(`album-${albumId}`);
  } catch {
    return { error: true }
  }
}

function isValidLanguage(value: any): value is Language {
  return Object.values(Language).includes(value);
}