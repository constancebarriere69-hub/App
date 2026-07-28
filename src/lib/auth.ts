// Empreinte locale d'un mot de passe. Important : ceci n'est PAS une
// authentification sécurisée — il n'y a aucun serveur, tout reste sur
// l'appareil. C'est juste un verrou de confort pour éviter qu'on bascule sur
// un profil par erreur ou par curiosité, pas une protection contre quelqu'un
// de déterminé ayant accès à l'appareil ou aux outils de développement.
export async function hashPassword(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash;
}
