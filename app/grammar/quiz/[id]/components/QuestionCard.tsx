"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizQuestion } from "@/lib/json/json-types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  answered: boolean;
  isCorrect: boolean;
  showExplanation: boolean;
  onAnswerSelect: (index: number) => void;
  onNext: () => void;
}


export default function QuestionCard({
  question,
  selectedAnswer,
  answered,
  isCorrect,
  showExplanation,
  onAnswerSelect,
  onNext,
}: QuestionCardProps) {

  const [questionStart, questionEnd] = question.question.split("_")
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {questionStart}<span className="text-muted-foreground">__</span>{questionEnd}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              variant="secondary"
              className={cn(
                "justify-start h-auto py-3 px-4 text-left",
                answered
                  ? index === question.correctAnswer
                    ? "bg-success hover:bg-success"
                    : index === selectedAnswer
                    ? "bg-destructive hover:bg-destructive"
                    : "hidden"
                  : ""
              )}
              onClick={() => onAnswerSelect(index)}
              disabled={answered}
            >
              <div className="flex items-center w-full">
                <span className="flex-1">{answer}</span>
                {answered && index === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5" />
                )}
                {answered &&
                  index === selectedAnswer &&
                  index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5" />
                  )}
              </div>
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4 p-2 bg-muted rounded-md">
            <h3 className="font-semibold text-sm">Vysvětlení:</h3>
            <p className="text-muted-foreground text-md italic">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {answered && (
          <>
            <div>
              {isCorrect ? (
                <span className="text-success font-bold text-xl">SPRÁVNĚ!</span>
              ) : (
                <span className="text-destructive font-bold text-xl">
                  ŠPATNĚ!
                </span>
              )}
            </div>
            <Button onClick={onNext}>Další otázka</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
