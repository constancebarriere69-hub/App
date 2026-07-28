import type { NumberEntry } from "../types/content";

export const numbers: NumberEntry[] = [
  { value: 0, ru: "ноль", transcription: "nol" },
  { value: 1, ru: "один", transcription: "adin" },
  { value: 2, ru: "два", transcription: "dva" },
  { value: 3, ru: "три", transcription: "tri" },
  { value: 4, ru: "четыре", transcription: "tchetyre" },
  { value: 5, ru: "пять", transcription: "piat" },
  { value: 6, ru: "шесть", transcription: "chest" },
  { value: 7, ru: "семь", transcription: "siem" },
  { value: 8, ru: "восемь", transcription: "vosiem" },
  { value: 9, ru: "девять", transcription: "dieviat" },
  { value: 10, ru: "десять", transcription: "diesiat" },
  { value: 11, ru: "одиннадцать", transcription: "adinnattsat" },
  { value: 12, ru: "двенадцать", transcription: "dvienattsat" },
  { value: 13, ru: "тринадцать", transcription: "trinattsat" },
  { value: 14, ru: "четырнадцать", transcription: "tchetyrnattsat" },
  { value: 15, ru: "пятнадцать", transcription: "piatnattsat" },
  { value: 16, ru: "шестнадцать", transcription: "chestnattsat" },
  { value: 17, ru: "семнадцать", transcription: "siemnattsat" },
  { value: 18, ru: "восемнадцать", transcription: "vosiemnattsat" },
  { value: 19, ru: "девятнадцать", transcription: "dieviatnattsat" },
  { value: 20, ru: "двадцать", transcription: "dvattsat" },
  { value: 30, ru: "тридцать", transcription: "trittsat" },
  { value: 40, ru: "сорок", transcription: "sorak" },
  { value: 50, ru: "пятьдесят", transcription: "piatdiesiat" },
  { value: 60, ru: "шестьдесят", transcription: "chestdiesiat" },
  { value: 70, ru: "семьдесят", transcription: "siemdiesiat" },
  { value: 80, ru: "восемьдесят", transcription: "vosiemdiesiat" },
  { value: 90, ru: "девяносто", transcription: "dievianosta" },
  { value: 100, ru: "сто", transcription: "sto" },
];

export interface AgreementRule {
  id: string;
  title: string;
  range: string;
  explanation: string;
  examples: { ru: string; fr: string }[];
}

// La règle qui rend les nombres russes difficiles : le nom qui suit change
// de cas (et parfois de nombre) selon le dernier chiffre du nombre.
export const agreementRules: AgreementRule[] = [
  {
    id: "un",
    title: "Se termine par 1 (mais pas 11)",
    range: "1, 21, 31, 41…",
    explanation: "Le nom reste au nominatif singulier. « Один » s'accorde en genre avec le nom : один/одна/одно.",
    examples: [
      { ru: "один стол", fr: "une table (masc.)" },
      { ru: "одна книга", fr: "un livre (fém.)" },
      { ru: "двадцать один стол", fr: "vingt-et-une tables" },
    ],
  },
  {
    id: "deux-quatre",
    title: "Se termine par 2, 3 ou 4 (mais pas 12, 13, 14)",
    range: "2-4, 22-24, 32-34…",
    explanation: "Le nom passe au génitif singulier. « Два » a une forme féminine : две.",
    examples: [
      { ru: "два стола", fr: "deux tables" },
      { ru: "две книги", fr: "deux livres (fém.)" },
      { ru: "три окна", fr: "trois fenêtres" },
    ],
  },
  {
    id: "cinq-plus",
    title: "Se termine par 5-9, 0, ou 11 à 14",
    range: "5-20, 25-30, 100…",
    explanation: "Le nom passe au génitif pluriel — y compris 11 à 14, qui suivent toujours cette règle malgré leur terminaison.",
    examples: [
      { ru: "пять столов", fr: "cinq tables" },
      { ru: "одиннадцать книг", fr: "onze livres" },
      { ru: "двадцать окон", fr: "vingt fenêtres" },
    ],
  },
];
