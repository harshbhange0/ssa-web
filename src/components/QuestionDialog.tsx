import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CostumeButton } from "./ui/Button";
import { Typography } from "@mui/material";
import { QuestionTypes, QuizDialogTypes } from "../types/quiz_types";
export default function QuestionDialog({ type, quizId, _id }: QuizDialogTypes) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    if (type == "update") {
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [que, setQue] = useState<QuestionTypes>({
    question: "",
    options: ["", "", "", ""],
    answerIndex: 1,
    quizId: "",
    _id: "",
  });

  const handleOptionChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setQue((prevQue) => ({
        ...prevQue,
        options: prevQue.options.map((option, i) =>
          i === index ? event.target.value : option,
        ),
      }));
    };
  return (
    <React.Fragment>
      <CostumeButton onClick={handleClickOpen}>{type} Question</CostumeButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            return handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {type} Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"}>
            To Add Question fill Form below
            <Typography sx={{ fontSize: "12px" }}>
              <span className="text-red-600">
                Note: At Correct Answer Number
              </span>
              <br />
              <span className="text-red-600">
                Pleas add corresponding Option Number
              </span>
            </Typography>
          </DialogContentText>
          <div className="flex flex-col gap-3">
            <TextField
              autoFocus
              required
              margin="dense"
              name="question"
              label="Question"
              type="text"
              fullWidth
              variant="standard"
              value={que.question}
              onChange={(e) => {
                setQue({ ...que, question: e.target.value });
              }}
            />

            <div className="flex w-full flex-col">
              <span>Options</span>
              <div className="grid w-full grid-cols-2 gap-x-2 ">
                {que.options.map((item, i) => (
                  <TextField
                    key={i}
                    required
                    color={que.answerIndex == i + 1 ? "success" : "primary"}
                    margin="dense"
                    name={"op" + i + 1}
                    label={i + 1}
                    type="text"
                    variant="standard"
                    focused
                    value={item}
                    onChange={handleOptionChange(i)}
                  />
                ))}
              </div>
            </div>
            <TextField
              autoFocus
              required
              margin="dense"
              name="Answer"
              label="Correct Answer Number"
              type="number"
              fullWidth
              variant="standard"
              color={
                que.options.length + 1 > que.answerIndex ? "success" : "error"
              }
              value={que.answerIndex}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > que.options.length) {
                  return;
                }
                setQue({ ...que, answerIndex: val });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <CostumeButton onClick={handleClose}>Cancel</CostumeButton>
          <CostumeButton type="submit">{type}</CostumeButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
