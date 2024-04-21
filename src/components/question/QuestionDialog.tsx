import { Fragment } from "react/jsx-runtime";
import { CostumeButton } from "../ui/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  QuestionDialogTypeProps,
  QuestionType,
} from "../../types/question_type";
import {
  createQuestion,
  getOneQuestionById,
  updateQuestionById,
} from "../../utils/questionActions";
import { toast } from "react-toastify";
import { updateQuestionAtom } from "../../store/atom";
import { useRecoilState } from "recoil";

export default function QuestionDialog({
  type,
  questionId,
  quizId,
}: QuestionDialogTypeProps) {
  const [question, setQuestion] = useState<QuestionType>({
    question: "",
    answer: 0,
    options: ["", "", "", ""],
    _id: "",
    quizId: "",
  });
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useRecoilState(updateQuestionAtom);
  const handleClickOpen = async () => {
    if (type == "update") {
      try {
        const res = await getOneQuestionById(questionId!);
        setQuestion(res);
        setUpdate(!update);
        setOpen(true);
        return;
      } catch (error) {
        console.log(error);
      }
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newOptions = [...question.options];
    newOptions[index] = event.target.value;
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <Fragment>
      <CostumeButton onClick={handleClickOpen}>{type} Question</CostumeButton>
      <Dialog
        open={open}
        onClose={handleClose}
        autoCapitalize={"on"}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (type == "add") {
              try {
                const res = await createQuestion(question, quizId!);
                toast.success(res);
                setQuestion({
                  question: "",
                  answer: 0,
                  options: ["", "", "", ""],
                  _id: "",
                  quizId: "",
                });
                setUpdate(!update);
                return handleClose();
              } catch (error: any) {
                toast.warn(error.toString());
              }
            }
            if (type == "update") {
              try {
                const res = await updateQuestionById(question, questionId!);
                toast.success(res);
                setQuestion({
                  question: "",
                  answer: 0,
                  options: ["", "", "", ""],
                  _id: "",
                  quizId: "",
                });
                setUpdate(!update);
                handleClose();
                return;
              } catch (error: any) {
                toast.warn(error.toString());
              }
            }
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {type} Question
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoComplete={"off"}
              autoCapitalize={"on"}
              required
              margin="dense"
              id="question"
              name="question"
              label="Question"
              type="text"
              fullWidth
              variant="standard"
              value={question.question}
              onChange={(e) =>
                setQuestion({ ...question, question: e.target.value })
              }
            />
            <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">
              {question.options.map((item, i) => (
                <TextField
                  autoCapitalize={"on"}
                  autoComplete={"off"}
                  key={i}
                  required
                  className={question.answer == i ? "border" : "border"}
                  margin="dense"
                  id="option"
                  name="option"
                  label={`Option ${i + 1}`}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={item}
                  onChange={(e) => handleOptionChange(e, i)}
                />
              ))}
            </div>{" "}
            <TextField
              autoComplete={"off"}
              required
              margin="dense"
              id="answer"
              name="answer"
              label="Answer"
              type="number"
              fullWidth
              variant="standard"
              value={question.answer}
              helperText={"Use Scroll or keyboard"}
              onChange={(e) => {
                let v = parseInt(e.target.value);
                if (v >= 0 && v <= 3 && e.target.value.length === 1) {
                  return setQuestion({
                    ...question,
                    answer: parseInt(e.target.value),
                  });
                }
                return;
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <CostumeButton onClick={handleClose}>Cancel</CostumeButton>
          <CostumeButton type="submit">{type}</CostumeButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
