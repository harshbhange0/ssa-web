import { toast } from "react-toastify";
import { QuestionType } from "../../types/question_type";
import { deleteQuestionById } from "../../utils/questionActions";
import { CostumeButton } from "../ui/Button";
import QuestionDialog from "./QuestionDialog";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { updateQuestionAtom } from "../../store/atom";

const style = {
  textTransform: "capitalize",
  display: "flex",
  flexDirection: "row",
  gap: 2,
};
export default function QuestionItem({
  _id,
  question,
  options,
  answer,
}: QuestionType) {
  const [update, setUpdate] = useRecoilState(updateQuestionAtom);
  return (
    <div className="flex w-full flex-col gap-y-4 ps-2">
      <Typography sx={style} variant="h5">
        <span>Que: </span>
        <span>{question}</span>
      </Typography>
      <Typography
        sx={{ ...style, fontSize: "16px", flexWrap: "wrap" }}
        variant="h6"
      >
        <span>Options: </span>
        {options.map((o, i) => (
          <span className={answer == i ? "text-green-800" : ""} key={i}>
            {i + 1}. {o}
          </span>
        ))}
      </Typography>
      <Typography
        sx={{ ...style, fontSize: "16px", flexWrap: "wrap" }}
        variant="h6"
      >
        <span>
          Answer: {answer + 1}. {options[answer]}
        </span>
      </Typography>
      <div className=" flex w-full items-center justify-around">
        <CostumeButton
          onClick={async () => {
            try {
              const res = await deleteQuestionById(_id!);
              toast.success(res);
              setUpdate(!update);
              return;
            } catch (error: any) {
              toast.error(error.toString());
            }
          }}
        >
          Delete
        </CostumeButton>
        <QuestionDialog type="update" questionId={_id} />
      </div>
    </div>
  );
}
