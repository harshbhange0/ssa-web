import { FormEventHandler } from "react";
import { z } from "zod";
export interface fromProps {
  type: "sign-up" | "sign-in";
  title?: string;
}
export const userSchema = z.object({
  email: z.string().email("Invalid Email"),
  name: z.string().optional(),
  authKey: z.string().min(10, "Auth Key too Short").max(44, "Auth Key Too Big"),
});
export type UserInputs = z.infer<typeof userSchema>;
export interface InputsProps {
  type: "sign-up" | "sign-in";
  onClick?: FormEventHandler<HTMLFormElement> | undefined;
  email: string;
  name?: string;
  authKey: string;
  setEmail:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setName?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setAuthKey:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  loading?: boolean;
  title: string;
}