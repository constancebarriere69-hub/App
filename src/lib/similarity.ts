export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[.,!?;:«»"'()\-—]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const prev = new Array(n + 1);
  const curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

// Renvoie un score de similarité entre 0 et 100, basé sur la distance de
// Levenshtein normalisée. Utilisé pour comparer une transcription vocale
// reconnue à la phrase russe attendue.
export function similarityScore(target: string, spoken: string): number {
  const a = normalize(target);
  const b = normalize(spoken);
  if (!a || !b) return 0;
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  const ratio = 1 - distance / maxLen;
  return Math.round(Math.max(0, ratio) * 100);
}
