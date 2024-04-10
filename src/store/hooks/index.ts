import { useRecoilValue } from "recoil";
import { userTypeAtom, runAtom } from "../atom";

export const useRun = () => {
  const value = useRecoilValue(runAtom);
  return value;
};
export const useUserType = () => {
  const value = useRecoilValue(userTypeAtom);
  return value
};
