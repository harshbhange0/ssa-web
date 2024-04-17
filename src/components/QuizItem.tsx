
import { CreateQuizTypes } from "../utils/quizActions";
import { Link } from "react-router-dom";

import QuizDialog from "./QuizDialog";
export interface QuizItemProps extends CreateQuizTypes {
  _id: string;
}

export default function QuizItem({
  _id,
  quizTime,
  quizTitle,
  quizTotalMarks,
  subject,
}: QuizItemProps) {
  return (
    <div className="quiz_item flex w-[60%] flex-col items-center justify-between gap-2 rounded-md px-4 py-2  shadow">
      <Link to={`/admin/quiz/full/${_id}`} className="w-full">
        <div className="flex w-full justify-between gap-x-10 border-b px-2">
          <span>{quizTitle}</span>
          <span>{subject}</span>
        </div>
      </Link>
      <div className=" grid grid-cols-2 gap-4">
        <QuizDialog type="update" _id={_id} />
        <QuizDialog type="delete" _id={_id} />
      </div>
    </div>
  );
}
