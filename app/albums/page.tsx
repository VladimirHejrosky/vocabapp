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
import Link from "next/link";
import AddAlbumDialog from "./components/AlbumDialog";
import { redirect } from "next/navigation";

export default async function AlbumsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const albums: AlbumWithCount[] = await getAlbums(userId);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tvoje alba</h1>
        <AddAlbumDialog />
      </div>

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
