import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Container, Typography } from "@mui/material";
import {
  QuizTypes,
  getQuizByAdmin,
  getQuizBySubject,
} from "../../utils/quizActions";
import QuizItem from "../../components/quiz/QuizItem";
import QuizDialog from "../../components/quiz/QuizDialog";
import { useUpdateQuiz } from "../../store/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const { type, subject } = useParams();
  const runUpdate = useUpdateQuiz();
  useEffect(() => {
    getQuiz();
  }, [runUpdate, subject]);
  const getQuiz = async () => {
    setLoading(true);
    try {
      const res = await getQuizByAdmin();
      if (subject == undefined) {
        setQuizzes(res);
        setLoading(false);
        return;
      }
      const filteredQ = res.filter(filteredQuiz);
      setQuizzes(filteredQ);
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      setQuizzes([]);
      console.log(error);
    }
  };
  const filteredQuiz = (quizzes: QuizTypes) => {
    return quizzes.Subject.toLowerCase() == subject?.toLowerCase();
  };
  const [quizzes, setQuizzes] = useState<QuizTypes[]>([
    { Title: "", Subject: "", Admin: "", _id: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const adminId = localStorage.getItem("user");
  return (
    <div
      className="relative flex h-[calc(100vh-64px)]
    flex-col overflow-hidden lg:flex-row
    "
    >
      <SideBar />
      <Container
        component={"section"}
        maxWidth="md"
        sx={{ py: 10, mx: "auto", height: "100%", overflow: "auto" }}
        className="w-auto"
      >
        <section className=" flex flex-col items-center justify-center gap-4  pt-10">
          <>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              No Quiz Found !
            </Typography>
            <QuizDialog type="add" adminId={adminId ? adminId : ""} />
          </>
          {quizzes.length !== 0 && (
            <div className=" flex h-full w-full flex-col items-center justify-center gap-2">
              {loading ? (
                <div className=" flex h-full w-full items-center justify-center">
                  <CircularProgress />
                </div>
              ) : (
                quizzes.map((quiz, i) => (
                  <QuizItem
                    questions={quiz.questions}
                    key={i}
                    Title={quiz.Title}
                    Subject={quiz.Subject}
                    _id={quiz._id!}
                  />
                ))
              )}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
