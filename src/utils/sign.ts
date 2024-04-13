import axios from "axios";
import { signInResTypes, singProps } from "../types/signIn_types";

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
    const data: signInResTypes = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
