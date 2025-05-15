import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAlbums } from "@/lib/db/db-actions";
import { AlbumWithCount } from "@/lib/db/db-types";
import { auth } from "@clerk/nextjs/server";
import { FlipHorizontal, PlayCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddAlbumDialog from "./components/AlbumDialog";
import SubNav from "../components/SubNav";

export default async function AlbumsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const albums: AlbumWithCount[] = await getAlbums(userId);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <SubNav name="Tvoje Alba" returnPath="/" />
        <AddAlbumDialog />
      </div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Cvičení<span className="text-muted-foreground"> - náhodná slovíčka</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href={`/flashcards`}>
              <Button className="flex items-center gap-2">
                <FlipHorizontal className="h-4 w-4" />
                Kartičky
              </Button>
            </Link>
            <Link href={`/learning`}>
              <Button variant="secondary" className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Seznam
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Link
            href={`/albums/${album.id}`}
            key={album.id}
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card className="h-full hover:shadow-md transition-shadow relative">
              <CardHeader>
                <CardTitle>{album.name}</CardTitle>
                <CardDescription>{album.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {album._count.words} Slovíček
                </div>
                <div className="text-sm text-muted-foreground">
                  {album.language}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
