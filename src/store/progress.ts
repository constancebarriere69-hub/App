import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Palier } from "../types/content";
import { getLevelInfo } from "../lib/levels";
import { useCelebrationStore } from "./celebration";
import { profileScopedKey } from "../lib/profileStorage";

export interface LessonProgress {
  alphabet: boolean;
  alphabetGroupsDone: number[];
  grammar: boolean;
  pronunciation: boolean;
  pronunciationCheckScore?: number;
  spelling: boolean;
  spellingScore?: number;
  vocabulary: boolean;
  mindMap: boolean;
  storyRead: boolean;
  storyQuizScore?: number;
  storyWriteText: string;
  storyWriteDone: boolean;
  podcastListened: boolean;
  podcastQuizScore?: number;
  conversationDone: boolean;
  conversationScore?: number;
  writingPracticeDone: boolean;
  writingPracticeScore?: number;
}

const emptyLessonProgress: LessonProgress = {
  alphabet: false,
  alphabetGroupsDone: [],
  grammar: false,
  pronunciation: false,
  spelling: false,
  vocabulary: false,
  mindMap: false,
  storyRead: false,
  storyWriteText: "",
  storyWriteDone: false,
  podcastListened: false,
  conversationDone: false,
  writingPracticeDone: false,
};

// Les étapes comptées dans la barre de progression d'un palier.
const TRACKED_STEPS: (keyof LessonProgress)[] = [
  "alphabet",
  "grammar",
  "pronunciation",
  "spelling",
  "vocabulary",
  "mindMap",
  "storyRead",
  "storyWriteDone",
  "conversationDone",
  "writingPracticeDone",
  "podcastListened",
];

interface ProgressState {
  progress: Record<string, LessonProgress>;
  visitedDates: string[];
  xp: number;
  readWorks: string[];
  dialoguesDone: string[];
  markStep: (palierId: string, step: keyof LessonProgress, value?: boolean | number | string) => void;
  award: (palierId: string, step: keyof LessonProgress, value: boolean | number | string, xpAmount: number, message: string) => void;
  markAlphabetGroupDone: (palierId: string, groupIndex: number, xpAmount: number, message: string) => void;
  markLiteraryRead: (workId: string, xpAmount: number, message: string) => void;
  markDialogueDone: (scenarioId: string, xpAmount: number, message: string) => void;
  addXp: (xpAmount: number, message: string) => void;
  getLessonProgress: (palierId: string) => LessonProgress;
  visitToday: () => void;
  getStreak: () => number;
  getPalierCompletion: (palierId: string, palier: Palier) => number;
  getOverallCompletion: (allPaliers: Palier[]) => number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function grantXp(getXp: () => number, setXp: (n: number) => void, amount: number, message: string) {
  const before = getXp();
  const after = before + amount;
  setXp(after);
  const levelBefore = getLevelInfo(before).current.level;
  const levelInfo = getLevelInfo(after);
  const leveledUp = levelInfo.current.level > levelBefore;
  useCelebrationStore.getState().celebrate(
    message,
    amount,
    leveledUp ? { level: levelInfo.current.level, title: levelInfo.current.title } : undefined
  );
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      visitedDates: [],
      xp: 0,
      readWorks: [],
      dialoguesDone: [],

      markStep: (palierId, step, value = true) => {
        set((state) => {
          const current = state.progress[palierId] ?? { ...emptyLessonProgress };
          return {
            progress: {
              ...state.progress,
              [palierId]: {
                ...current,
                [step]: value,
              },
            },
          };
        });
        get().visitToday();
      },

      award: (palierId, step, value, xpAmount, message) => {
        get().markStep(palierId, step, value);
        grantXp(() => get().xp, (n) => set({ xp: n }), xpAmount, message);
      },

      markAlphabetGroupDone: (palierId, groupIndex, xpAmount, message) => {
        const current = get().progress[palierId] ?? emptyLessonProgress;
        if ((current.alphabetGroupsDone ?? []).includes(groupIndex)) return;
        set((state) => {
          const cur = state.progress[palierId] ?? { ...emptyLessonProgress };
          return {
            progress: {
              ...state.progress,
              [palierId]: {
                ...cur,
                alphabetGroupsDone: [...(cur.alphabetGroupsDone ?? []), groupIndex],
              },
            },
          };
        });
        get().visitToday();
        grantXp(() => get().xp, (n) => set({ xp: n }), xpAmount, message);
      },

      markLiteraryRead: (workId, xpAmount, message) => {
        set((state) =>
          state.readWorks.includes(workId) ? state : { readWorks: [...state.readWorks, workId] }
        );
        get().visitToday();
        grantXp(() => get().xp, (n) => set({ xp: n }), xpAmount, message);
      },

      markDialogueDone: (scenarioId, xpAmount, message) => {
        set((state) =>
          state.dialoguesDone.includes(scenarioId) ? state : { dialoguesDone: [...state.dialoguesDone, scenarioId] }
        );
        get().visitToday();
        grantXp(() => get().xp, (n) => set({ xp: n }), xpAmount, message);
      },

      addXp: (xpAmount, message) => {
        get().visitToday();
        grantXp(() => get().xp, (n) => set({ xp: n }), xpAmount, message);
      },

      getLessonProgress: (palierId) => {
        return get().progress[palierId] ?? emptyLessonProgress;
      },

      visitToday: () => {
        const today = todayKey();
        set((state) => {
          if (state.visitedDates.includes(today)) return state;
          return { visitedDates: [...state.visitedDates, today].sort() };
        });
      },

      getStreak: () => {
        const dates = new Set(get().visitedDates);
        if (dates.size === 0) return 0;
        let streak = 0;
        const cursor = new Date();
        if (!dates.has(todayKey())) {
          cursor.setDate(cursor.getDate() - 1);
        }
        while (dates.has(cursor.toISOString().slice(0, 10))) {
          streak += 1;
          cursor.setDate(cursor.getDate() - 1);
        }
        return streak;
      },

      getPalierCompletion: (palierId, palier) => {
        const lp = get().progress[palierId] ?? emptyLessonProgress;
        const steps = TRACKED_STEPS.filter((step) => {
          if (step === "alphabet" && !palier.alphabet) return false;
          return true;
        });
        const done = steps.filter((step) => Boolean(lp[step])).length;
        return steps.length === 0 ? 0 : done / steps.length;
      },

      getOverallCompletion: (allPaliers) => {
        const total = allPaliers.reduce((sum, p) => sum + get().getPalierCompletion(p.id, p), 0);
        return allPaliers.length === 0 ? 0 : total / allPaliers.length;
      },
    }),
    {
      name: profileScopedKey("ru-app-progress"),
    }
  )
);
