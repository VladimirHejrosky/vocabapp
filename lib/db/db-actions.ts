"use server";

import { db } from "@/prisma/prisma";
import {
  albumSchema,
  wordPair,
  wordPairFormSchema,
  wordsForUpdate,
} from "@/validation/form-validations";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { Language } from "../generated/prisma";
import { revalidatePath } from "next/cache";

// Albums

export async function getAlbums(userId: string) {

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
    revalidatePath("/albums/" + albumId)
  } else {
    await db.album.create({
      data: {
        name: data.name,
        description: data.description,
        language: data.language,
        userId,
      },
    });
    revalidatePath("/albums")
  }
}

export async function getAlbum(userId: string, albumId: number) {
  const album = await db.album.findFirst({
    where: { id: albumId, userId },
    include: {
      words: { orderBy: { term: "asc" } },
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
        orderBy: { priority: "asc" },
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
    orderBy: { priority: "asc" },
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
}

export async function deleteWord(wordId: number, albumId: number) {
  const { userId } = await auth();
  if (!userId) return { error: true };

  await db.word.delete({
    where: { id: wordId, userId },
  });
  revalidatePath("/albums/" + albumId)

}

export async function editWord(
  unsafeData: z.infer<typeof wordPair>,
  albumId: number
) {
  const { userId } = await auth();
  const { success, data } = wordPair.safeParse(unsafeData);
  if (!success || !userId) return { error: true };
    await db.word.update({
      where: { id: data.id, userId },
      data: {
        term: data.term,
        translation: data.translation,
        example: data.example,
      },
    });
    revalidatePath("/albums/" + albumId)

}

export async function updateWordsPriority( unsafeData: z.infer<typeof wordsForUpdate> ){
  const { userId } = await auth();
  const { success, data } = wordsForUpdate.safeParse(unsafeData);
  if (!success || !userId) return { error: true };

  const filteredData = data.map(({ id, priority, know }) => {
    if (know && priority < 10) {
      return { id, newPriority: priority + 1 };
    }
    if (!know && priority > 1) {
      return { id, newPriority: 1 };
    }
    return null;
  })
  .filter(Boolean) as { id: number; newPriority: number }[];

  const updateOps = filteredData.map(word =>
  db.word.update({
    where: {
      id: word.id,
      userId
    },
    data: {
      priority: word.newPriority
    }
  })
);

await Promise.all(updateOps);
}

// functions
function isValidLanguage(value: any): value is Language {
  return Object.values(Language).includes(value);
}
