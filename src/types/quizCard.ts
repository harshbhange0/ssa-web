export interface QuizQuestionType {
  _id: string;
  question: string;
  options: string[];
  answerIndex: number;
  quizId: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}
[];
export interface QuizType {
  _id: string;
  quizTitle: string;
  adminId: string;
  subject: string;
  quizTotalMarks: number;
  questions: QuizQuestionType[];
  quizTime: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}
[];
