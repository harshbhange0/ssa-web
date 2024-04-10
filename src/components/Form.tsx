import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { Sign } from "../utils/sign";
import { betterZodError } from "../utils/zodError";
import { Link, useNavigate } from "react-router-dom";

interface fromProps {
  type: "sign-up" | "sign-in";
  title?: string;
}
const userSchema = z.object({
  email: z.string().email("Invalid Email"),
  name: z.string().optional(),
});

type UserInputs = z.infer<typeof userSchema>;
export default function Form({ type, title }: fromProps) {
  const [user, setUser] = useState<UserInputs>({ email: "", name: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const outPut = userSchema.safeParse(user);
    if (!outPut.success) {
      betterZodError(outPut.error);
    }
    try {
      const res = await Sign({ type, email: user.email, name: user.name });
      if (res?.data == null) {
        toast.error(res?.msg);
        return navigate("/admin/sign/in");
      }
      setUser({ email: "", name: "" });
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
      return setUser({ email: "", name: "" });
    }
  };
  return (
    <>
      <Inputs
        title={title!}
        type={type}
        email={user.email}
        name={user.name}
        onClick={(e) => handleSubmit(e)}
        setName={(e) => setUser({ ...user, name: e.target.value })}
        setEmail={(e) => setUser({ ...user, email: e.target.value })}
      />
    </>
  );
}
interface InputsProps {
  type: "sign-up" | "sign-in";
  onClick?: FormEventHandler<HTMLFormElement> | undefined;
  email: string;
  name?: string;
  setEmail:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  setName?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  loading?: boolean;
  title: string;
}
const Inputs = ({
  type,
  onClick,
  title,
  email,
  name,
  setEmail,
  setName,
  error,
  loading,
}: InputsProps) => {
  return (
    <Box
      onSubmit={onClick}
      component={"form"}
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
        {title}{" "}
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
        type="submit"
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
      <Link
        to="/auth/admin/sign/up"
        className="text-blue-500 hover:text-blue-700"
      >
        Sign up now.
      </Link>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center gap-1">
      <span>Already have an account? </span>
      <Link
        to="/auth/admin/sign/in"
        className="text-blue-500 hover:text-blue-700"
      >
        Sign in now.
      </Link>
    </div>
  );
};
