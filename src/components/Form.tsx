import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Sign } from "../utils/sign";
import { betterZodError } from "../utils/zodError";
import { Link, useNavigate } from "react-router-dom";

interface fromProps {
  type: "sign-up" | "sign-in";
}
const userSchema = z.object({
  email: z.string().email("Invalid Email"),
  name: z.string().min(4, "Name is too short"),
});

type UserInputs = z.infer<typeof userSchema>;
export default function Form({ type }: fromProps) {
  const [user, setUser] = useState<UserInputs>({ email: "", name: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const errorTimer = () => {
    setError(true);
    setLoading(true);
    setTimeout(() => {
      setError(false);
      setLoading(false);
      setUser({ email: "", name: "" });
    }, 1000);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const outPut = userSchema.safeParse(user);
    if (!outPut.success) {
      betterZodError(outPut.error);
      return errorTimer();
    }
    try {
      const res = await Sign({ type, email: user.email, name: user.name });
      if (res?.data == null) {
        toast.error(res?.msg);
        return navigate("/admin/sign/in");
      }
      if (res?.token && res.data) {
        localStorage.setItem("key", res?.data);
        localStorage.setItem("authorization", res?.token);
        toast.success(res?.msg);
      }
      setLoading(false);
      setUser({ email: "", name: "" });
      return navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      return setUser({ email: "", name: "" });
    }
  };
  return (
    <>
      <Inputs
        type={type}
        email={user.email}
        name={user.name}
        error={error}
        onClick={(e) => handleSubmit(e)}
        loading={loading}
        setName={(e) => setUser({ ...user, name: e.target.value })}
        setEmail={(e) => setUser({ ...user, email: e.target.value })}
      />
    </>
  );
}
interface InputsProps {
  type: "sign-up" | "sign-in";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  email: string;
  name?: string;
  setEmail:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setName?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error: boolean;
  loading: boolean;
}
const Inputs = ({
  type,
  onClick,
  email,
  name,
  setEmail,
  setName,
  error,
  loading,
}: InputsProps) => {
  return (
    <Box
      component={"div"}
      className="max-w-md"
      sx={{
        display: "flex",
        gap: 2,
        mt: 20,
        mx: "auto",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        className="w-full text-center capitalize"
      >
        Admin{" "}
        {type.toString().split("-")[0] + " " + type.toString().split("-")[1]}
      </Typography>
      <TextField
        type="email"
        required
        id="outlined-required"
        label="Email"
        autoComplete="off"
        value={email}
        onChange={setEmail}
        error={error}
      />
      {type == "sign-up" && (
        <TextField
          type="text"
          required
          id="outlined-required"
          autoComplete="off"
          label="Name"
          value={name}
          onChange={setName}
          error={error}
        />
      )}
      <Button
        onClick={onClick}
        variant="outlined"
        disabled={loading}
        sx={{ mx: "auto", px: 3, pt: 1 }}
      >
        {type == "sign-in" ? "Sign In" : "Sign Up"}
      </Button>
      <div>
        <SignLink type={type} />
      </div>
    </Box>
  );
};

const SignLink = ({ type }: fromProps) => {
  return type == "sign-in" ? (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>Don't have an account? </span>
      <Link to="/admin/sign/up" className="text-blue-500 hover:text-blue-700">
        Sign up now.
      </Link>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>Already have an account? </span>
      <Link to="/admin/sign/in" className="text-blue-500 hover:text-blue-700">
        Sign in now.
      </Link>
    </div>
  );
};
