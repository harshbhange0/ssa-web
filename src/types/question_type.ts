export interface QuestionType {
  question: string;
  options: string[];
  answer: number;
  quizId?: string;
  _id?: string;
}

export interface QuestionDialogTypeProps {
  type: "add" | "update";
  quizId?: string;
  questionId?: string;
}
