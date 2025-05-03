import SubNav from "@/app/components/SubNav";
import LearnList from "./components/LearnList";

interface Word {
  id: number;
  term: string;
  translation: string;
}

// Get DB data
const data: Word[] = [
      {
        id: 1,
        term: "apple",
        translation: "jablko",
      },
      {
        id: 2,
        term: "book",
        translation: "kniha",
      },
      {
        id: 3,
        term: "car",
        translation: "auto",
      },
      {
        id: 4,
        term: "dog",
        translation: "pes",
      },
      {
        id: 5,
        term: "house",
        translation: "dům",
      },
      {
        id: 6,
        term: "computer",
        translation: "počítač",
      },
      {
        id: 7,
        term: "friend",
        translation: "přítel",
      },
      {
        id: 8,
        term: "water",
        translation: "voda",
      },
      { id: 9, term: "time", translation: "čas"},
      {
        id: 10,
        term: "food",
        translation: "jídlo",
      },
    ]

export default function LearningPage() {
  return (
    <div className="container mx-auto px-4">
      <SubNav name="Seznam" desctiprion="album" />
      <LearnList words={data} />
      </div>
  );
}
