import { atom } from "recoil";

export const runAtom = atom({
  key: "run",
  default: false,
});

export const isAdminAtom = atom({
  key: "isAdmin",
  default: false,
});
