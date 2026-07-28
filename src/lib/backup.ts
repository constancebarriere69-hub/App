const PROFILES_KEY = "ru-app-profiles";

function isBackupRelatedKey(key: string): boolean {
  return key === PROFILES_KEY || key.startsWith("ru-app-progress::") || key.startsWith("ru-app-srs::");
}

interface Backup {
  type: "ru-app-backup";
  version: 1;
  exportedAt: string;
  data: Record<string, unknown>;
}

export function exportBackup(): void {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !isBackupRelatedKey(key)) continue;
    try {
      data[key] = JSON.parse(localStorage.getItem(key) ?? "null");
    } catch {
      // Entrée corrompue : on l'ignore plutôt que de faire échouer toute la sauvegarde.
    }
  }

  const backup: Backup = { type: "ru-app-backup", version: 1, exportedAt: new Date().toISOString(), data };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `russe-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Ce fichier n'est pas une sauvegarde valide.");
  }
  const backup = parsed as Partial<Backup>;
  if (backup?.type !== "ru-app-backup" || typeof backup.data !== "object" || backup.data === null) {
    throw new Error("Ce fichier n'est pas une sauvegarde valide.");
  }

  for (const [key, value] of Object.entries(backup.data)) {
    if (!isBackupRelatedKey(key)) continue;
    localStorage.setItem(key, JSON.stringify(value));
  }
}
