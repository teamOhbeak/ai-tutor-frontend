import { atom } from "recoil";
import { testStateType } from "../types/etcTypes";

export const testState1 = atom<testStateType>({
  key: "testState1",
  default: { user: "", inProgress: false },
});

export const testState2 = atom<testStateType>({
  key: "testState2",
  default: { user: "test2", inProgress: false },
});
