import axios from "axios";

export interface QuizTypes {
  _id?: string;
  Title: string;
  Admin: string | {};
  Subject: string;
  questions?: [];
}

const baseUrl = import.meta.env.VITE_BASE_URL + "/quiz";
const token = localStorage.getItem("Authorization");

export async function getQuizByAdmin() {
  const id = localStorage.getItem("user");
  try {
    if (!token) {
      throw new Error("No token found");
    }
    if (!id) {
      throw new Error("No User Id found");
    }
    const response = await axios.get(baseUrl + "/get/by/admin/" + id, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong in getQuizByAdmin");
  }
}
export async function createQuiz(
  data: { Title: string; Subject: string; Admin:string },
) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(
      baseUrl + "/create",
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
export async function getOneQuizById(_id: string) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(baseUrl + "/get/one/" + _id, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong in getQuizByAdmin");
  }
}
export async function updateQuizById(
  _id: string,
  data: { Title: string; Subject: string },
) {
  try {
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.put(
      baseUrl + "/update/" + _id,
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
export async function deleteQuizById(_id: string) {
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
  } catch (error) {
    console.log(error);

    throw new Error("Something Went Wrong in deleteQuizById");
  }
}
