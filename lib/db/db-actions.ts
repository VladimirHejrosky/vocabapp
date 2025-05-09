"use server";

import { db } from "@/prisma/prisma";
import {
  albumSchema,
  wordPair,
  wordPairFormSchema,
} from "@/validation/form-validations";
import { auth } from "@clerk/nextjs/server";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { z } from "zod";
import { cookies } from "next/headers";
import { Language } from "../generated/prisma";
import { redirect } from "next/navigation";

// Albums

export async function getAlbums(userId: string) {
  "use cache";
  cacheTag(`albums-${userId}`);

  const albums = await db.album.findMany({
    where: { userId },
    orderBy: { name: "asc" },
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

export async function getAlbum(userId: string, albumId: number) {
  "use cache";
  cacheTag(`album-${albumId}`);

  const album = await db.album.findFirst({
    where: { id: albumId, userId },
    include: {
      words: { orderBy: { createdAt: "desc" } },
    },
  });
  return album;
}

export async function getAlbumWithWords(userId: string, albumId: number) {
  const album = db.album.findFirst({
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
  return album;
}

export async function deleteAlbum(userId: string, albumId: number) {
  await db.album.delete({
    where: { id: albumId, userId },
  });
  revalidateTag(`albums-${userId}`);
  revalidateTag(`album-${albumId}`);
}

// Words

export async function getRandomWords(userId: string) {
  const rawLang = (await cookies()).get("lang")?.value;
  const langCookie: Language | undefined = isValidLanguage(rawLang)
    ? rawLang
    : undefined;

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
}

export async function deleteWord(wordId: number, albumId: number) {
  const { userId } = await auth();
  if (!userId) return { error: true };

  await db.word.delete({
    where: { id: wordId, userId },
  });
  revalidateTag(`albums-${userId}`);
  revalidateTag(`album-${albumId}`);
}

export async function editWord(
  unsafeData: z.infer<typeof wordPair>,
  albumId: number
) {
  const { userId } = await auth();
  const { success, data } = wordPair.safeParse(unsafeData);
  if (!success || !userId) return { error: true };
  try {
    await db.word.update({
      where: { id: data.id, userId },
      data: {
        term: data.term,
        translation: data.translation,
        example: data.example,
      },
    });
    revalidateTag(`albums-${userId}`);
    revalidateTag(`album-${albumId}`);
  } catch (error) {
    console.log(error);
  }
}

// functions
function isValidLanguage(value: any): value is Language {
  return Object.values(Language).includes(value);
}
