import { atom } from "recoil";
import type { Habits } from "../types";
import { persistentStorageEffect } from "./utils";

export const habitsState = atom<Habits>({
  key: "habits",
  default: {},
  effects: [persistentStorageEffect<Habits>("habits")],
});
