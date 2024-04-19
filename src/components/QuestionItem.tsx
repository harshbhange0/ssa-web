import { Typography } from "@mui/material";
import QuestionDialog from "./QuestionDialog";
import { QuestionTypes } from "../types/quiz_types";

export default function QuestionItem({
  question,
  answerIndex,
  options,
  quizId,
  _id,
}: QuestionTypes) {
  return (
    <div
      className="flex w-full flex-col gap-3 border px-5 py-2"
      style={{ textTransform: "capitalize" }}
    >
      <Typography variant="body1" className={quizId}>
        Que: {question}
      </Typography>
      <div className="flex flex-row flex-wrap gap-2">
        <span>Options: </span>
        {options &&
          options.map((_, i) => (
            <div className="flex gap-1" key={i}>
              <span>{i + 1}: </span>
              <span>{_}</span>
            </div>
          ))}
      </div>
      <div>
        <span>Answer: {options[answerIndex]}</span>
      </div>
      <div className="flex w-full justify-between">
        <QuestionDialog type="update" _id={_id} />
        <QuestionDialog type="delete" _id={_id} />
      </div>
    </div>
  );
}
