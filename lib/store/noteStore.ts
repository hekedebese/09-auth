import { create } from "zustand";
import type { CreateNote } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: CreateNote;
  setDraft: (note: CreateNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set(() => ({
          draft: note,
        })),

      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({
        draft: state.draft,
      }),
    },
  ),
);
