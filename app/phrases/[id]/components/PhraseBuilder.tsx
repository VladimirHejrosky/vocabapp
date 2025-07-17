"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { speakText } from "@/lib/functions/speak";
import type { Phrase } from "@/lib/json/json-types";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCw, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useState } from "react";
import PhrasesComplete from "./PhrasesComplete";

type MuteBoolean = "false" | "true";
interface PhraseBuilderProps {
  exercises: Phrase[];
}

export default function PhraseBuilder({ exercises }: PhraseBuilderProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [wordPool, setWordPool] = useState<
    Array<{ word: string; isSelected: boolean }>
  >([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [progress, setProgress] = useState(
    (currentExerciseIndex / exercises.length) * 100
  );
  const [mute, setMute] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mute") as MuteBoolean | undefined;
    if (saved !== null) {
      setMute(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mute", mute ? "true" : "false");
  }, [mute]);

  const toggleMute = () => {
    setMute((prev) => !prev);
  };

  const currentExercise = exercises[currentExerciseIndex];

  // Initialize available words when exercise changes
  useEffect(() => {
    if (currentExercise) {
      // Shuffle the words for more challenge but keep them in fixed positions
      const shuffledWords = [...currentExercise.words].sort(
        () => 0.5 - Math.random()
      );
      setWordPool(shuffledWords.map((word) => ({ word, isSelected: false })));
      setSelectedWords([]);
      setIsCorrect(null);
    }
  }, [currentExercise]);

  const handleWordClick = (word: string, index: number) => {
    if (isCorrect !== null) return; // Don't allow changes after checking
    if (!mute) {
      speakText(word.toLocaleLowerCase());
    }
    // Mark the word as selected
    const newWordPool = [...wordPool];
    newWordPool[index].isSelected = true;
    setWordPool(newWordPool);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedWordClick = (index: number) => {
    if (isCorrect !== null) return; // Don't allow changes after checking

    // Remove from selected and mark as available in the pool
    const word = selectedWords[index];
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);

    // Find the word in the pool and mark it as not selected
    const newWordPool = [...wordPool];
    const poolIndex = newWordPool.findIndex(
      (item) => item.word === word && item.isSelected
    );
    if (poolIndex !== -1) {
      newWordPool[poolIndex].isSelected = false;
    }
    setWordPool(newWordPool);
  };

  const checkAnswer = () => {
    const userTranslation = selectedWords.join(" ").toLowerCase();
    const correct =
      userTranslation === currentExercise.originalPhrase.toLowerCase().replace(".", "") || userTranslation === currentExercise.originalPhrase.toLowerCase().replace("?", "") || userTranslation === currentExercise.originalPhrase.toLowerCase().replace("¿", "");

    setIsCorrect(correct);
    setProgress(((currentExerciseIndex + 1) / exercises.length) * 100);
    if (correct) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsCorrect(null);
    } else {
      setCompleted(true);
    }
  };

  const resetExercise = () => {
    // Reset selection status but keep positions
    setWordPool(wordPool.map((item) => ({ ...item, isSelected: false })));
    setSelectedWords([]);
    setIsCorrect(null);
    setCompleted(false);
  };

  const handleRepeat = () => {
    setCurrentExerciseIndex(0);
    setSelectedWords([]);
    setWordPool([]);
    setIsCorrect(null);
    setCompleted(false);
    setCorrectCount(0);
    setProgress(0);
  };

  if (completed) {
    return (
      <PhrasesComplete
        onRestart={handleRepeat}
        total={exercises.length}
        score={correctCount}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-2">
        <div className="flex relative justify-center mb-2 text-2xl font-bold w-full">
          <div className="text-center">
            {currentExerciseIndex + 1} / {exercises.length}
          </div>
          <Button
            onClick={toggleMute}
            variant="outline"
            size="icon"
            className="absolute right-0"
          >
            {mute ? <VolumeOff /> : <Volume2 />}
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-4 gap-2">
        <p className="text-2xl text-center py-2">{currentExercise.czPhrase}</p>

        {/* Selected words area */}
        <div
          className={cn(
            "min-h-14 p-2 border-2 border-dashed rounded-lg flex flex-wrap gap-2 items-start",
            isCorrect === true
              ? "border-success"
              : isCorrect === false
              ? "border-destructive"
              : ""
          )}
        >
          {selectedWords.length === 0 ? (
            <p className="text-muted-foreground w-full place-self-center text-center">
              Sestav větu kliknutím na slova
            </p>
          ) : (
            selectedWords.map((word, index) => (
              <Button
                key={`selected-${index}`}
                variant="secondary"
                className="h-10"
                onClick={() => handleSelectedWordClick(index)}
                disabled={isCorrect !== null}
              >
                {word.toLocaleLowerCase()}
              </Button>
            ))
          )}
        </div>
        {isCorrect === false && (
          <div className="mb-2 p-2 border-2 border-success border-dashed rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">
              Správný překlad:
            </p>
            <p className="text-md">{currentExercise.originalPhrase}</p>
          </div>
        )}

        {/* Available words */}
        <div className="flex flex-wrap p-2 gap-2 my-6">
          {wordPool.map((item, index) => (
            <Button
              key={`word-slot-${index}`}
              variant="outline"
              className={`h-10 ${
                item.isSelected && "invisible transition-none duration-0"
              }`}
              onClick={() => handleWordClick(item.word, index)}
              disabled={isCorrect !== null || item.isSelected}
            >
              {item.word.toLocaleLowerCase()}
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={resetExercise}
            disabled={isCorrect !== null || selectedWords.length === 0}
          >
            <RotateCw className="h-4 w-4" />
            Reset
          </Button>

          {isCorrect === null ? (
            <Button onClick={checkAnswer} disabled={selectedWords.length === 0}>
              Zkontrolovat
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentExerciseIndex < exercises.length - 1
                ? "Další"
                : "Dokončit"}
              {currentExerciseIndex < exercises.length - 1 && (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
