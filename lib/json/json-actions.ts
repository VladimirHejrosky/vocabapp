"use server"
import fs from "fs";
import { cookies } from "next/headers";
import path from "path";
import { Language } from "../generated/prisma";
import { Quiz } from "./json-types";


export async function getGrammarList(): Promise<
  { id: string; title: string; description: string }[]
> {
  const lang =
    ((await cookies()).get("lang")?.value as Language | undefined) || "EN";
  const quizzesDirectory = path.join(process.cwd(), `data/grammar/${lang}`);
  const filenames = fs.readdirSync(quizzesDirectory);

  return filenames
    .filter((filename) => filename.endsWith(".json"))
    .map((filename) => {
      const filePath = path.join(quizzesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const quiz = JSON.parse(fileContents) as Quiz;

      return {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
      };
    });
}

export async function getGrammarById(id: string): Promise<Quiz | null> {
  const lang =
    ((await cookies()).get("lang")?.value as Language | undefined) || "EN";
  try {
    const dir = path.join(process.cwd(), "data", "grammar", lang);
    if (!fs.existsSync(dir)) {
      console.error("📂 Grammar folder not found at", dir);
      return null;
    }

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      const quiz = JSON.parse(
        fs.readFileSync(path.join(dir, file), "utf-8")
      ) as Quiz;
      if (quiz.id === id) return quiz;
    }

    console.warn(`⚠️ Quiz with id "${id}" not found in ${dir}`);
    return null;

  } catch (err) {
    console.error("🔥 getQuizById error:", err);
    return null;
  }
}
