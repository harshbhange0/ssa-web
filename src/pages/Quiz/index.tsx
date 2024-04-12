
import { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { data } from "../../../data";
import QuizCard from "../../components/QuezCard";

function Quiz() {
  const params = useParams();
  console.log(params?.subject);

  return (
    <div className="flex flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ pt: 10 }} className="w-full">
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
        </div>
      </Container>
    </div>
  );
}

export default Quiz;



