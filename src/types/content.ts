// Modèle de données de l'application d'apprentissage du russe.

export interface AlphabetLetter {
  upper: string;
  lower: string;
  name: string; // nom de la lettre en russe (translittéré)
  frenchSound: string; // approximation phonétique pour un francophone
  example: { ru: string; fr: string };
  type: "voyelle" | "consonne" | "signe";
}

export interface GrammarPoint {
  title: string;
  explanation: string; // en français
  examples: { ru: string; fr: string }[];
  tip?: string;
}

export interface PronunciationDrill {
  title: string;
  explanation: string;
  items: { ru: string; frenchSound: string; fr: string }[];
}

export interface SpellingWord {
  ru: string;
  fr: string;
  hint?: string;
}

export interface VocabItem {
  ru: string;
  fr: string;
  transcription: string; // prononciation approximative
  category?: string;
}

export interface MindMapBranch {
  label: string;
  children: string[];
}

export interface MindMap {
  center: string;
  branches: MindMapBranch[];
}

export interface StoryQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
}

export interface Story {
  title: string;
  paragraphs: { ru: string; fr: string }[];
  questions: StoryQuestion[];
  writingPrompt: string;
  writingHint: string;
}

export interface PodcastLine {
  speaker: string;
  ru: string;
  fr: string;
}

export interface Podcast {
  title: string;
  description: string;
  lines: PodcastLine[];
  quiz: StoryQuestion[];
}

export type LiteraryDifficulty = "facile" | "intermédiaire" | "avancé";

export interface LiteraryWork {
  id: string;
  type: "poème" | "prose" | "comptine" | "conte";
  title: string;
  author: string;
  authorDates: string;
  year: string;
  difficulty: LiteraryDifficulty;
  text: { ru: string; fr: string }[];
  vocab: { ru: string; fr: string }[];
  note: string;
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export interface Palier {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  color: string; // classe tailwind pour l'accent
  level: CEFRLevel;
  alphabet?: AlphabetLetter[];
  grammar: GrammarPoint[];
  pronunciation: PronunciationDrill;
  spelling: SpellingWord[];
  vocabulary: VocabItem[];
  mindMap: MindMap;
  story: Story;
  podcast: Podcast;
}

export interface DialogueTurn {
  npc: { ru: string; fr: string };
  hint: string; // ce que l'apprenant peut répondre, en français
  modelAnswer: { ru: string; fr: string }; // réponse modèle jouée après le tour
  keywords: string[]; // racines russes acceptées dans la réponse parlée (une seule suffit)
}

export interface DialogueScenario {
  id: string;
  title: string;
  icon: string;
  level: CEFRLevel;
  description: string;
  npcName: string;
  turns: DialogueTurn[];
}
