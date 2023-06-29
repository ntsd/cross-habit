import { Preferences } from "@capacitor/preferences";
import { AtomEffect, atom } from "recoil";
import type { Habits } from "../types";

const persistentStorageEffect = <T>(key: string): AtomEffect<T> => {
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

export const habitsState = atom<Habits>({
  key: "habits",
  default: {},
  effects: [persistentStorageEffect<Habits>("habits")],
});
