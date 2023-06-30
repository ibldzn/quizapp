export interface Question {
  [category: string]: QuestionData[];
}

export interface QuestionData {
  question: string;
  answer: number;
  choices: string[];
  image?: string;
}
