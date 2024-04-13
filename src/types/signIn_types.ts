
export interface singProps {
  email: string;
  name?: string;
  type: "sign-up" | "sign-in";
  authKey: string;
}
export interface signInResTypes {
  data: string | null;
  msg: string;
  signInToken?: string;
  token?: string;
}