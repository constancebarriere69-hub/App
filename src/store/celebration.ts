import { create } from "zustand";
import { playDing, playFanfare } from "../lib/sound";

interface Toast {
  id: number;
  message: string;
  xp: number;
  levelUp?: { level: number; title: string };
}

interface CelebrationState {
  toast: Toast | null;
  confettiTrigger: number;
  confettiBig: boolean;
  celebrate: (message: string, xp: number, levelUp?: { level: number; title: string }) => void;
  clearToast: () => void;
}

let idCounter = 0;

export const useCelebrationStore = create<CelebrationState>((set) => ({
  toast: null,
  confettiTrigger: 0,
  confettiBig: false,
  celebrate: (message, xp, levelUp) => {
    idCounter += 1;
    set((state) => ({
      toast: { id: idCounter, message, xp, levelUp },
      confettiTrigger: state.confettiTrigger + 1,
      confettiBig: Boolean(levelUp),
    }));
    if (levelUp) playFanfare();
    else playDing();
  },
  clearToast: () => set({ toast: null }),
}));
