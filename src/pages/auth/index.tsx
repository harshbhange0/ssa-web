import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/Form";
import { Box } from "@mui/material";
import { SignInWithGoogle } from "../../firebase/firebase.config";
import { CostumeButton } from "../../components/ui/Button";
import { authAtom } from "../../store/atom";
import { useRecoilState } from "recoil";

export default function SignComponent() {
  //@ts-expect-error
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const { type } = useParams();
  if (type) {
    localStorage.setItem("userType", type);
  }
  return type == "student" ? (
    <>
      <Box
        component={"div"}
        className="grid h-[calc(100vh-56px)] w-full place-items-center sm:h-[calc(100vh-64px)]"
      >
        <CostumeButton
          sx={{
            color: " rgb(55 65 81)",
            border: "0.1rem solid rgb(231 229 228);",
          }}
          className=" flex items-center gap-3"
          onClick={async () => {
            localStorage.setItem("userType", "Student");
            const res = await SignInWithGoogle();
            setAuth(res);
            setAuth(true);
            navigate("/");
          }}
        >
          <div className="w-10">
            <img src="/google.png" alt="google" className="h-full w-full" />
          </div>
          Sign With Google
        </CostumeButton>
      </Box>
    </>
  ) : (
    <>
      <Form />
    </>
  );
}
