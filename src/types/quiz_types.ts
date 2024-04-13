export interface QuizProps {
  title: string;
  date: string;
  subject: string;
  quizId?: string;
  questions: QueProps[];
}
export interface QueProps {
  question: string;
  options: string[];
  answerIndex: number;
  _id: string;
}
export interface NewQuizType {
  quizTitle: string;
  adminId: string;
  subject: string;
  quizTotalMarks: number;
}
