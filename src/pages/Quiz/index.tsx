import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { Button, Container, Typography } from "@mui/material";

import QuizCard from "../../components/QuezCard";
import { useEffect, useState } from "react";
import axios from "axios";
import NewQuiz from "../../components/NewQuiz";
interface QuizQuestionType {
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
interface QuizType {
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

function Quiz() {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [addNewQuiz, setAddNewQuiz] = useState<boolean>(false);

  const { subject } = useParams();
  subject && console.log(subject);
  const getQuiz = async () => {
    const id = localStorage.getItem("id");
    if (!subject) {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}quiz/unsolved/all/admin/quiz/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      setQuiz(res.data.data);
    }
    console.log(id);
  };

  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <div className="flex w-full  flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ py: 10 }} className="w-auto">
        <div className="flex flex-col justify-center">
          {quiz && addNewQuiz ? (
            <>
              <Typography variant="h4" sx={{textAlign:"center" ,mb:3}} >Add New Quiz</Typography>
              <NewQuiz />
            </>
          ) : (
            quiz?.map((quiz: QuizType) => (
              <QuizCard
                key={quiz._id}
                title={quiz.quizTitle}
                date={quiz.createdAt}
                subject={quiz.subject}
                quizId={quiz._id}
                questions={quiz.questions}
              />
            ))
          )}

          <Button onClick={() => setAddNewQuiz(!addNewQuiz)}>
            {!addNewQuiz ? "Add A Quiz" : "Cancel"}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Quiz;
