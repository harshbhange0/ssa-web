
export interface singProps {
  email: string;
  name?: string;
  type: "sign-up" | "sign-in";
  authKey: string;
}