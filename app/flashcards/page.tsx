import { getAlbumWithWords, getRandomWords } from "@/lib/db/db-actions";
import { auth } from "@clerk/nextjs/server";
import SubNav from "../components/SubNav";
import CardSet from "./components/CardSet";

interface Props {
  searchParams: Promise<{ album: string }>;
}

export default async function FlashcardsPage({ searchParams }: Props) {
  const { album } = await searchParams;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const albumData = album ? await getAlbumWithWords(userId, Number(album)) : null
  const flashcardWords = album ? albumData?.words : await getRandomWords(userId);

  if (!flashcardWords || flashcardWords.length === 0)
    return <h3>Nemáš žádná slova v tomto album, nebo album neexistuje.</h3>;

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <SubNav
        name="Kartičky"
        desctiprion={
          (album && albumData?.name) || "Náhodná slovíčka"
        }
        returnPath={album ? `/albums/${album}` : "/"}
      />
      <CardSet initialWords={flashcardWords} lang={albumData?.language || null}/>
    </div>
  );
}
