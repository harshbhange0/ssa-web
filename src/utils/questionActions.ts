import axios from "axios";
import { QuestionType } from "../types/question_type";

const baseUrl = import.meta.env.VITE_BASE_URL + "/question";
const token = localStorage.getItem("Authorization");

export async function createQuestion(data: QuestionType, quizId: string) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(
      baseUrl + "/create",
      { ...data, quizId: quizId },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data.data.message;
  } catch (error: any) {
    throw new Error(error.response.data.data.message);
  }
}
export async function getOneQuestionById(_id: string) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(baseUrl + "/get/one/by/" + _id, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.data;
  }  catch (error: any) {
    throw new Error(error.response.data.data.message);
  }
}
export async function updateQuestionById(data: QuestionType, quizId: string) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.put(
      baseUrl + "/update/" +quizId,
      { ...data },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data.data.message;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong in updateQuizById");
  }
}
export async function deleteQuestionById(_id: string) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.delete(baseUrl + "/delete/" + _id, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.message;
  } catch (error: any) {
    throw new Error(error.response.data.data.message);
  }
}
