import type { GrammarCase, Preposition } from "../types/content";

export const CASE_LABELS: Record<GrammarCase, string> = {
  genitif: "Génitif",
  datif: "Datif",
  accusatif: "Accusatif",
  instrumental: "Instrumental",
  prepositionnel: "Prépositionnel",
};

export const prepositions: Preposition[] = [
  {
    id: "v",
    ru: "в",
    level: "A1",
    note: "La préposition la plus fréquente du russe — son cas change complètement son sens : direction (accusatif) contre position (prépositionnel).",
    senses: [
      {
        case: "accusatif",
        meaning: "mouvement vers l'intérieur de (« dans », avec déplacement)",
        example: { ru: "Я иду в школу.", fr: "Je vais à l'école." },
      },
      {
        case: "prepositionnel",
        meaning: "position à l'intérieur de (« dans », sans déplacement)",
        example: { ru: "Я учусь в школе.", fr: "J'étudie à l'école." },
      },
    ],
  },
  {
    id: "na",
    ru: "на",
    level: "A1",
    note: "Comme в, но pour les surfaces et certains lieux ouverts (гараж exceptés) — на почте, на работе, на улице.",
    senses: [
      {
        case: "accusatif",
        meaning: "mouvement vers une surface ou un événement (« sur, à »)",
        example: { ru: "Я иду на работу.", fr: "Je vais au travail." },
      },
      {
        case: "prepositionnel",
        meaning: "position sur une surface ou à un événement (« sur, à »)",
        example: { ru: "Книга на столе.", fr: "Le livre est sur la table." },
      },
    ],
  },
  {
    id: "s",
    ru: "с / со",
    level: "A1",
    note: "Deux sens totalement différents selon le cas : « avec » (instrumental) et « depuis, en provenance de » (génitif).",
    senses: [
      {
        case: "instrumental",
        meaning: "accompagnement (« avec »)",
        example: { ru: "Я иду с другом.", fr: "Je vais avec un ami." },
      },
      {
        case: "genitif",
        meaning: "provenance depuis une surface ou le début d'un moment (« depuis, de »)",
        example: { ru: "Я иду с работы.", fr: "Je reviens du travail." },
      },
    ],
  },
  {
    id: "iz",
    ru: "из",
    level: "A1",
    senses: [
      {
        case: "genitif",
        meaning: "provenance depuis l'intérieur de (« de, en provenance de »)",
        example: { ru: "Я из Франции.", fr: "Je viens de France." },
      },
    ],
  },
  {
    id: "ot",
    ru: "от",
    level: "A2",
    note: "Provenance depuis un point précis ou une personne — à ne pas confondre avec из (intérieur) et с (surface).",
    senses: [
      {
        case: "genitif",
        meaning: "éloignement depuis un point ou une personne (« de la part de, loin de »)",
        example: { ru: "Письмо от мамы.", fr: "Une lettre de la part de maman." },
      },
    ],
  },
  {
    id: "do",
    ru: "до",
    level: "A2",
    senses: [
      {
        case: "genitif",
        meaning: "limite dans l'espace ou le temps (« jusqu'à »)",
        example: { ru: "Я работаю до пяти.", fr: "Je travaille jusqu'à cinq heures." },
      },
    ],
  },
  {
    id: "u",
    ru: "у",
    level: "A1",
    note: "Sert aussi à exprimer la possession : у меня есть... (« j'ai... », littéralement « chez moi il y a »).",
    senses: [
      {
        case: "genitif",
        meaning: "proximité, « chez » quelqu'un, ou possession",
        example: { ru: "Я живу у бабушки.", fr: "J'habite chez ma grand-mère." },
      },
    ],
  },
  {
    id: "k",
    ru: "к / ко",
    level: "A2",
    senses: [
      {
        case: "datif",
        meaning: "direction vers une personne ou un lieu (« vers, chez »)",
        example: { ru: "Я иду к врачу.", fr: "Je vais chez le médecin." },
      },
    ],
  },
  {
    id: "po",
    ru: "по",
    level: "B1",
    note: "Une des prépositions les plus polyvalentes : mouvement le long de, moyen de communication, répartition, ou sujet d'étude.",
    senses: [
      {
        case: "datif",
        meaning: "déplacement le long de / à travers (« le long de, dans »), ou moyen (« par »)",
        example: { ru: "Я гуляю по парку.", fr: "Je me promène dans le parc." },
      },
      {
        case: "datif",
        meaning: "sujet, domaine (« de, en »)",
        example: { ru: "Урок по математике.", fr: "Un cours de mathématiques." },
      },
    ],
  },
  {
    id: "o",
    ru: "о / об / обо",
    level: "A2",
    senses: [
      {
        case: "prepositionnel",
        meaning: "sujet dont on parle ou pense (« à propos de, sur »)",
        example: { ru: "Я думаю о тебе.", fr: "Je pense à toi." },
      },
    ],
  },
  {
    id: "pri",
    ru: "при",
    level: "B1",
    senses: [
      {
        case: "prepositionnel",
        meaning: "proximité immédiate, présence, ou époque (« près de, en présence de, du temps de »)",
        example: { ru: "При университете есть библиотека.", fr: "Il y a une bibliothèque près de l'université." },
      },
    ],
  },
  {
    id: "dlya",
    ru: "для",
    level: "A2",
    senses: [
      {
        case: "genitif",
        meaning: "destination, but (« pour »)",
        example: { ru: "Это подарок для тебя.", fr: "C'est un cadeau pour toi." },
      },
    ],
  },
  {
    id: "bez",
    ru: "без",
    level: "A2",
    senses: [
      {
        case: "genitif",
        meaning: "absence (« sans »)",
        example: { ru: "Кофе без сахара.", fr: "Un café sans sucre." },
      },
    ],
  },
  {
    id: "nad",
    ru: "над",
    level: "B1",
    senses: [
      {
        case: "instrumental",
        meaning: "position au-dessus de, sans contact (« au-dessus de »)",
        example: { ru: "Лампа над столом.", fr: "La lampe est au-dessus de la table." },
      },
    ],
  },
  {
    id: "pod",
    ru: "под",
    level: "B1",
    note: "Comme в/на, под change de cas selon qu'il y a mouvement ou non.",
    senses: [
      {
        case: "instrumental",
        meaning: "position en dessous de, sans mouvement (« sous »)",
        example: { ru: "Кот под столом.", fr: "Le chat est sous la table." },
      },
      {
        case: "accusatif",
        meaning: "mouvement vers le dessous de (« sous »)",
        example: { ru: "Кот залез под стол.", fr: "Le chat s'est glissé sous la table." },
      },
    ],
  },
  {
    id: "za",
    ru: "за",
    level: "B1",
    note: "Très polyvalent : position derrière, mouvement vers l'arrière, mais aussi « pendant » une durée ou « pour » un prix.",
    senses: [
      {
        case: "instrumental",
        meaning: "position derrière, sans mouvement (« derrière »)",
        example: { ru: "Сад за домом.", fr: "Le jardin est derrière la maison." },
      },
      {
        case: "accusatif",
        meaning: "mouvement vers l'arrière de, ou durée/prix (« derrière », « pour », « en »)",
        example: { ru: "Спасибо за подарок.", fr: "Merci pour le cadeau." },
      },
    ],
  },
  {
    id: "pered",
    ru: "перед",
    level: "B1",
    senses: [
      {
        case: "instrumental",
        meaning: "position devant, dans l'espace ou le temps (« devant, avant »)",
        example: { ru: "Перед домом растёт дерево.", fr: "Un arbre pousse devant la maison." },
      },
    ],
  },
  {
    id: "cherez",
    ru: "через",
    level: "B1",
    senses: [
      {
        case: "accusatif",
        meaning: "traversée d'un lieu, ou délai (« à travers », « dans + durée »)",
        example: { ru: "Я вернусь через час.", fr: "Je reviens dans une heure." },
      },
    ],
  },
  {
    id: "mezhdu",
    ru: "между",
    level: "B1",
    senses: [
      {
        case: "instrumental",
        meaning: "position entre deux éléments (« entre »)",
        example: { ru: "Между нами есть секрет.", fr: "Il y a un secret entre nous." },
      },
    ],
  },
];

export function getPrepositionById(id: string): Preposition | undefined {
  return prepositions.find((p) => p.id === id);
}
