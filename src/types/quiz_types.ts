export interface QuizType {
  _id?: string;
  quizTitle: string;
  adminId?: string | {};
  subject: string;
  quizTime: string;
  quizTotalMarks: number;
  questions?: QuestionTypes[];
}
export interface QuestionTypes {
  _id?: string;
  quizId?: string;
  question: string;
  options: string[] | [];
  answerIndex: number;
}

export interface QuizWithAdminTypes extends QuizType {
  adminId: {
    _id: string;
    name: string;
    email: string;
    quiz: QuizType[] | string[];
  };
}

export interface QuizDialogTypes {
  quizId?: string;
  _id?: string;
  type: "add" | "update" | "delete";
}
