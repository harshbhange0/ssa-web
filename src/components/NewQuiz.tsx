import { Button, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import BootStrapInput from "./BootStrapInput";
import { toast } from "react-toastify";
import { NewQuizType } from "../types/quiz_types";

export default function NewQuiz() {
  const [newQuiz, setNewQuiz] = useState<NewQuizType>({
    quizTitle: "",
    adminId: localStorage.getItem("id") || "",
    subject: "",
    quizTotalMarks: 0,
  });
  const [qTimeAndDate, setQuizTimeAndDate] = useState({ time: "", date: "" });
  const createQuiz = async () => {
    if (
      newQuiz.quizTitle == "" ||
      newQuiz.subject == "" ||
      newQuiz.quizTotalMarks == 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}quiz/unsolved/create/quiz`,
        {
          quizTitle: newQuiz.quizTitle,
          adminId: newQuiz.adminId,
          subject: newQuiz.subject,
          quizTotalMarks: newQuiz.quizTotalMarks,
          quizTime: qTimeAndDate.date + qTimeAndDate.time,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      if (res.data) {
        toast.success(res.data.msg);
        localStorage.setItem("quizId", res.data.data);
        setNewQuiz({
          quizTitle: "",
          adminId: "",
          subject: "",
          quizTotalMarks: 0,
        });
        setQuizTimeAndDate({ time: "", date: "" });
      }
    } catch (error) {
      setNewQuiz({
        quizTitle: "",
        adminId: "",
        subject: "",
        quizTotalMarks: 0,
      });
      setQuizTimeAndDate({ time: "", date: "" });
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth={"md"}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: ".1rem solid #ccc",
        p: 1,
        mb: 3,
        gap: "1rem",
      }}
      component={"section"}
    >
      <BootStrapInput
        type="text"
        label={"Quiz Title"}
        value={newQuiz.quizTitle}
        setValue={(e) => setNewQuiz({ ...newQuiz, quizTitle: e.target.value })}
      />{" "}
      <BootStrapInput
        type="text"
        label={"Quiz Subject"}
        value={newQuiz.subject}
        setValue={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
      />
      <div className="flex items-center justify-center gap-4">
        <BootStrapInput
          type="date"
          label={"Quiz Start Date"}
          value={qTimeAndDate.date}
          setValue={(e) =>
            setQuizTimeAndDate({ ...qTimeAndDate, date: e.target.value })
          }
        />
        <BootStrapInput
          type="time"
          label={"Quiz Start Time"}
          value={qTimeAndDate.time}
          setValue={(e) =>
            setQuizTimeAndDate({ ...qTimeAndDate, time: e.target.value })
          }
        />
        <BootStrapInput
          type="number"
          label={"Quiz Total Mark"}
          value={newQuiz.quizTotalMarks}
          setValue={(e) =>
            setNewQuiz({ ...newQuiz, quizTotalMarks: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <Button onClick={createQuiz}>Add Quiz</Button>
      </div>
    </Container>
  );
}
