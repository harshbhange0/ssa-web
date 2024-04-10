import { useParams } from "react-router-dom";
import Form from "../../components/Form";
import { Box, Button } from "@mui/material";
import { SignInWithGoogle } from "../../firebase/firebase.config";
import { useRecoilState } from "recoil";
import { userTypeAtom } from "../../store/atom";

export default function SignComponent() {
  const [userType, setUserType] = useRecoilState(userTypeAtom);
  const { id, type } = useParams();
  return type == "student" ? (
    <>
      <Box
        component={"div"}
        className="grid h-[calc(100vh-56px)] w-full place-items-center sm:h-[calc(100vh-64px)]"
      >
        <Button
          sx={{
            color: " rgb(55 65 81)",
            border: "0.1rem solid rgb(231 229 228);",
          }}
          className=" flex items-center gap-3"
          onClick={() => {
            setUserType("Student");
            
            SignInWithGoogle();
          }}
        >
          <div className="w-10">
            <img src="/google.png" alt="google" className="h-full w-full" />
          </div>
          Sign With Google
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Form title={type} type={id == "up" ? "sign-up" : "sign-in"} />
    </>
  );
}
