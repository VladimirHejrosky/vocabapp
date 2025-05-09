import SubNav from "@/app/components/SubNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FlipHorizontal,
  PlayCircle
} from "lucide-react";
import Link from "next/link";
import AlbumDialog from "../components/AlbumDialog";
import DeleteAlbumDialog from "./components/DeleteAlbumDialog";
import WordList from "./components/WordList";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getAlbum } from "@/lib/db/db-actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: Props) {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const album = await getAlbum(userId, Number(id));
    if (!album) {
        return notFound()
    }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <SubNav name={album.name} desctiprion={album.description || ""} returnPath="/albums"/>
        <div className="flex gap-2 flex-col mb-4">
          <AlbumDialog album={album} />
          <DeleteAlbumDialog albumId={album.id} userId={userId}
          />
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Cvičení</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href={`/flashcards?album=${album.id}`}>
              <Button className="flex items-center gap-2">
                <FlipHorizontal className="h-4 w-4" />
                Kartičky
              </Button>
            </Link>
            <Link href={`/learning?album=${album.id}`}>
              <Button variant="secondary" className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Seznam
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <WordList data={album.words} albumId={album.id}/>
    </div>
  );
}
