export interface Answer {
  [category: string]: AnswerData[];
}

export interface AnswerData {
  questionNumber: number;
  answer: number;
  isCorrect: boolean;
}
