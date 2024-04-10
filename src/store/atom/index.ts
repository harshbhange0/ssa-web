import { atom } from "recoil";

export const runAtom = atom({
  key: "run",
  default: false,
});

export const userTypeAtom = atom({
  key: "userType",
  default: undefined || "Student" || "Admin",
});
