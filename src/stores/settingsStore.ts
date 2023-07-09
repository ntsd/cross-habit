import { atom } from "recoil";
import { persistentStorageEffect } from "./utils";
import type { Settings } from "../types";

export const settingsState = atom<Settings>({
  key: "settings",
  default: {
    darkMode: true,
  },
  effects: [persistentStorageEffect<Settings>("settings")],
});
