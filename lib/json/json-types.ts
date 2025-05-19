export interface QuizQuestion {
  question: string
  answers: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  theory?: Theory[]
}

interface Theory {
  title: string
  description: string
  examples: string[]
}

export interface PhraseExercise {
  id: string
  title: string
  phrases: Phrase[]
}

export interface Phrase {
  czPhrase: string
  words: string[]
  originalPhrase: string
}

export interface PhraseList {
  id: string,
  title: string,
}