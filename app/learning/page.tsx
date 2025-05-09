import SubNav from "@/app/components/SubNav";
import LearnList from "./components/LearnList";
import { getAlbumWithWords, getRandomWords } from "@/lib/db/db-actions";
import NoDataWarning from "../components/NoDataWarning";
import { cookies } from "next/headers";
import { Language } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const getLangCookie = async () => {
    const langCookie = (await cookies()).get('lang')?.value as Language | undefined;
    return langCookie
}

interface Props {
  searchParams: Promise<{ album: string }>;
}

export default async function LearningPage({ searchParams }: Props) {
    const { album } = await searchParams;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const albumData = album ? await getAlbumWithWords(userId, Number(album)) : null
  const listWords = album ? albumData?.words : await getRandomWords(userId);
  const lang = albumData ? albumData.language : await getLangCookie()
  
  
  if (!listWords || listWords.length === 0)
    return <NoDataWarning />;

  return (
    <div className="container mx-auto px-4">
      <SubNav name="Seznam" desctiprion={
          (album && albumData?.name) || "Náhodná slovíčka"
        } returnPath={album ? `/albums/${album}` : "/"} />
      <LearnList initialWords={listWords} lang={lang}/>
      </div>
  );
}
