import SubNav from "@/app/components/SubNav";
import { getRandomItems } from "@/lib/functions/array-functions";
import { getGrammarById } from "@/lib/json/json-actions";
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
  

 const questions = getRandomItems(quiz.questions, 10)

  return (
    <div className="container mx-auto px-4">
      <SubNav name="Gramatický kvíz" description={quiz.title} returnPath="/grammar" />
      <Quiz id={quiz.id} questions={questions} />
    </div>
  );
}
