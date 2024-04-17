import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getQuiz } from "../../utils/quizActions";
import QuizCard from "../../components/QuizCard";
import QuizItem, { QuizItemProps } from "../../components/QuizItem";
import { useUpdateQuiz } from "../../store/hooks";

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
  // const { subject } = useParams();
  const run = useUpdateQuiz();
  useEffect(() => {
    getAllQuiz();
  }, [run]);
  useEffect(() => {
    getAllQuiz();
  }, []);
  const [quizzes, setQuizzes] = useState<QuizItemProps[]>([]);
  
  
  const getAllQuiz = async () => {
    setLoading(true);
    const res = await getQuiz();
    setQuizzes(res.data);
    console.log("run");
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
                <QuizCard type="add" />
              </div>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
