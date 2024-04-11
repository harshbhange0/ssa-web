import axios from "axios";
import { toast } from "react-toastify";

interface singProps {
  email: string;
  name?: string;
  type: "sign-up" | "sign-in";
  authKey: string;
}
export const Sign = async ({ email, name, type, authKey }: singProps) => {
  try {
    if (!(authKey.length >= 44)) {
      return {
        data: null,
        msg: "Invalid Api Key",
      };

    }
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/${type}`,
      {
        email,
        name,
      },
      {
        headers: {
          api_key: authKey,
        },
      },
    );
    const data: {
      data: string | null;
      msg: string;
      signInToken?: string;
      token?: string;
    } = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
