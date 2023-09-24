import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type State = {
  active: string;
};

type Action = {
  setActive: (pathName: string) => void;
};

export const useNavbarStore = createWithEqualityFn<State & Action>((set) => ({
  active: "/",
  setActive: (pathName) => set({ active: pathName }),
}), shallow);
