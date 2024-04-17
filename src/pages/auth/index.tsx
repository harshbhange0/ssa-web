import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import { Box } from "@mui/material";
import { SignInWithGoogle } from "../../firebase/firebase.config";
import { authRunAtom } from "../../store/atom";
import { useRecoilState } from "recoil";
import { CostumeButton } from "../../components/ui/Button";

export default function SignComponent() {
  const { id, type } = useParams();
  const [authRun, setAuthRun] = useRecoilState(authRunAtom);

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
            await SignInWithGoogle();
            setAuthRun(!authRun);
            localStorage.setItem("userType", "Student");
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
      <Form title={type} type={id == "sign-up" ? "sign-up" : "sign-in"} />
    </>
  );
}
