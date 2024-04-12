import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { Button, Container } from "@mui/material";

import { data } from "../../../data";
import QuizCard from "../../components/QuezCard";

function Quiz() {
  const { subject } = useParams();
  subject && console.log(subject);

  return (
    <div className="flex w-full  flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ pt: 10 }} className="w-auto">
        <div className="flex flex-col justify-center">
          {data.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.quizTitle}
              date={quiz.createdAt}
              subject={quiz.subject}
              quizId={quiz._id}
              questions={quiz.questions}
            />
          ))}
          <Button>Add A Quiz</Button>
        </div>
      </Container>
    </div>
  );
}

export default Quiz;
