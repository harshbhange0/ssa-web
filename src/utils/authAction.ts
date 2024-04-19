import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const signInMethodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInMethodTypes = z.infer<typeof signInMethodSchema>;

export default async function SignMethod(
  { email, password }: SignInMethodTypes,
  isSignIn: boolean,
) {
  try {
    const response = await axios.post(
      `${baseUrl}/admin/sign-${isSignIn ? "in" : "up"}`,
      {
        email,
        password,
      },
    );
    toast.success(`Admin Sign ${isSignIn ? "in" : "up"} successfully`);
    return response.data;
  } catch (error: any) {
    toast.warn(error.response.data.data);
    throw new AxiosError(error.response.data.data);
  }
}

export async function verify() {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    return false;
  }
  try {
    const response = await axios.get(`${baseUrl}/admin/verify`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.auth;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
}
