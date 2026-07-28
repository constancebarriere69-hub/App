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
  type: "poème" | "prose" | "comptine" | "conte" | "récit";
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

export interface HistoryPeriod {
  id: string;
  title: string;
  years: string;
  icon: string;
  level: CEFRLevel;
  paragraphs: { ru: string; fr: string }[];
  keyFacts: string[];
  vocab: { ru: string; fr: string }[];
}

export interface VocabTheme {
  id: string;
  title: string;
  icon: string;
  level: CEFRLevel;
  words: VocabItem[];
}

export interface VerbConjugation {
  id: string;
  infinitive: string;
  infinitiveFr: string;
  group: "I" | "II" | "irrégulier";
  level: CEFRLevel;
  tenseLabel: string; // "Présent" ou "Futur" (pour être, dont le présent est omis)
  forms: { ya: string; ty: string; on: string; my: string; vy: string; oni: string };
  past: { m: string; f: string; n: string; pl: string };
  imperative?: { ty: string; vy: string };
  note?: string;
  example: { ru: string; fr: string };
}

export interface AspectPair {
  id: string;
  imperfective: string;
  imperfectiveFr: string;
  perfective: string;
  perfectiveFr: string;
  level: CEFRLevel;
  note?: string;
  exampleImperfective: { ru: string; fr: string };
  examplePerfective: { ru: string; fr: string };
}

export interface MotionVerbPair {
  id: string;
  unidirectional: string;
  unidirectionalFr: string;
  multidirectional: string;
  multidirectionalFr: string;
  meaning: string;
  level: CEFRLevel;
  exampleUnidirectional: { ru: string; fr: string };
  exampleMultidirectional: { ru: string; fr: string };
}

export interface Idiom {
  id: string;
  ru: string;
  literal: string; // traduction mot à mot
  meaning: string; // sens figuré / équivalent français
  level: CEFRLevel;
  example?: { ru: string; fr: string };
}

export interface CaseInfo {
  id: string;
  name: string; // nom russe (ex. "Родительный")
  nameFr: string; // nom français (ex. "Génitif")
  question: string; // ex. "Кого? Чего?"
  usage: string; // explication en français
  example: { ru: string; fr: string };
}

export interface NounDeclension {
  id: string;
  word: string;
  wordFr: string;
  gender: "masculin" | "féminin" | "neutre";
  note?: string;
  forms: {
    nominatif: string;
    genitif: string;
    datif: string;
    accusatif: string;
    instrumental: string;
    prepositionnel: string;
  };
}

export type GrammarCase = "genitif" | "datif" | "accusatif" | "instrumental" | "prepositionnel";

export interface PrepositionSense {
  case: GrammarCase;
  meaning: string; // sens précis en français pour ce cas
  example: { ru: string; fr: string };
}

export interface Preposition {
  id: string;
  ru: string;
  level: CEFRLevel;
  senses: PrepositionSense[]; // une préposition peut gouverner plusieurs cas selon le sens
  note?: string;
}

export interface NumberEntry {
  value: number;
  ru: string;
  transcription: string;
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
