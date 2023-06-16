import { Preferences } from "@capacitor/preferences";
import { AtomEffect, atom } from "recoil";
import type { Habit } from "../types";

const persistentStorageEffect = (key: string): AtomEffect<any> => {
  return ({ setSelf, onSet, trigger }) => {
    const loadPersisted = async () => {
      const getResult = await Preferences.get({ key });

      if (getResult.value != null) {
        setSelf(JSON.parse(getResult.value));
      }
    };

    if (trigger === "get") {
      loadPersisted();
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        Preferences.remove({ key });
      } else {
        Preferences.set({ key, value: JSON.stringify(newValue) });
      }
    });
  };
};

export const habitsState = atom<{ [key: string]: Habit }>({
  key: "habits",
  default: {},
  effects: [persistentStorageEffect("habits")],
});
