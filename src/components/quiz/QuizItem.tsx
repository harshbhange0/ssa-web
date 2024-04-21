import { QuizItemTypeProps } from "../../types/quiz_types";
import { CostumeButton } from "../ui/Button";
import { deleteQuizById } from "../../utils/quizActions";
import { toast } from "react-toastify";
import QuizDialog from "./QuizDialog";
import { useRecoilState } from "recoil";
import { updateQuizAtom } from "../../store/atom";
import { Link } from "react-router-dom";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

export default function QuizItem({
  Title,
  Subject,
  _id,
  questions,
}: QuizItemTypeProps) {
  const [updateQuiz, setUpdateQuiz] = useRecoilState(updateQuizAtom);
  const user = localStorage.getItem("userType");
  return (
    <div className="grid grid-cols-2 place-items-center gap-1 border px-2 py-3 sm:grid-cols-4 sm:gap-3 capitalize ">
      <div className="col-span-3 grid grid-cols-4 place-items-center gap-1">
        <span className="line-clamp-1 w-[200px] max-w-full	">{Title}</span>
        <span className="w-[200px] max-w-full">{Subject}</span>
        <span className="w-[200px] max-w-full">
          Total Que: {questions?.length}
        </span>
        <Link to={`/${user}/quiz/full/${_id}`}>
          <InsertLinkIcon className="text-blue-300 hover:text-blue-500" />
        </Link>
      </div>

      <div className="col-span-2 flex  items-center justify-between gap-2 sm:col-span-1 lg:w-full">
        <QuizDialog type="update" quizId={_id} />
        <CostumeButton
          onClick={async () => {
            try {
              const res = await deleteQuizById(_id);
              toast.success(res);
              setUpdateQuiz(!updateQuiz);
            } catch (error: any) {
              console.log(error.massage);
              toast.error("unable to delete Quiz");
            }
          }}
        >
          Delete
        </CostumeButton>
      </div>
    </div>
  );
}
