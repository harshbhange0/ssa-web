import { useRecoilValue } from "recoil";
import { runAtom } from "../atom";

export const useRun = () => {
  const value = useRecoilValue(runAtom);
  return value;
};
