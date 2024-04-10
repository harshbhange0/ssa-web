import axios from "axios";

interface singProps {
  email: string;
  name?: string;
  type: "sign-up" | "sign-in";
}
export const Sign = async ({ email, name, type }: singProps) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/${type}`,
      {
        email,
        name,
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
