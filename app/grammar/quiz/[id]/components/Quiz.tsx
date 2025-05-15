"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import QuestionCard from "./QuestionCard"
import QuizComplete from "./QuizComplete"
import { QuizQuestion } from "@/lib/json/json-types"


interface QuizProps {
  questions: QuizQuestion[]
  id: string
  onComplete?: (score: number, totalQuestions: number) => void
}

export default function Quiz({ id, questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = (currentQuestionIndex / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return

    const correct = answerIndex === currentQuestion.correctAnswer

    setSelectedAnswer(answerIndex)
    setAnswered(true)
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    } else {
      setShowExplanation(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
      if (onComplete) {
        onComplete(score, questions.length)
      }
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setIsCorrect(false)
    setQuizComplete(true)
    setShowExplanation(false)
  }

  if (quizComplete) {
    return (
      <QuizComplete id={id} score={score} totalQuestions={questions.length} onRestart={handleRestartQuiz} />
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-2">
        <div className="flex justify-center mb-2 text-2xl font-bold">
            {currentQuestionIndex } / {questions.length}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        answered={answered}
        isCorrect={isCorrect}
        showExplanation={showExplanation}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNextQuestion}
      />
    </div>
  )
}
