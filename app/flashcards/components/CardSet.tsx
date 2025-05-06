"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Check, X, RotateCw, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { SpeakButton } from "@/app/components/SpeakButton";

interface Word {
  id: number;
  term: string;
  translation: string;
  example: string;
}

interface Props {
  initialWords: Word[];
}

export default function CardSet({ initialWords }: Props) {
  const router = useRouter();
  const [words, setWords] = useState<Word[]>(initialWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<number[]>([]);
  const [unknownWords, setUnknownWords] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animation, setAnimation] = useState<
    "entering" | "exiting-right" | "exiting-left" | null
  >(null);
  // Add a state to track if we should show the card at all
  const [showCard, setShowCard] = useState(true);
  const [showExample, setShowExample] = useState(false);

  const currentWord = words[currentIndex];
  const remainingWords =
    words.length - (knownWords.length + unknownWords.length);

  // Reset function for starting over
  const resetLearning = () => {
    setWords(words.filter((word) => !knownWords.includes(word.id)));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWords([]);
    setUnknownWords([]);
    setIsCompleted(false);
    setShowCard(true);
  };

  // Handle card flip
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Update the markAsKnown function to use the new approach
  const markAsKnown = () => {
    setIsAnimating(true);
    // Start exit animation immediately without flipping back
    setAnimation("exiting-right");

    // Add the word to known words
    setKnownWords([...knownWords, currentWord.id]);

    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      // Hide the current card completely
      setShowCard(false);

      // Reset flip state while card is hidden
      setIsFlipped(false);

      setTimeout(() => {
        moveToNextCard();
      }, 50);
    }, 300);
  };

  // Update the markAsUnknown function to use the new approach
  const markAsUnknown = () => {
    setIsAnimating(true);
    // Start exit animation immediately without flipping back
    setAnimation("exiting-left");

    // Add the word to unknown words
    setUnknownWords([...unknownWords, currentWord.id]);

    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      // Hide the current card completely
      setShowCard(false);

      // Reset flip state while card is hidden
      setIsFlipped(false);

      setTimeout(() => {
        moveToNextCard();
      }, 50);
    }, 300);
  };

  // Update the moveToNextCard function to handle card visibility
  const moveToNextCard = () => {
    setAnimation(null); // Reset animation state first

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);

      // Show the card after a brief delay to ensure state is updated
      setTimeout(() => {
        setShowCard(true);
        setAnimation("entering");
        setIsAnimating(false);
      }, 50);
    } else {
      setIsCompleted(true);
      setIsAnimating(false);
    }
  };

  // Add useEffect to reset animation after it completes
  useEffect(() => {
    if (animation === "entering") {
      const timer = setTimeout(() => {
        setAnimation(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  // Modify the completion screen to include a button to show unknown words
  // and the list of unknown words when toggled

  // Replace the completion screen return statement with this updated version
  if (isCompleted) {
    // Get the actual unknown word objects based on their IDs
    const unknownWordsList = words.filter((word) =>
      unknownWords.includes(word.id)
    );

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Dokončeno!</h2>
        {unknownWords.length > 0 ? (
          <>
            <p className="mb-2">Správně: {knownWords.length}</p>
            <p className="mb-4">Špatně: {unknownWords.length}</p>
          </>
        ) : (
          <p className="mb-4">Parádní výkon! Jen tak dál. 😎</p>
        )}

        <div className="flex gap-4 mb-6">
          <Button variant="outline" onClick={() => router.push("/")}>
            Menu
          </Button>
          {unknownWords.length > 0 && (
            <Button onClick={resetLearning} className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Pokračovat
            </Button>
          )}
        </div>

        {unknownWordsList.length > 0 && (
          <div className="w-full max-w-md mt-4 border rounded-lg p-4 bg-muted/20">
            <h3 className="text-lg font-semibold mb-2">
              Slovíčka na procvičení
            </h3>
            <div className="grid gap-2">
              {unknownWordsList.map((word) => (
                <div
                  key={word.id}
                  className="flex justify-between p-2 border-b last:border-0"
                >
                  <span className="font-medium">{word.term}</span>
                  <span className="text-muted-foreground">
                    {word.translation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        onClick={() => setShowExample(!showExample)}
        className="self-end mb-2"
        variant="secondary"
      >
        Příklad{" "}
        {showExample ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
      {/* Progress indicator */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-center mb-2 text-2xl font-bold">
          <span>
            {words.length - remainingWords} / {words.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{
              width: `${
                ((words.length - remainingWords) / words.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {showExample && (
        <Card className="p-2 w-full max-w-md text-center mb-4">
          {words[currentIndex].example}
        </Card>
      )}
      {/* Card */}
      <div className="w-full max-w-md h-64 mb-6 relative">
        {/* Only render the card if showCard is true */}
        {showCard && (
          <div
            className="w-full h-full"
            style={{
              ...(animation === "entering"
                ? {
                    animation: "card-enter 0.3s ease-out",
                  }
                : animation === "exiting-right"
                ? {
                    animation: "card-exit-right 0.3s ease-in forwards",
                  }
                : animation === "exiting-left"
                ? {
                    animation: "card-exit-left 0.3s ease-in forwards",
                  }
                : {}),
            }}
          >
            {/* Flip container */}
            <div
              className="w-full h-full transition-all duration-500"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front of card (term) */}
              <Card
                className="absolute w-full h-full cursor-pointer flex flex-col items-center justify-center p-6 backface-hidden shadow-lg border-2 hover:border-primary/20"
                onClick={flipCard}
              >
                <h2 className="text-3xl font-bold mb-4">{currentWord.term}</h2>
                <p className="text-muted-foreground">Otočit kliknutím</p>
                <div className="absolute top-4 right-4"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <SpeakButton text={currentWord.term} lang="en-US" />
                </div>
              </Card>

              {/* Back of card (translation) */}
              <Card
                className="absolute w-full h-full cursor-pointer flex flex-col items-center justify-center p-6 backface-hidden shadow-lg border-2 hover:border-primary/20"
                style={{
                  transform: "rotateY(180deg)",
                }}
                onClick={flipCard}
              >
                <h2 className="text-3xl font-bold mb-4">
                  {currentWord.translation}
                </h2>
                <p className="text-muted-foreground">Otočit kliknutím</p>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Controls - always visible */}
      <div className="flex gap-4">
        <Button
          size="lg"
          disabled={isAnimating}
          variant="destructive"
          className="flex items-center gap-2"
          onClick={markAsUnknown}
        >
          <X className="h-4 w-4" />
          Nevím
        </Button>
        <Button
          size="lg"
          disabled={isAnimating}
          className="flex items-center gap-2"
          onClick={markAsKnown}
        >
          <Check className="h-4 w-4" />
          Znám
        </Button>
      </div>
    </div>
  );
}
