import { useRecoilValue } from "recoil";
import { authAtom, authRunAtom, sideOpenAtom, updateQuizAtom } from "../atom";

export const useAuth = () => {
  const value = useRecoilValue(authAtom);
  return value;
};

export const useAuthRun = () => {
  const value = useRecoilValue(authRunAtom);
  return value;
};
export const useSideOpen = () => {
  const value = useRecoilValue(sideOpenAtom);
  return value;
};
export const useUpdateQuiz = () => {
  const value = useRecoilValue(updateQuizAtom);
  return value;
};
