import type { MotionVerbPair } from "../types/content";

// Les verbes de mouvement : un deuxième système à part entière, en plus de
// l'aspect classique. Chaque verbe de déplacement existe en deux versions :
// unidirectionnelle (un trajet précis, en cours) et multidirectionnelle
// (habitude, aller-retour, capacité générale).
export const motionVerbs: MotionVerbPair[] = [
  {
    id: "idti-khodit",
    unidirectional: "идти",
    unidirectionalFr: "aller (à pied, dans une direction)",
    multidirectional: "ходить",
    multidirectionalFr: "aller (à pied, habituellement)",
    meaning: "Se déplacer à pied",
    level: "B1",
    exampleUnidirectional: { ru: "Я иду в школу.", fr: "Je vais à l'école (là, maintenant, dans une direction précise)." },
    exampleMultidirectional: { ru: "Я хожу в школу каждый день.", fr: "Je vais à l'école tous les jours (habitude)." },
  },
  {
    id: "ekhat-ezdit",
    unidirectional: "ехать",
    unidirectionalFr: "aller (en véhicule, dans une direction)",
    multidirectional: "ездить",
    multidirectionalFr: "aller (en véhicule, habituellement)",
    meaning: "Se déplacer en véhicule",
    level: "B1",
    exampleUnidirectional: { ru: "Мы едем на дачу.", fr: "Nous allons à la datcha (là, maintenant)." },
    exampleMultidirectional: { ru: "Мы ездим на дачу каждое лето.", fr: "Nous allons à la datcha chaque été (habitude)." },
  },
  {
    id: "bezhat-begat",
    unidirectional: "бежать",
    unidirectionalFr: "courir (dans une direction)",
    multidirectional: "бегать",
    multidirectionalFr: "courir (habituellement, sans direction fixe)",
    meaning: "Courir",
    level: "B2",
    exampleUnidirectional: { ru: "Мальчик бежит домой.", fr: "Le garçon court vers la maison (une direction précise)." },
    exampleMultidirectional: { ru: "Я бегаю по утрам.", fr: "Je fais du jogging le matin (habitude, sans direction précise)." },
  },
  {
    id: "letet-letat",
    unidirectional: "лететь",
    unidirectionalFr: "voler, aller en avion (dans une direction)",
    multidirectional: "летать",
    multidirectionalFr: "voler, aller en avion (habituellement)",
    meaning: "Se déplacer en volant",
    level: "B2",
    exampleUnidirectional: { ru: "Самолёт летит в Москву.", fr: "L'avion vole vers Moscou (trajet en cours)." },
    exampleMultidirectional: { ru: "Я часто летаю в командировки.", fr: "Je pars souvent en avion pour le travail (habitude)." },
  },
  {
    id: "plyt-plavat",
    unidirectional: "плыть",
    unidirectionalFr: "nager, naviguer (dans une direction)",
    multidirectional: "плавать",
    multidirectionalFr: "nager, savoir nager (en général)",
    meaning: "Se déplacer dans l'eau",
    level: "B2",
    exampleUnidirectional: { ru: "Лодка плывёт к берегу.", fr: "Le bateau navigue vers la rive (une direction)." },
    exampleMultidirectional: { ru: "Я хорошо плаваю.", fr: "Je nage bien (capacité générale)." },
  },
  {
    id: "nesti-nosit",
    unidirectional: "нести",
    unidirectionalFr: "porter (dans une direction, à pied)",
    multidirectional: "носить",
    multidirectionalFr: "porter (habituellement) / porter (vêtements)",
    meaning: "Porter quelque chose en se déplaçant",
    level: "B2",
    exampleUnidirectional: { ru: "Она несёт сумку домой.", fr: "Elle porte le sac vers la maison (trajet précis)." },
    exampleMultidirectional: { ru: "Он всегда носит очки.", fr: "Il porte toujours des lunettes (habitude, état)." },
  },
];
