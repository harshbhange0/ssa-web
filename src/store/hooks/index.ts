import { useRecoilValue } from "recoil";
import { authAtom, authRunAtom } from "../atom";

export const useAuth = () => {
  const value = useRecoilValue(authAtom);
  return value;
};

export const useAuthRun = () => {
  const value = useRecoilValue(authRunAtom);
  return value;
};
