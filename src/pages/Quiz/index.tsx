import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz } from "../../utils/quizActions";
import QuizCard from "../../components/QuizCard";
import QuizItem, { QuizItemProps } from "../../components/QuizItem";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";


export default function Quiz() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const auth = localStorage.getItem("authorization");
    if (!auth) {
      navigate("/auth/admin/sign-up");
    }
    return setLoading(false);
  }, []);
  const { subject } = useParams();
  useEffect(() => {
    getAllQuiz();
  }, []);

  const [quizzes, setQuizzes] = useState<QuizItemProps[]>([]);
  const getAllQuiz = async () => {
    setLoading(true);
    const res = await getQuiz();
    setQuizzes(res.data);
    setLoading(false);
  };
  return loading ? (
    "loading"
  ) : (
    <div className="flex flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ py: 10 }} className="w-auto">
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Quiz
        </Typography>
        <section className=" flex flex-col  justify-center pt-10">
          {quizzes.length <= 0 ? (
            <QuizCard type="add" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-3  ">
              {quizzes?.map((quiz, i) => (
                <QuizItem
                  quizTime={quiz?.quizTime}
                  _id={quiz?._id}
                  quizTitle={quiz?.quizTitle}
                  quizTotalMarks={quiz?.quizTotalMarks}
                  subject={quiz?.subject}
                  key={i}
                />
              ))}
              <div className="absolute bottom-10">
                <QuizCard type="add"  />
              </div>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
