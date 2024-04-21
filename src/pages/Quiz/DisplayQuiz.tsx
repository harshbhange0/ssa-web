import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { getOneQuizById } from "../../utils/quizActions";
import { Fragment, useEffect, useState } from "react";
import { QuizItemTypeProps } from "../../types/quiz_types";
import Typography from "@mui/material/Typography";
import QuestionDialog from "../../components/question/QuestionDialog";
import QuestionItem from "../../components/question/QuestionItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useUpdateQuestion } from "../../store/hooks";

export default function DisplayQuiz() {
  const style = {
    p: 3,
    width: "100%",
    borderRadius: 2,
    backgroundColor: "background.paper",
  };
  const { _id } = useParams();
  const [quiz, setQuiz] = useState<QuizItemTypeProps>({
    _id: "",
    Subject: "",
    Title: "",
    questions: [
      {
        _id: "",
        answer: 0,
        options: ["", "", "", ""],
        question: "",
        quizId: "",
      },
    ],
  });
  const updateQuestion = useUpdateQuestion();
  useEffect(() => {
    getOneQuiz();
  }, [updateQuestion]);

  const getOneQuiz = async () => {
    if (_id?.length == 0) {
      return;
    }
    try {
      const res = await getOneQuizById(_id!);
      setQuiz(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      component={"section"}
      maxWidth="md"
      sx={{
        pt: 10,
        pb: 5,
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className="header flex flex-col gap-5 text-start capitalize">
        <Typography variant="h4">Title: {quiz.Title}</Typography>
        <Typography variant="h5">Subject: {quiz.Subject}</Typography>
        <Typography variant="h6">
          Total Question: {quiz.questions?.length}
        </Typography>
      </div>
      <Divider />
      <div className="main">
        <div className="flex w-full items-center justify-center py-4">
          <QuestionDialog type="add" quizId={_id} />
        </div>
        {quiz.questions?.length !== 0 && (
          <List sx={style} aria-label="mailbox folders">
            {quiz.questions?.map((que) => (
              <Fragment key={que._id}>
                <ListItem sx={{ width: "100%" }}>
                  <QuestionItem
                    _id={que._id}
                    answer={que.answer}
                    options={que.options}
                    question={que.question}
                    quizId={_id!}
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
          </List>
        )}
      </div>
    </Container>
  );
}
