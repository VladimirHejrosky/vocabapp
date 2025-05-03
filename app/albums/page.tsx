import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AddAlbumDialog from "./components/AlbumDialog";

interface Album {
  id: number;
  title: string;
  description: string;
  termCount: number;
}

// get from server
const albums: Album[] = [
  {id: 1, title: "Album 1", description: "Description 1", termCount: 10},
  {id: 2, title: "Album 2", description: "Description 2", termCount: 20},
  {id: 3, title: "Album 3", description: "Description 3", termCount: 30},
]

export default function AlbumsPage() {

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
                <CardTitle>{album.title}</CardTitle>
                <CardDescription>{album.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {album.termCount} Slovíček
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
