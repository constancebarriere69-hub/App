import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../lib/profileStorage";
import { removeProfileData } from "../lib/profileStorage";
import { hashPassword, verifyPassword } from "../lib/auth";
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
  createProfile: (name: string, avatar: string, color: string, accessory?: string, email?: string) => string;
  switchProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  renameProfile: (id: string, name: string) => void;
  updateAvatar: (id: string, avatar: string, color: string, accessory?: string) => void;
  setEmail: (id: string, email: string) => void;
  setPassword: (id: string, password: string) => Promise<void>;
  clearPassword: (id: string) => void;
  checkPassword: (id: string, password: string) => Promise<boolean>;
  reloadFromStorage: () => void;
}

export const useProfilesStore = create<ProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,

      createProfile: (name, avatar, color, accessory = "none", email) => {
        const id = generateId();
        const profile: Profile = {
          id,
          name: name.trim() || "Sans nom",
          email: email?.trim() || undefined,
          avatar,
          color,
          accessory,
          createdAt: new Date().toISOString(),
        };
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

      updateAvatar: (id, avatar, color, accessory) => {
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p.id === id ? { ...p, avatar, color, accessory: accessory ?? p.accessory } : p
          ),
        }));
      },

      setEmail: (id, email) => {
        const trimmed = email.trim();
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, email: trimmed || undefined } : p)),
        }));
      },

      setPassword: async (id, password) => {
        if (!password) return;
        const passwordHash = await hashPassword(password);
        set((state) => ({ profiles: state.profiles.map((p) => (p.id === id ? { ...p, passwordHash } : p)) }));
      },

      clearPassword: (id) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, passwordHash: undefined } : p)),
        }));
      },

      checkPassword: async (id, password) => {
        const profile = get().profiles.find((p) => p.id === id);
        if (!profile?.passwordHash) return true;
        return verifyPassword(password, profile.passwordHash);
      },

      // Relit `ru-app-profiles` depuis le localStorage (ex. après une restauration de
      // sauvegarde qui a écrit directement dedans) et resynchronise tous les stores,
      // sans recharger la page.
      reloadFromStorage: () => {
        try {
          const raw = localStorage.getItem("ru-app-profiles");
          if (!raw) return;
          const parsed = JSON.parse(raw) as { state?: { profiles?: Profile[]; activeProfileId?: string | null } };
          const profiles = parsed.state?.profiles ?? [];
          const activeProfileId = parsed.state?.activeProfileId ?? null;
          set({ profiles, activeProfileId });
          if (activeProfileId) rehydrateProfileStores(activeProfileId);
        } catch {
          // Sauvegarde illisible : on garde l'état actuel plutôt que de planter.
        }
      },
    }),
    {
      name: "ru-app-profiles",
    }
  )
);
