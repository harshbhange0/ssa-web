import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Container, Typography } from "@mui/material";
import QuizCard from "../../components/QuizCard";
import QuizItem from "../../components/QuizItem";
import { QuizType } from "../../types/quiz_types";

export default function Quiz() {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);

  return (
    <div className="flex flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ py: 10 }} className="w-auto">
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Quiz
        </Typography>
        <section className=" flex flex-col  justify-center  pt-10">
          {quizzes.length <= 0 ? (
            <QuizCard type="add" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-3  ">
              {quizzes?.map((quiz, i) => (
                <QuizItem
                  quizTime={quiz?.quizTime}
                  _id={quiz?._id!}
                  quizTitle={quiz?.quizTitle}
                  quizTotalMarks={quiz?.quizTotalMarks}
                  subject={quiz?.subject}
                  key={i}
                />
              ))}
              <div className="absolute bottom-10">
                <QuizCard type="add" />
              </div>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
