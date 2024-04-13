import { Link } from "react-router-dom";
import { fromProps } from "../types/form_types";

const SignLink = ({ type }: fromProps) => {
  return type == "sign-in" ? (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>Don't have an account? </span>
      <Link
        to="/auth/admin/sign-up"
        className="text-blue-500 hover:text-blue-700"
      >
        Sign up now.
      </Link>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>Already have an account? </span>
      <Link
        to="/auth/admin/sign-in"
        className="text-blue-500 hover:text-blue-700"
      >
        Sign in now.
      </Link>
    </div>
  );
};

export default SignLink