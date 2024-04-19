import { useState } from "react";

import { Container, Typography } from "@mui/material";
import QuestionItem from "../../components/QuestionItem";
import QuestionDialog from "../../components/QuestionDialog";
import { QuizType } from "../../types/quiz_types";
export default function DisplayQuiz() {
  const [quiz, setQuiz] = useState<QuizType>({
    quizTime: "",
    quizTitle: "",
    questions: [
      { answerIndex: 0, options: [], question: "", _id: "", quizId: "" },
    ],
    quizTotalMarks: 0,
    subject: "",
    _id: "",
  });

  return (
    <Container
      component={"section"}
      maxWidth="md"
      sx={{
        pt: 10,
        pb: 5,
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className="header flex flex-col items-center justify-center gap-5 text-center">
        <Typography variant="h3">{quiz.quizTitle}</Typography>
        <div className="flex items-center justify-evenly gap-5">
          <Typography variant="h6">Subject: {quiz.subject}</Typography>
          <Typography variant="h6">
            Total Mark: {quiz.quizTotalMarks}
          </Typography>
          <Typography variant="h6">Time: {quiz.quizTime}</Typography>
        </div>
      </div>
      <div className="main">
        {quiz.questions?.length && quiz.questions?.length > 0 ? (
          <div className="flex flex-col  gap-4">
            {quiz.questions.map((ques, i) => (
              <QuestionItem
                question={ques.question}
                options={ques.options}
                answerIndex={ques.answerIndex}
                quizId={ques.quizId}
                _id={ques._id}
                key={i}
              />
            ))}
          </div>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            This Quiz Don't Have Any Question Add Question
          </Typography>
        )}
      </div>
      <div className="absolute bottom-0 right-[50%] translate-x-[50%] transform">
        <QuestionDialog type="add" />
      </div>
    </Container>
  );
}
