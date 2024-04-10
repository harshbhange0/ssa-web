import { useRecoilValue } from "recoil";
import { isAdminAtom, runAtom } from "../atom";

export const useRun = () => {
  const value = useRecoilValue(runAtom);
  return value;
};
export const useIsAdmin = () => {
  const value = useRecoilValue(isAdminAtom);
  return value;
};
