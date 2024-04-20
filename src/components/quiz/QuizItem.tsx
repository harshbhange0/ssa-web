
import { QuizItemTypeProps } from "../../types/quiz_types";
import { CostumeButton } from "../ui/Button";
import { deleteQuizById } from "../../utils/quizActions";
import { toast } from "react-toastify";
import QuizDialog from "./QuizDialog";
import { useRecoilState } from "recoil";
import { updateQuizAtom } from "../../store/atom";


export default function QuizItem({
  Title,
  Subject,
  _id,
  questions,
}: QuizItemTypeProps) {
  const [updateQuiz, setUpdateQuiz] = useRecoilState(updateQuizAtom);
  return  (
    <div className="grid grid-cols-2 place-items-center gap-1 border px-2 py-3 sm:grid-cols-4 sm:gap-3">
      <span className="line-clamp-1 w-[200px] max-w-full	">{Title}</span>
      <span className="w-[200px] max-w-full">{Subject}</span>
      <span className="w-[200px] max-w-full">
        Total Que: {questions?.length}
      </span>

      <div className="flex items-center  justify-between gap-2 lg:w-full">
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
