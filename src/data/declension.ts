import type { CaseInfo, NounDeclension } from "../types/content";

// Les 6 cas du russe, dans l'ordre traditionnel d'enseignement.
export const cases: CaseInfo[] = [
  {
    id: "nominatif",
    name: "Именительный",
    nameFr: "Nominatif",
    question: "Кто? Что?",
    usage: "Le sujet de la phrase — la forme « de base » du mot, celle du dictionnaire.",
    example: { ru: "Это стол.", fr: "C'est une table." },
  },
  {
    id: "genitif",
    name: "Родительный",
    nameFr: "Génitif",
    question: "Кого? Чего?",
    usage: "La possession (« de »), l'absence (нет + génitif), et la quantité (после, много, пять...).",
    example: { ru: "У меня нет книги.", fr: "Je n'ai pas de livre." },
  },
  {
    id: "datif",
    name: "Дательный",
    nameFr: "Datif",
    question: "Кому? Чему?",
    usage: "Le destinataire de l'action (« à qui, à quoi »), et les verbes comme нравиться (plaire).",
    example: { ru: "Я дал книгу другу.", fr: "J'ai donné le livre à un ami." },
  },
  {
    id: "accusatif",
    name: "Винительный",
    nameFr: "Accusatif",
    question: "Кого? Что?",
    usage: "Le complément d'objet direct. Pour les noms animés (personnes, animaux), il est identique au génitif.",
    example: { ru: "Я читаю книгу.", fr: "Je lis un livre." },
  },
  {
    id: "instrumental",
    name: "Творительный",
    nameFr: "Instrumental",
    question: "Кем? Чем?",
    usage: "Le moyen ou l'instrument (« avec, au moyen de »), et l'accompagnement avec с (avec).",
    example: { ru: "Я пишу ручкой.", fr: "J'écris avec un stylo." },
  },
  {
    id: "prepositionnel",
    name: "Предложный",
    nameFr: "Prépositionnel",
    question: "О ком? О чём?",
    usage: "Toujours après une préposition — о (à propos de), в (dans), на (sur) — jamais seul.",
    example: { ru: "Я думаю о тебе.", fr: "Je pense à toi." },
  },
];

// Déclinaisons au singulier pour des noms représentatifs de chaque type.
export const declensions: NounDeclension[] = [
  {
    id: "stol",
    word: "стол",
    wordFr: "table",
    gender: "masculin",
    note: "Masculin en consonne dure : le type le plus courant. Inanimé → accusatif = nominatif.",
    forms: {
      nominatif: "стол",
      genitif: "стола",
      datif: "столу",
      accusatif: "стол",
      instrumental: "столом",
      prepositionnel: "о столе",
    },
  },
  {
    id: "student",
    word: "студент",
    wordFr: "étudiant",
    gender: "masculin",
    note: "Masculin animé : l'accusatif copie le génitif, pas le nominatif — retiens bien cette différence avec « стол ».",
    forms: {
      nominatif: "студент",
      genitif: "студента",
      datif: "студенту",
      accusatif: "студента",
      instrumental: "студентом",
      prepositionnel: "о студенте",
    },
  },
  {
    id: "kniga",
    word: "книга",
    wordFr: "livre",
    gender: "féminin",
    note: "Féminin en -а : le type le plus courant pour les noms féminins.",
    forms: {
      nominatif: "книга",
      genitif: "книги",
      datif: "книге",
      accusatif: "книгу",
      instrumental: "книгой",
      prepositionnel: "о книге",
    },
  },
  {
    id: "dver",
    word: "дверь",
    wordFr: "porte",
    gender: "féminin",
    note: "Féminin en -ь (« 3ᵉ déclinaison ») : génitif, datif et prépositionnel sont identiques.",
    forms: {
      nominatif: "дверь",
      genitif: "двери",
      datif: "двери",
      accusatif: "дверь",
      instrumental: "дверью",
      prepositionnel: "о двери",
    },
  },
  {
    id: "okno",
    word: "окно",
    wordFr: "fenêtre",
    gender: "neutre",
    note: "Neutre en -о : le type le plus courant pour les noms neutres. Comme pour le masculin inanimé, accusatif = nominatif.",
    forms: {
      nominatif: "окно",
      genitif: "окна",
      datif: "окну",
      accusatif: "окно",
      instrumental: "окном",
      prepositionnel: "об окне",
    },
  },
];

export function getDeclensionById(id: string): NounDeclension | undefined {
  return declensions.find((d) => d.id === id);
}
