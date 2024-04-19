import axios from "axios";
import { CreateQuizTypes } from "./quizActions";
import { QuestionTypes } from "../types/quiz_types";


const baseUrl = import.meta.env.VITE_BASE_URL + "quiz/unsolved";
// {
//           headers: {
//             Authorization: localStorage.getItem("authorization"),
//           },
// },
export const createQuestion = async (data: QuestionTypes) => {
  try {
    const response = await axios.post(
      `${baseUrl}/create/question`,
      { ...data },
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getQuestionById = async (_id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/admin/quiz/question/${_id}`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
