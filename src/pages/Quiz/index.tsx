import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Container, Typography } from "@mui/material";
import { QuizTypes, getQuizByAdmin } from "../../utils/quizActions";
import QuizItem from "../../components/quiz/QuizItem";
import QuizDialog from "../../components/quiz/QuizDialog";
import { useUpdateQuiz } from "../../store/hooks";
import Skeleton from "@mui/material/Skeleton";

export default function Quiz() {
  const runUpdate = useUpdateQuiz();
  useEffect(() => {
    console.log("reun");
    getQuiz();
  }, [runUpdate]);
  const getQuiz = async () => {
    setLoading(true);
    try {
      const res = await getQuizByAdmin();
      setQuizzes(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setQuizzes([]);
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizTypes[]>([
    { Title: "", Subject: "", Admin: "", _id: "" },
  ]);
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
        <div className="relative w-full ">
          <Typography sx={{ textAlign: "center" }} variant="h3">
            Quiz
          </Typography>{" "}
          <div className=" absolute right-10 top-1/2 -translate-y-1/2 transform">
            <QuizDialog type="add" adminId={adminId ? adminId : ""} />
          </div>
        </div>
        <section className=" flex flex-col items-center justify-center gap-4  pt-10">
          {quizzes.length !== 0 ? (
            <div className=" flex h-full w-full flex-col items-center justify-center gap-2">
              {loading ? (
                <>
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                  <Skeleton variant="rounded" width={"100%"} height={59} />
                </>
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
          ) : (
            <>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                No Quiz Found !
              </Typography>
              <QuizDialog type="add" adminId={adminId ? adminId : ""} />
            </>
          )}
        </section>
      </Container>
    </div>
  );
}
