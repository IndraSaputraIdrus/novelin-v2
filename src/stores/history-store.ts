import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  history: { title: string; chapter: number }[];
};

type Action = {
  setHistory: (title: string, chapter: number) => void;
  getHistory: (title: string) => { title: string; chapter: number };
};

export const useHistoryStore = createWithEqualityFn<State & Action>()(
  persist((set, get) => ({
    history: [],
    setHistory: (title, chapter) =>
      set({
        history: [
          ...get().history.filter(({ title: historyTitle }) =>
            historyTitle !== title
          ),
          {
            title,
            chapter,
          },
        ],
      }),
    getHistory: (title: string) => {
      const filter = get().history.filter(({ title: historyTitle }) =>
        historyTitle === title
      );
      return filter[0];
    },
  }), {
    name: "history",
  }),
  shallow,
);
