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

type Album = {
  id: number;
  name: string;
  description: string;
  words: { id: number; translation: string; term: string; example: string }[];
};

// Get from DB
const albumsData: Album = {
  id: 1,
  name: "Basic Vocabulary",
  description: "Essential everyday words",
  words: [
    {
      id: 1,
      translation: "apple",
      term: "jablko",
      example: "I eat an apple every day.",
    },
    {
      id: 2,
      translation: "book",
      term: "kniha",
      example: "She reads a book before bed.",
    },
    {
      id: 3,
      translation: "car",
      term: "auto",
      example: "We drive to work by car.",
    },
    {
      id: 4,
      translation: "dog",
      term: "pes",
      example: "The dog barks at strangers.",
    },
    {
      id: 5,
      translation: "house",
      term: "dům",
      example: "They live in a big house.",
    },
    {
      id: 6,
      translation: "computer",
      term: "počítač",
      example: "I work on my computer.",
    },
    {
      id: 7,
      translation: "friend",
      term: "přítel",
      example: "He is my best friend.",
    },
    {
      id: 8,
      translation: "water",
      term: "voda",
      example: "Please drink more water.",
    },
    { id: 9, translation: "time", term: "čas", example: "What time is it?" },
    {
      id: 10,
      translation: "food",
      term: "jídlo",
      example: "The food tastes delicious.",
    },
  ],
};

export default function AlbumDetailPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <SubNav name="Testovací název alba" desctiprion="Popis" />
        <div className="flex gap-2 flex-col mb-4">
          <AlbumDialog album={albumsData} />
          <DeleteAlbumDialog
            albumId={albumsData.id}
          />
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Cvičení</CardTitle>
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
      <WordList data={albumsData.words} />
    </div>
  );
}
