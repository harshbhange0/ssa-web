import { useState } from "react";
import { toast } from "react-toastify";
import { Sign } from "../utils/sign";
import { betterZodError } from "../utils/zodError";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authRunAtom } from "../store/atom";
import { UserInputs, fromProps, userSchema } from "../types/form_types";

import FormInputs from "./FormInputs";
import errorTimer from "../utils/errorTimer";

export default function Form({ type, title }: fromProps) {
  const [l, setL] = useState(false);
  const [e, setE] = useState(false);

  const [authRun, setAuthRun] = useRecoilState(authRunAtom);
  const [user, setUser] = useState<UserInputs>({
    email: "",
    name: "",
    authKey: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setL(true);
    const outPut = userSchema.safeParse(user);
    if (!outPut.success) {
      errorTimer(setE, setL);
      return betterZodError(outPut.error);
    }
    try {
      const res: any = await Sign({
        type,
        email: user.email,
        name: user.name,
        authKey: user.authKey,
      });
      if (res?.data == null) {
        toast.error(res?.msg);
        errorTimer(setE, setL);
        return navigate("/auth/admin/sign-in");
      }
      setUser({ email: "", name: "", authKey: "" });
      navigate("/");
      toast.success(res?.msg);
      localStorage.setItem("id", res.data!);
      localStorage.setItem("authorization", res?.token!);
      localStorage.setItem("userType", "Admin");
      setL(false);
      return setAuthRun(!authRun);
    } catch (error) {
      errorTimer(setE, setL);
      console.log(error);
      return setUser({ email: "", name: "", authKey: "" });
    }
  };
  return (
    <>
      <FormInputs
        title={title!}
        type={type}
        error={e}
        loading={l}
        email={user.email}
        name={user.name}
        authKey={user.authKey}
        setAuthKey={(e) => setUser({ ...user, authKey: e.target.value })}
        onClick={(e) => handleSubmit(e)}
        setName={(e) => setUser({ ...user, name: e.target.value })}
        setEmail={(e) => setUser({ ...user, email: e.target.value })}
      />
    </>
  );
}
