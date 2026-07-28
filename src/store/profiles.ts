import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../lib/profileStorage";
import { removeProfileData } from "../lib/profileStorage";
import { useProgressStore } from "./progress";
import { useSrsStore } from "./srs";

export type { Profile };

function generateId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Repointe les stores liés à un profil (progression, révision) vers les
// clés du nouveau profil actif et recharge leur état, sans recharger la page.
function rehydrateProfileStores(profileId: string) {
  useProgressStore.persist.setOptions({ name: `ru-app-progress::${profileId}` });
  void useProgressStore.persist.rehydrate();
  useSrsStore.persist.setOptions({ name: `ru-app-srs::${profileId}` });
  void useSrsStore.persist.rehydrate();
}

interface ProfilesState {
  profiles: Profile[];
  activeProfileId: string | null;
  createProfile: (name: string, avatar: string, color: string) => string;
  switchProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  renameProfile: (id: string, name: string) => void;
  updateAvatar: (id: string, avatar: string, color: string) => void;
}

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,

      createProfile: (name, avatar, color) => {
        const id = generateId();
        const profile: Profile = { id, name: name.trim() || "Sans nom", avatar, color, createdAt: new Date().toISOString() };
        set((state) => ({ profiles: [...state.profiles, profile] }));
        return id;
      },

      switchProfile: (id) => {
        if (!get().profiles.some((p) => p.id === id)) return;
        set({ activeProfileId: id });
        rehydrateProfileStores(id);
      },

      deleteProfile: (id) => {
        let fallbackId: string | null = null;
        set((state) => {
          const remaining = state.profiles.filter((p) => p.id !== id);
          const activeProfileId = state.activeProfileId === id ? (remaining[0]?.id ?? null) : state.activeProfileId;
          fallbackId = state.activeProfileId === id ? activeProfileId : null;
          return { profiles: remaining, activeProfileId };
        });
        removeProfileData(id);
        if (fallbackId) rehydrateProfileStores(fallbackId);
      },

      renameProfile: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((state) => ({ profiles: state.profiles.map((p) => (p.id === id ? { ...p, name: trimmed } : p)) }));
      },

      updateAvatar: (id, avatar, color) => {
        set((state) => ({ profiles: state.profiles.map((p) => (p.id === id ? { ...p, avatar, color } : p)) }));
      },
    }),
    {
      name: "ru-app-profiles",
    }
  )
);
