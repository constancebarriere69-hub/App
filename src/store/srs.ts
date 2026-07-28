import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SrsCard {
  key: string;
  ru: string;
  fr: string;
  transcription: string;
  palierId: string;
  box: number; // 1 (à revoir demain) à 5 (bien ancré)
  nextReview: string; // date ISO (YYYY-MM-DD)
  reviewCount: number;
}

// Système de Leitner : plus une carte est révisée avec succès, plus elle
// revient tard. Une seule erreur la fait retomber en boîte 1.
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateKey: string, days: number): string {
  const d = new Date(dateKey + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

interface SrsState {
  cards: Record<string, SrsCard>;
  totalReviews: number;
  ensureCards: (items: { ru: string; fr: string; transcription: string; palierId: string }[]) => void;
  reviewCard: (key: string, remembered: boolean) => void;
  getDueCards: () => SrsCard[];
  getDueCount: () => number;
  getTotalCount: () => number;
}

export const useSrsStore = create<SrsState>()(
  persist(
    (set, get) => ({
      cards: {},
      totalReviews: 0,

      ensureCards: (items) => {
        set((state) => {
          const cards = { ...state.cards };
          let changed = false;
          for (const item of items) {
            const key = `${item.palierId}::${item.ru}`;
            if (!cards[key]) {
              cards[key] = {
                key,
                ru: item.ru,
                fr: item.fr,
                transcription: item.transcription,
                palierId: item.palierId,
                box: 1,
                nextReview: todayKey(),
                reviewCount: 0,
              };
              changed = true;
            }
          }
          return changed ? { cards } : state;
        });
      },

      reviewCard: (key, remembered) => {
        set((state) => {
          const card = state.cards[key];
          if (!card) return state;
          const nextBox = remembered ? Math.min(5, card.box + 1) : 1;
          const interval = BOX_INTERVAL_DAYS[nextBox - 1];
          return {
            cards: {
              ...state.cards,
              [key]: {
                ...card,
                box: nextBox,
                nextReview: addDays(todayKey(), interval),
                reviewCount: card.reviewCount + 1,
              },
            },
            totalReviews: state.totalReviews + 1,
          };
        });
      },

      getDueCards: () => {
        const today = todayKey();
        return Object.values(get().cards).filter((c) => c.nextReview <= today);
      },

      getDueCount: () => get().getDueCards().length,
      getTotalCount: () => Object.keys(get().cards).length,
    }),
    {
      name: "ru-app-srs",
    }
  )
);
