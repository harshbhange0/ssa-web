import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CreateQuizTypes,
  createQuiz,
  getQuizById,
  updateQuiz,
} from "../utils/quizActions";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { CostumeButton } from "./ui/Button";

export default function QuizDialog({
  type,
  _id,
}: {
  _id?: string;
  type: "add" | "update" | "delete";
}) {
  useEffect(() => {
    if (_id) {
      getQuiz();
    }
  }, []);
  const [quiz, setQuiz] = useState<CreateQuizTypes>({
    quizTime: "",
    quizTitle: "",
    quizTotalMarks: 0,
    subject: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getQuiz = async () => {
    try {
      if (_id) {
        const res = await getQuizById(_id!);
        const { quizTime, quizTitle, quizTotalMarks, subject } = res.data;
        setQuiz({ quizTime, quizTitle, quizTotalMarks, subject });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const OnAddNewQuiz = async () => {
    try {
      const res = await createQuiz(quiz);
      localStorage.setItem("quizId", res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const OnUpdate = async () => {
    try {
      if (_id) {
        const res = await updateQuiz(quiz, _id);
        localStorage.setItem("quizId", res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CostumeButton
        sx={{
          color: "#000",
          textTransform: "capitalize",
          fontSize: "12px",
          fontWeight: "400",
        }}
        startIcon={
          type == "add" ? (
            <AddCircleOutlineIcon />
          ) : type == "delete" ? (
            <DeleteIcon />
          ) : (
            <SystemUpdateAltOutlinedIcon />
          )
        }
        onClick={handleClickOpen}
      >
        {type} Quiz
      </CostumeButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (type == "add") {
              OnAddNewQuiz();
              return handleClose();
            }
            if (type == "update") {
              OnUpdate();
              return handleClose();
            }
            return handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {type} Quiz
        </DialogTitle>
        <DialogContent sx={{ textTransform: "capitalize" }}>
          <DialogContentText>
            {type == "delete" ? (
              <Typography className="text-red-500">
                Do You Want DELETE This Quiz
              </Typography>
            ) : (
              <Typography>
                To {type} Quiz please fill the form below.
              </Typography>
            )}
          </DialogContentText>
          {type == "add" && "update" && (
            <>
              <TextField
                value={quiz.quizTitle}
                onChange={(e) => {
                  setQuiz({ ...quiz, quizTitle: e.target.value });
                }}
                autoFocus
                autoComplete="off"
                required
                margin="dense"
                id="Title"
                name="quizTitle"
                label="Quiz Title"
                type="text"
                fullWidth
                variant="standard"
              />

              <div className="flex flex-row  items-baseline gap-2">
                <TextField
                  value={quiz.subject}
                  onChange={(e) => {
                    setQuiz({ ...quiz, subject: e.target.value });
                  }}
                  autoComplete="off"
                  required
                  margin="dense"
                  id="subject"
                  name="quizSubject"
                  label="Quiz Subject"
                  type="text"
                  variant="standard"
                />
                <TextField
                  value={quiz.quizTotalMarks}
                  onChange={(e) => {
                    setQuiz({
                      ...quiz,
                      quizTotalMarks: parseInt(e.target.value),
                    });
                  }}
                  autoComplete="off"
                  required
                  margin="dense"
                  id="QuizTotalMarks"
                  name="quizTotalMarks"
                  label="Quiz Total Marks"
                  type="number"
                  variant="standard"
                />
                <div className="h-full ">
                  <input
                    className="MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input "
                    value={quiz.quizTime}
                    onChange={(e) => {
                      setQuiz({ ...quiz, quizTime: e.target.value });
                    }}
                    required
                    id="QuizDate"
                    name="quizTime"
                    type="date"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <CostumeButton
            sx={{ fontSize: "12px", fontWeight: "400", color: "#000" }}
            onClick={handleClose}
            startIcon={<NotInterestedIcon />}
          >
            Cancel
          </CostumeButton>
          <CostumeButton
            startIcon={
              type == "delete" ? (
                <DeleteIcon />
              ) : (
                <SystemUpdateAltOutlinedIcon />
              )
            }
            
            type="submit"
          >
            {type}
          </CostumeButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
