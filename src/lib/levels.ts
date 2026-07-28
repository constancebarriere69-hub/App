export interface LevelDef {
  level: number;
  title: string;
  minXp: number;
}

export const LEVELS: LevelDef[] = [
  { level: 1, title: "Ourson curieux", minXp: 0 },
  { level: 2, title: "Explorateur de l'alphabet", minXp: 60 },
  { level: 3, title: "Apprenti bavard", minXp: 150 },
  { level: 4, title: "Voyageur des cas", minXp: 280 },
  { level: 5, title: "Conteur en herbe", minXp: 450 },
  { level: 6, title: "Grammairien futé", minXp: 650 },
  { level: 7, title: "Amoureux des mots", minXp: 900 },
  { level: 8, title: "Lecteur de poésie", minXp: 1200 },
  { level: 9, title: "Érudit des lettres russes", minXp: 1550 },
  { level: 10, title: "Poète russe", minXp: 2000 },
];

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  let next: LevelDef | null = null;
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) current = lvl;
    else {
      next = lvl;
      break;
    }
  }
  const progressToNext = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progressToNext: Math.min(1, Math.max(0, progressToNext)) };
}
