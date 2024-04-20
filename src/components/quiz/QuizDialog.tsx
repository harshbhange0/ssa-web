import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CostumeButton } from "../ui/Button";
import { z } from "zod";
import { QuizDialogTypeProps, QuizSchemaZod } from "../../types/quiz_types";
import {
  createQuiz,
  getOneQuizById,
  updateQuizById,
} from "../../utils/quizActions";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { updateQuizAtom } from "../../store/atom";
export default function QuizDialog({
  type,
  adminId,
  quizId,
}: QuizDialogTypeProps) {
  const [open, setOpen] = useState(false);
  const [quiz, setQuiz] = useState({ Title: "", Subject: "", Admin: "" });
  const [updateQuiz, setUpdateQuiz] = useRecoilState(updateQuizAtom);

  const handleClickOpen = async () => {
    setOpen(true);
    if (type == "update") {
      const res = await getOneQuizById(quizId!);
      console.log(res);
      return setQuiz(res);
    }
  };
  const handleClose = () => {
    setQuiz({ Title: "", Subject: "", Admin: "" });
    setOpen(false);
  };

  const betterZodError = (error: z.ZodError<any>) => {
    error.errors.forEach((err: any) => {
      console.log(err);
      toast.warn(` ${err.message} ${err.path[0]} `);
    });
  };
  return (
    <React.Fragment>
      <CostumeButton onClick={handleClickOpen}>{type} Quiz </CostumeButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
              if (type == "add") {
                if (adminId && adminId?.length > 0) {
                  const out = QuizSchemaZod.safeParse(quiz);
                  if (!out.success) {
                    betterZodError(out.error);
                    return;
                  }
                  const res = await createQuiz({
                    Title: quiz.Title,
                    Subject: quiz.Subject,
                    Admin: adminId,
                  });
                  toast.success(res);
                  setQuiz({ Title: "", Subject: "", Admin: "" });
                  handleClose();
                  setUpdateQuiz(!updateQuiz);
                  return;
                }
              }
              if (type == "update") {
                if (quizId && quizId?.length > 0) {
                  const res = await updateQuizById(quizId, quiz);
                  toast.success(res);
                  setQuiz({ Title: "", Subject: "", Admin: "" });
                  handleClose();
                  setUpdateQuiz(!updateQuiz);
                  return;
                }
              }
            } catch (error) {
              console.log(error);
              toast.error("something went wrong in " + { type });
              return handleClose();
            }

            handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {type} Quiz
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Title"
            name="Title"
            label="Quiz Title"
            type="text"
            fullWidth
            variant="standard"
            value={quiz.Title}
            onChange={(e) => {
              setQuiz({ ...quiz, Title: e.target.value });
            }}
          />
          <TextField
            required
            margin="dense"
            id="Subject"
            name="Subject"
            label="Quiz Subject"
            type="text"
            fullWidth
            variant="standard"
            value={quiz.Subject}
            onChange={(e) => {
              setQuiz({ ...quiz, Subject: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <CostumeButton onClick={handleClose}>Cancel</CostumeButton>
          <CostumeButton type="submit">{type}</CostumeButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}