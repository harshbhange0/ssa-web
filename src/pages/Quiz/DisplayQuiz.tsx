import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../utils/quizActions";

export default function DisplayQuiz() {
  const { _id } = useParams();
  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    if (_id) {
      const res = await getQuizById(_id);
      console.log(res);
    }
  };
  return <div>DisplayQuiz</div>;
}
