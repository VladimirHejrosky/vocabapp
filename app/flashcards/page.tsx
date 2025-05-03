import { getAlbums } from "@/lib/db/db-actions";
import { auth } from "@clerk/nextjs/server";
import SubNav from "../components/SubNav";
import CardSet from "./components/CardSet";

export default async function FlashcardsPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const sampleWords = await getAlbums(userId);

  return (
    <div className="container mx-auto px-4">
      <SubNav name="Kartičky" desctiprion="Album"/>
      <CardSet initialWords={sampleWords} />
    </div>
  );
}
