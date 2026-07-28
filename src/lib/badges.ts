import type { Palier } from "../types/content";
import type { LessonProgress } from "../store/progress";

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const TRACKED: (keyof LessonProgress)[] = [
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

function palierCompletion(lp: LessonProgress | undefined, palier: Palier): number {
  if (!lp) return 0;
  const steps = TRACKED.filter((s) => (s === "alphabet" ? Boolean(palier.alphabet) : true));
  const done = steps.filter((s) => Boolean(lp[s])).length;
  return steps.length === 0 ? 0 : done / steps.length;
}

export function computeBadges(
  progress: Record<string, LessonProgress>,
  streak: number,
  readWorks: string[],
  paliers: Palier[],
  literatureTotal: number,
  dialoguesDone: string[] = [],
  dialoguesTotal: number = 0,
  srsTotalReviews: number = 0
): Badge[] {
  const anyStepDone = Object.values(progress).some((lp) =>
    TRACKED.some((s) => Boolean(lp[s]))
  );

  const palier1 = paliers.find((p) => p.id === "palier-1");
  const palier1Done = palier1 ? palierCompletion(progress["palier-1"], palier1) >= 1 : false;
  const alphabetDone = Boolean(progress["palier-1"]?.alphabet);

  const caseIds = ["palier-5", "palier-6", "palier-7", "palier-8"];
  const allCasesDone = caseIds.every((id) => Boolean(progress[id]?.grammar));

  const writeCount = Object.values(progress).filter((lp) => lp.storyWriteDone).length;
  const podcastCount = Object.values(progress).filter((lp) => lp.podcastListened).length;
  const conversationCount = Object.values(progress).filter((lp) => lp.conversationDone).length;
  const writingPracticeCount = Object.values(progress).filter((lp) => lp.writingPracticeDone).length;

  const allPaliersDone = paliers.every((p) => palierCompletion(progress[p.id], p) >= 1);
  const c1Paliers = paliers.filter((p) => p.level === "C1");
  const c1Done = c1Paliers.length > 0 && c1Paliers.every((p) => palierCompletion(progress[p.id], p) >= 1);

  return [
    {
      id: "premiers-pas",
      title: "Premiers pas",
      description: "Termine ta toute première leçon.",
      icon: "🌱",
      unlocked: anyStepDone,
    },
    {
      id: "semaine",
      title: "Une semaine de suite",
      description: "Visite l'application 7 jours d'affilée.",
      icon: "🔥",
      unlocked: streak >= 7,
    },
    {
      id: "alphabet",
      title: "Alphabet maîtrisé",
      description: "Termine la leçon d'alphabet cyrillique.",
      icon: "🔤",
      unlocked: alphabetDone,
    },
    {
      id: "palier-1",
      title: "Premier palier !",
      description: "Termine complètement le palier 1.",
      icon: "🎓",
      unlocked: palier1Done,
    },
    {
      id: "tous-les-cas",
      title: "Maître des cas",
      description: "Étudie la grammaire des 4 cas obliques (génitif, datif, accusatif, instrumental).",
      icon: "🧩",
      unlocked: allCasesDone,
    },
    {
      id: "ecrivain",
      title: "Petit·e écrivain·e",
      description: "Rédige 5 exercices d'écriture dans les histoires.",
      icon: "✍️",
      unlocked: writeCount >= 5,
    },
    {
      id: "auditeur",
      title: "Grande oreille",
      description: "Écoute tous les podcasts disponibles.",
      icon: "🎧",
      unlocked: podcastCount >= paliers.length && paliers.length > 0,
    },
    {
      id: "bibliophile",
      title: "Bibliophile",
      description: "Découvre 3 œuvres dans la bibliothèque russe.",
      icon: "📖",
      unlocked: readWorks.length >= 3,
    },
    {
      id: "poete",
      title: "Âme de poète",
      description: "Lis toute la bibliothèque de poésie et de prose russes.",
      icon: "🕊️",
      unlocked: literatureTotal > 0 && readWorks.length >= literatureTotal,
    },
    {
      id: "causeur",
      title: "Beau parleur",
      description: "Termine 5 exercices de conversation.",
      icon: "💬",
      unlocked: conversationCount >= 5,
    },
    {
      id: "redacteur",
      title: "Rédacteur en herbe",
      description: "Termine 5 exercices d'écriture guidée.",
      icon: "📝",
      unlocked: writingPracticeCount >= 5,
    },
    {
      id: "niveau-c1",
      title: "Niveau C1 !",
      description: "Termine tous les paliers de niveau C1.",
      icon: "🏅",
      unlocked: c1Done,
    },
    {
      id: "premier-dialogue",
      title: "Première conversation",
      description: "Termine ta première scène de dialogue vocal.",
      icon: "🎙️",
      unlocked: dialoguesDone.length >= 1,
    },
    {
      id: "toutes-les-scenes",
      title: "Grand orateur",
      description: "Termine toutes les scènes de dialogue vocal.",
      icon: "🗣️",
      unlocked: dialoguesTotal > 0 && dialoguesDone.length >= dialoguesTotal,
    },
    {
      id: "memoire",
      title: "Mémoire d'éléphant",
      description: "Révise 50 mots avec le système de répétition espacée.",
      icon: "🐘",
      unlocked: srsTotalReviews >= 50,
    },
    {
      id: "polyglotte",
      title: "Polyglotte accompli",
      description: "Termine tous les paliers, de l'alphabet au C1.",
      icon: "👑",
      unlocked: allPaliersDone,
    },
  ];
}
