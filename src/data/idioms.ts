import type { Idiom } from "../types/content";

// Expressions idiomatiques et proverbes russes courants, du B2 au C1 — le
// genre de tournures qui ne s'apprennent pas dans la grammaire, seulement par cœur.
export const idioms: Idiom[] = [
  {
    id: "lapsha",
    ru: "Вешать лапшу на уши",
    literal: "Accrocher des nouilles aux oreilles",
    meaning: "Raconter des salades, mentir effrontément.",
    level: "B2",
    example: { ru: "Не вешай мне лапшу на уши!", fr: "Arrête de me raconter des salades !" },
  },
  {
    id: "tarelka",
    ru: "Не в своей тарелке",
    literal: "Ne pas être dans son assiette",
    meaning: "Ne pas se sentir à l'aise — une expression identique en français !",
    level: "B1",
    example: { ru: "Сегодня я не в своей тарелке.", fr: "Aujourd'hui, je ne suis pas dans mon assiette." },
  },
  {
    id: "kapli",
    ru: "Как две капли воды",
    literal: "Comme deux gouttes d'eau",
    meaning: "Se ressembler énormément — exactement comme en français.",
    level: "B1",
    example: { ru: "Она похожа на мать как две капли воды.", fr: "Elle ressemble à sa mère comme deux gouttes d'eau." },
  },
  {
    id: "bakloushi",
    ru: "Бить баклуши",
    literal: "Battre des bûchettes de bois",
    meaning: "Glander, ne rien faire de ses journées.",
    level: "B2",
    example: { ru: "Хватит бить баклуши, иди работай!", fr: "Arrête de glander, va travailler !" },
  },
  {
    id: "yazyk-zuby",
    ru: "Держать язык за зубами",
    literal: "Tenir sa langue derrière les dents",
    meaning: "Se taire, garder un secret.",
    level: "B1",
    example: { ru: "Умей держать язык за зубами.", fr: "Sache tenir ta langue." },
  },
  {
    id: "zaitsy",
    ru: "Убить двух зайцев",
    literal: "Tuer deux lièvres",
    meaning: "Faire d'une pierre deux coups.",
    level: "B1",
    example: { ru: "Так я убью двух зайцев сразу.", fr: "Comme ça, je fais d'une pierre deux coups." },
  },
  {
    id: "rak-svistnet",
    ru: "Когда рак на горе свистнет",
    literal: "Quand l'écrevisse sifflera sur la montagne",
    meaning: "Quand les poules auront des dents — c'est-à-dire jamais.",
    level: "C1",
    example: { ru: "Он вернёт долг, когда рак на горе свистнет.", fr: "Il rendra l'argent quand les poules auront des dents." },
  },
  {
    id: "dusha-piatki",
    ru: "Душа в пятки ушла",
    literal: "L'âme est descendue dans les talons",
    meaning: "Avoir une peur bleue, un coup de sang.",
    level: "C1",
    example: { ru: "От испуга у меня душа в пятки ушла.", fr: "La peur m'a fait un coup de sang." },
  },
  {
    id: "chervyachok",
    ru: "Заморить червячка",
    literal: "Empoisonner le petit ver",
    meaning: "Manger un morceau, se caler l'estomac rapidement.",
    level: "B2",
    example: { ru: "Давай заморим червячка перед фильмом.", fr: "Allons manger un morceau avant le film." },
  },
  {
    id: "zolotnik",
    ru: "Мал золотник, да дорог",
    literal: "Le petit poids est petit, mais précieux",
    meaning: "La valeur ne dépend pas de la taille — l'équivalent de « dans les petits pots les meilleurs onguents ».",
    level: "C1",
  },
  {
    id: "tishe-edesh",
    ru: "Тише едешь, дальше будешь",
    literal: "Plus doucement tu roules, plus loin tu iras",
    meaning: "Qui va lentement va sûrement.",
    level: "B2",
  },
  {
    id: "trud-rybka",
    ru: "Без труда не вытащишь и рыбку из пруда",
    literal: "Sans effort, tu ne sortiras même pas un poisson de l'étang",
    meaning: "On n'a rien sans rien.",
    level: "B2",
  },
  {
    id: "blin-komom",
    ru: "Первый блин комом",
    literal: "La première crêpe est ratée",
    meaning: "Les débuts sont toujours difficiles — on ne réussit pas du premier coup.",
    level: "B1",
    example: { ru: "Не расстраивайся, первый блин комом.", fr: "Ne t'inquiète pas, on ne réussit jamais du premier coup." },
  },
  {
    id: "ni-pukha",
    ru: "Ни пуха ни пера!",
    literal: "Ni plume ni duvet !",
    meaning: "Formule de bonne chance (avant un examen, un entretien...). On répond « К чёрту! » (Au diable !), jamais « merci ».",
    level: "B2",
    example: { ru: "— Удачи на экзамене! — Ни пуха ни пера! — К чёрту!", fr: "— Bonne chance à l'examen ! — Bonne chance ! — Au diable !" },
  },
  {
    id: "vek-zhivi",
    ru: "Век живи, век учись",
    literal: "Vis un siècle, apprends un siècle",
    meaning: "On apprend à tout âge.",
    level: "B1",
  },
];

export function getIdiomOfTheDay(): Idiom {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return idioms[dayOfYear % idioms.length];
}
