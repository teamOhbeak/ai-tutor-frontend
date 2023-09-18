import { atom } from "recoil";

export const atomState = atom<boolean>({
  key: "atomState",
  default: true,
});
