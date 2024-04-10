import { atom } from "recoil";

export const authAtom = atom({
  key: "auth",
  default: false,
});
export const authRunAtom = atom({
  key: "authRun",
  default: false,
});
