import axios from "axios";


const baseUrl = import.meta.env.VITE_BASE_URL;
const getId = () => localStorage.getItem("id");

export const getQuiz = async (): Promise<any> => {
  try {
    const id = getId();
    if (id) {
      const response = await axios.get(
        `${baseUrl}quiz/unsolved/all/admin/quiz/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
  }
};
export interface CreateQuizTypes {
  quizTime: string;
  quizTitle: string;
  quizTotalMarks: number;
  subject: string;
}
export const createQuiz = async ({
  quizTime,
  quizTitle,
  quizTotalMarks,
  subject,
}: CreateQuizTypes) => {
  try {
    const id = getId();
    if (id) {
      const response = await axios.post(
        `${baseUrl}quiz/unsolved/create/quiz`,
        {
          quizTime,
          quizTitle,
          quizTotalMarks,
          subject,
          adminId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );

      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = async (
  { quizTime, quizTitle, quizTotalMarks, subject }: CreateQuizTypes,
  id: string,
) => {
  try {
    if (id) {
      const response = await axios.put(
        `${baseUrl}quiz/unsolved/update/quiz/${id}`,
        {
          quizTime,
          quizTitle,
          quizTotalMarks,
          subject,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getQuizById = async (_id: string) => {
  try {
    const res = await axios.get(`${baseUrl}quiz/unsolved/admin/quiz/${_id}`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuiz = async (id: string) => {
  
  try {
    if (id) {
      const response = await axios.delete(
        `${baseUrl}quiz/unsolved/admin/delete/quiz/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
   
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteQuestion = async (id: string) => {
  try {
    if (id) {
      const response = await axios.delete(
        `${baseUrl}quiz/unsolved/admin/delete/Question/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization"),
          },
        },
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
