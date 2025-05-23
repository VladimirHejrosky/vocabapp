"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, RotateCw, ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
  id: string;
  onRestart: () => void;
}

export default function QuizComplete({
  score,
  totalQuestions,
  id,
  onRestart,
}: QuizCompleteProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const router = useRouter();

  let message = "Parádní výkon!";
  let color = "text-green-500";

  if (percentage < 50) {
    message = "Chtělo by to ještě trénovat!";
    color = "text-red-500";
  } else if (percentage < 80) {
    message = "Dobrý pokus!";
    color = "text-yellow-500";
  }

  return (
    <Card className="w-full max-w-3xl mx-auto gap-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Kvíz dokončen!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ${color} opacity-10`}
          ></div>
          <Trophy className={`h-16 w-16 ${color}`} />
        </div>

        <div className="text-center">
          <h3 className={`text-2xl font-bold ${color} mb-2`}>{message}</h3>
          <p className="text-4xl font-bold mb-2">
            {score} / {totalQuestions}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 w-full justify-around">
        <Button
          variant="secondary"
          className="flex items-center gap-2 flex-1 w-full"
          onClick={() => {
            router.push("/grammar");
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět
        </Button>
        {percentage < 50 && (
          <Button
            variant="outline"
            className="flex items-center gap-2 flex-1 w-full"
            onClick={() => router.push(`/grammar/theory/${id}`)}
          >
            <Info className="h-4 w-4" />
            Teorie
          </Button>
        )}
        <Button className="flex items-center gap-2 flex-1 w-full" onClick={onRestart}>
          <RotateCw className="h-4 w-4" />
          Zkusit znovu
        </Button>
      </CardFooter>
    </Card>
  );
}
