import SubNav from "@/app/components/SubNav";
import { getGrammarById } from "@/lib/json/json-actions";
import type { QuizQuestion } from "@/lib/json/json-types";
import { notFound } from "next/navigation";
import Quiz from "./components/Quiz";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: Props) {
  const { id } = await params;
  const quiz = await getGrammarById(id);

  if (!quiz) {
    notFound();
  }

  const questions: QuizQuestion[] = quiz.questions.map((q) => ({
    question: q.question,
    answers: q.answers,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));

  return (
    <div className="container mx-auto px-4">
      <SubNav name="Gramatický kvíz" description={quiz.title} returnPath="/grammar" />
      <Quiz id={quiz.id} questions={questions} />
    </div>
  );
}
