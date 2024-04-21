import { useRecoilValue } from "recoil";
import {
  authAtom,
  authLoaderAtom,
  sideOpenAtom,
  updateQuestionAtom,
  updateQuizAtom,
} from "../atom";

export const useAuth = () => {
  const value = useRecoilValue(authAtom);
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

export const useUpdateQuestion = () => {
  const value = useRecoilValue(updateQuestionAtom);
  return value;
};

export const useAuthLoader = () => {
  const value = useRecoilValue(authLoaderAtom);
  return value;
};
