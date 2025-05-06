"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Eye, EyeOff, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    words: {
        id: number;
        term: string;
        translation: string;
    }[]
}
const LearnList = ({words}: Props) => {
      const [learningTerms, setLearningTerms] = useState(words);
    
      const [swapColumns, setSwapColumns] = useState(false);
      const [coverTranslations, setCoverTranslations] = useState(true);
      const [uncoveredIndices, setUncoveredIndices] = useState<number[]>([]);
    
      const toggleCover = (index: number) => {
        if (uncoveredIndices.includes(index)) {
          setUncoveredIndices(uncoveredIndices.filter((i) => i !== index));
        } else {
          setUncoveredIndices([...uncoveredIndices, index]);
        }
      };
    
      const toggleSwapColumns = () => {
        setSwapColumns(!swapColumns);
      };
    
      const shuffleTerms = () => {
        const shuffled = [...learningTerms].sort(() => Math.random() - 0.5);
        setLearningTerms(shuffled);
      };
    
      const handleCoverAll = () => {
        setCoverTranslations(true);
        setUncoveredIndices([]);
      };
    
      const handleUncoverAll = () => {
        setCoverTranslations(false);
      };
    
      useEffect(() => {
        setUncoveredIndices([]);
      }, [coverTranslations]);

      if (!words || words.length === 0) {
        return <div className="text-center">Nenalezena žádná slova</div>;
      }
    
  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleUncoverAll}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Odhalit
        </Button>
        <Button
          size="sm"
          onClick={handleCoverAll}
          className="flex items-center gap-2"
        >
          <EyeOff className="h-4 w-4" />
          Zakrýt
        </Button>
      </div>
      <div className="flex gap-4 my-4 mx-auto justify-center">
          <Button variant="ghost" size="icon" onClick={toggleSwapColumns}>
            <ArrowLeftRight/>
          </Button>
          <Button variant="ghost" size="icon" onClick={shuffleTerms}>
            <Shuffle />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 py-2 font-semibold border-b place-items-center max-w-2xl mx-auto">
          <div>{swapColumns ? "PŘEKLAD" : "SLOVO"}</div>
          <div>{swapColumns ? "SLOVO" : "PŘEKLAD"}</div>
        </div>

        {learningTerms.map((term, index) => {
          const firstColumn = swapColumns ? term.translation : term.term;
          const secondColumn = swapColumns ? term.term : term.translation;
          const isCovered =
            coverTranslations && !uncoveredIndices.includes(index);

          return (
            <div
              key={term.id}
              className="grid grid-cols-2 gap-4 p-2 border-b hover:bg-muted/10 place-items-center max-w-2xl mx-auto"
            >
              <div>{firstColumn}</div>
              <div
                onClick={() => coverTranslations && toggleCover(index)}
                className={`${
                  isCovered ? "bg-muted cursor-pointer select-none w-full" : ""
                } px-3 py-1 rounded flex items-center justify-center min-h-[2.5rem]`}
              >
                {isCovered ? (
                  <Eye className="h-5 w-5 text-muted-foreground opacity-70" />
                ) : (
                  secondColumn
                )}
              </div>
            </div>
          );
        })}
      </>
  )
}

export default LearnList