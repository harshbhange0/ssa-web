import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const adminSignInMethodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type AdminSignInMethodTypes = z.infer<typeof adminSignInMethodSchema>;

export const studentSignInMethodSchema = z.object({
  email: z.string().email(),
  image: z.string().min(8),
});
export type StudentSignInMethodTypes = z.infer<
  typeof studentSignInMethodSchema
>;

export async function AdminSignMethod(
  { email, password }: AdminSignInMethodTypes,
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

export async function StudentSignMethod(email: string, image: string) {
  try {
    const response = await axios.post(`${baseUrl}/student/create`, {
      email,
      image,
    });
    return response.data.data;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
}
export async function verify() {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    return false;
  }
  try {
    const response = await axios.get(`${baseUrl}/verify`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data.auth;
  } catch (error: any) {
    throw new AxiosError(error.response.data);
  }
}
