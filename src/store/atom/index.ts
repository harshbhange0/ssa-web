import { atom } from "recoil";

export const authAtom = atom({
  key: "auth",
  default: false,
});
export const sideOpenAtom = atom({
  key: "sideOpen",
  default: false,
});

export const updateQuizAtom = atom({
  key: "updateQuiz",
  default: false,
});
export const authLoaderAtom = atom({
  key: "authLoader",
  default: false,
});
