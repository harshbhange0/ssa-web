import { z } from "zod";
import { QuestionType } from "./question_type";
export interface QuizItemTypeProps {
  Title: string;
  Subject: string;
  _id: string;
  questions?: QuestionType[]|[];
  loading?: boolean;
}
export interface QuizDialogTypeProps {
  type: "add" | "update";
  adminId?: string;
  quizId?: string;
}

export const QuizSchemaZod = z.object({
  Title: z.string().min(4, "To Small To be "),
  Subject: z.string().min(4, "To Small To be "),
});

export const QuizUpdateSchemaZod = z.object({
  Title: z.string().min(5),
  Subject: z.string().min(6),
});
