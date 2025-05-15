export interface QuizQuestion {
  question: string
  answers: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}
