export interface Profile {
  id: string;
  name: string;
  avatar: string; // couleur de pelage de l'ours (BearFurColor)
  color: string; // couleur du fond derrière l'ours
  accessory?: string; // accessoire de l'ours (BearAccessory)
  createdAt: string;
}

const PROFILES_KEY = "ru-app-profiles";
const LEGACY_PROGRESS_KEY = "ru-app-progress";
const LEGACY_SRS_KEY = "ru-app-srs";

interface ProfilesPersisted {
  state: { profiles: Profile[]; activeProfileId: string | null };
  version: number;
}

function readProfilesRaw(): ProfilesPersisted | null {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function generateId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Migration : la première fois que ce code tourne après l'introduction des profils,
// on crée un profil par défaut et on y rattache les données déjà présentes
// (progression, révision) pour ne rien perdre.
function bootstrap(): ProfilesPersisted {
  const existing = readProfilesRaw();
  if (existing?.state?.profiles?.length) return existing;

  const defaultProfile: Profile = {
    id: generateId(),
    name: "Moi",
    avatar: "brown",
    color: "rose",
    accessory: "none",
    createdAt: new Date().toISOString(),
  };

  const legacyProgress = localStorage.getItem(LEGACY_PROGRESS_KEY);
  if (legacyProgress) {
    localStorage.setItem(`${LEGACY_PROGRESS_KEY}::${defaultProfile.id}`, legacyProgress);
    localStorage.removeItem(LEGACY_PROGRESS_KEY);
  }
  const legacySrs = localStorage.getItem(LEGACY_SRS_KEY);
  if (legacySrs) {
    localStorage.setItem(`${LEGACY_SRS_KEY}::${defaultProfile.id}`, legacySrs);
    localStorage.removeItem(LEGACY_SRS_KEY);
  }

  const persisted: ProfilesPersisted = {
    state: { profiles: [defaultProfile], activeProfileId: defaultProfile.id },
    version: 0,
  };
  localStorage.setItem(PROFILES_KEY, JSON.stringify(persisted));
  return persisted;
}

const bootstrapped = bootstrap();

export function getActiveProfileId(): string | null {
  const raw = readProfilesRaw();
  return raw?.state?.activeProfileId ?? bootstrapped.state.activeProfileId;
}

// Les stores dépendant d'un profil (progression, révision) lisent l'id actif
// une seule fois, au chargement du module : changer de profil recharge la page.
export function profileScopedKey(baseKey: string): string {
  const id = getActiveProfileId();
  return id ? `${baseKey}::${id}` : baseKey;
}

export function removeProfileData(profileId: string): void {
  localStorage.removeItem(`${LEGACY_PROGRESS_KEY}::${profileId}`);
  localStorage.removeItem(`${LEGACY_SRS_KEY}::${profileId}`);
}
