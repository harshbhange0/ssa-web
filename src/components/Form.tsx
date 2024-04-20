import { Container, Stack, TextField, Typography } from "@mui/material";
import { CostumeButton } from "./ui/Button";
import { useState } from "react";
import SignMethod, {
  SignInMethodTypes,
  signInMethodSchema,
} from "../utils/authAction";
import { useRecoilState } from "recoil";
import { authAtom } from "../store/atom";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
export default function Form() {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setSignIn] = useState<boolean>(false);

  const [auth, setAuth] = useRecoilState(authAtom);
  const [user, setUser] = useState<SignInMethodTypes>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  auth;
  const navigate = useNavigate();
  const CreateAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const out = signInMethodSchema.safeParse(user);
      if (!out.success) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
        setUser({
          email: "",
          password: "",
        });
        return;
      }
      setLoading(true);
      const res = await SignMethod({ ...user }, isSignIn);

      localStorage.setItem("Authorization", res?.data.token);
      localStorage.setItem("user", res?.data.data);
      setAuth(res?.data.auth);
      setUser({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/");
      return;
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      setUser({
        email: "",
        password: "",
      });
      setLoading(false);
      return;
    }
  };
  return (
    <Container
      component={"div"}
      className="h-[calc(100vh-64px)] "
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        component="form"
        sx={{
          width: "30ch",
        }}
        spacing={2}
        autoComplete="off"
        onSubmit={(e) => CreateAdmin(e)}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Admin Sign {isSignIn ? "In" : "Up"}
        </Typography>

        <TextField
          label={"Email"}
          type="email"
          size="small"
          autoComplete="off"
          value={user?.email}
          error={error}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <TextField
          label={"Password"}
          type="password"
          size="small"
          autoComplete="off"
          value={user?.password}
          error={error}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <CostumeButton
          type="submit"
          sx={{
            fontSize: "16px",
            cursor: error || loading ? "not-allowed" : "pointer",
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <div className=" flex items-center justify-center">
            {loading && (
              <CircularProgress
                thickness={2}
                variant="indeterminate"
                size={"20px"}
              />
            )}
          </div>
          <div>Sign {isSignIn ? "In" : "Up"}</div>
        </CostumeButton>
        <span className="flex gap-2">
          {isSignIn ? "Don't Have " : "Already Have "} An Account?{" "}
          <a
            href="#"
            className=" text-blue-600"
            onClick={() => setSignIn(!isSignIn)}
          >
            Sign
            {!isSignIn ? " In" : " Up"}
          </a>
        </span>
      </Stack>
    </Container>
  );
}
