import type { HistoryPeriod } from "../types/content";

// Grandes étapes de l'histoire russe, racontées en phrases russes simples
// avec traduction française, pour apprendre la langue et la culture en
// même temps.
export const russianHistory: HistoryPeriod[] = [
  {
    id: "kievan-rus",
    title: "Naissance de la Rus' de Kiev",
    years: "882",
    icon: "🏰",
    level: "A2",
    paragraphs: [
      { ru: "Князь Олег объединил Новгород и Киев в 882 году.", fr: "Le prince Oleg a unifié Novgorod et Kiev en 882." },
      { ru: "Так появилось первое восточнославянское государство — Киевская Русь.", fr: "Ainsi est né le premier État est-slave : la Rus' de Kiev." },
      { ru: "Столицей нового государства стал город Киев.", fr: "La capitale du nouvel État est devenue la ville de Kiev." },
    ],
    keyFacts: [
      "L'État est fondé en 882 par le prince Oleg.",
      "Kiev en devient la capitale.",
      "C'est la première grande entité politique est-slave.",
    ],
    vocab: [
      { ru: "князь", fr: "prince" },
      { ru: "объединить", fr: "unifier" },
      { ru: "государство", fr: "État" },
      { ru: "столица", fr: "capitale" },
    ],
  },
  {
    id: "bapteme-rus",
    title: "Le baptême de la Rus'",
    years: "988",
    icon: "⛪",
    level: "A2",
    paragraphs: [
      { ru: "Князь Владимир крестил Русь в 988 году.", fr: "Le prince Vladimir a baptisé la Rus' en 988." },
      { ru: "Он выбрал православное христианство как новую религию государства.", fr: "Il a choisi le christianisme orthodoxe comme nouvelle religion de l'État." },
      { ru: "Это событие сильно повлияло на русскую культуру и искусство.", fr: "Cet événement a fortement influencé la culture et l'art russes." },
    ],
    keyFacts: [
      "Le prince Vladimir choisit le christianisme orthodoxe en 988.",
      "Cet événement façonne durablement l'art et la culture russes.",
    ],
    vocab: [
      { ru: "крестить", fr: "baptiser" },
      { ru: "религия", fr: "religion" },
      { ru: "повлиять", fr: "influencer" },
      { ru: "искусство", fr: "art" },
    ],
  },
  {
    id: "joug-mongol",
    title: "Le joug mongol",
    years: "1237 – 1480",
    icon: "🏹",
    level: "A2",
    paragraphs: [
      { ru: "В тринадцатом веке монголы завоевали русские земли.", fr: "Au treizième siècle, les Mongols ont conquis les terres russes." },
      { ru: "Это иго продолжалось почти двести пятьдесят лет.", fr: "Ce joug a duré presque deux cent cinquante ans." },
      { ru: "Русские княжества платили дань монгольским ханам.", fr: "Les principautés russes payaient un tribut aux khans mongols." },
    ],
    keyFacts: [
      "Conquête mongole des terres russes au XIIIe siècle.",
      "Le « joug mongol » dure environ 250 ans.",
      "Les principautés russes paient tribut aux khans.",
    ],
    vocab: [
      { ru: "завоевать", fr: "conquérir" },
      { ru: "иго", fr: "joug" },
      { ru: "продолжаться", fr: "durer" },
      { ru: "дань", fr: "tribut" },
    ],
  },
  {
    id: "ivan-grozny",
    title: "Ivan le Terrible, premier tsar",
    years: "1547",
    icon: "👑",
    level: "B1",
    paragraphs: [
      { ru: "В 1547 году Иван Четвёртый стал первым русским царём.", fr: "En 1547, Ivan IV est devenu le premier tsar russe." },
      { ru: "Его называли Иваном Грозным из-за его сурового характера.", fr: "On l'appelait Ivan le Terrible en raison de son caractère sévère." },
      { ru: "При нём территория России значительно увеличилась.", fr: "Sous son règne, le territoire de la Russie s'est considérablement agrandi." },
    ],
    keyFacts: [
      "Ivan IV devient le premier tsar en 1547.",
      "Surnommé « le Terrible » pour sa sévérité.",
      "Le territoire russe s'étend fortement sous son règne.",
    ],
    vocab: [
      { ru: "царь", fr: "tsar" },
      { ru: "суровый", fr: "sévère" },
      { ru: "характер", fr: "caractère" },
      { ru: "территория", fr: "territoire" },
    ],
  },
  {
    id: "pierre-le-grand",
    title: "Pierre le Grand et Saint-Pétersbourg",
    years: "1703",
    icon: "🚢",
    level: "B1",
    paragraphs: [
      { ru: "Пётр Первый хотел, чтобы Россия стала европейской державой.", fr: "Pierre Ier voulait que la Russie devienne une puissance européenne." },
      { ru: "В 1703 году он основал новый город — Санкт-Петербург.", fr: "En 1703, il a fondé une nouvelle ville : Saint-Pétersbourg." },
      { ru: "Этот город стал новой столицей и «окном в Европу».", fr: "Cette ville est devenue la nouvelle capitale et « une fenêtre sur l'Europe »." },
    ],
    keyFacts: [
      "Pierre Ier veut moderniser et européaniser la Russie.",
      "Fondation de Saint-Pétersbourg en 1703.",
      "La ville devient la nouvelle capitale, symbole d'ouverture sur l'Europe.",
    ],
    vocab: [
      { ru: "держава", fr: "puissance (État)" },
      { ru: "основать", fr: "fonder" },
      { ru: "реформа", fr: "réforme" },
    ],
  },
  {
    id: "guerre-1812",
    title: "La guerre de 1812 contre Napoléon",
    years: "1812",
    icon: "❄️",
    level: "B1",
    paragraphs: [
      { ru: "В 1812 году армия Наполеона вторглась в Россию.", fr: "En 1812, l'armée de Napoléon a envahi la Russie." },
      { ru: "Русская армия и суровая зима остановили французов.", fr: "L'armée russe et l'hiver rigoureux ont arrêté les Français." },
      { ru: "Эта победа стала важной частью русской национальной гордости.", fr: "Cette victoire est devenue une part importante de la fierté nationale russe." },
    ],
    keyFacts: [
      "Napoléon envahit la Russie en 1812.",
      "L'armée russe et l'hiver stoppent l'invasion.",
      "Un épisode fondateur de la fierté nationale russe.",
    ],
    vocab: [
      { ru: "армия", fr: "armée" },
      { ru: "вторгнуться", fr: "envahir" },
      { ru: "победа", fr: "victoire" },
      { ru: "гордость", fr: "fierté" },
    ],
  },
  {
    id: "revolution-1917",
    title: "La révolution de 1917",
    years: "1917",
    icon: "🚩",
    level: "B2",
    paragraphs: [
      { ru: "В 1917 году в России произошла революция.", fr: "En 1917, une révolution a eu lieu en Russie." },
      { ru: "Царь Николай Второй отрёкся от престола.", fr: "Le tsar Nicolas II a abdiqué le trône." },
      { ru: "К власти пришли большевики во главе с Лениным.", fr: "Les bolcheviks, menés par Lénine, sont arrivés au pouvoir." },
    ],
    keyFacts: [
      "Révolution russe de 1917.",
      "Abdication du tsar Nicolas II.",
      "Prise de pouvoir des bolcheviks menés par Lénine.",
    ],
    vocab: [
      { ru: "революция", fr: "révolution" },
      { ru: "отречься", fr: "abdiquer" },
      { ru: "престол", fr: "trône" },
      { ru: "власть", fr: "pouvoir" },
    ],
  },
  {
    id: "guerre-patriotique",
    title: "La Grande Guerre patriotique",
    years: "1941 – 1945",
    icon: "🎖️",
    level: "B2",
    paragraphs: [
      { ru: "В 1941 году нацистская Германия напала на Советский Союз.", fr: "En 1941, l'Allemagne nazie a attaqué l'Union soviétique." },
      { ru: "Война была долгой и очень тяжёлой для советского народа.", fr: "La guerre a été longue et très éprouvante pour le peuple soviétique." },
      { ru: "В 1945 году Советский Союз одержал победу.", fr: "En 1945, l'Union soviétique a remporté la victoire." },
    ],
    keyFacts: [
      "Invasion nazie de l'URSS en 1941.",
      "Guerre longue et extrêmement coûteuse en vies humaines.",
      "Victoire soviétique en 1945.",
    ],
    vocab: [
      { ru: "напасть", fr: "attaquer" },
      { ru: "тяжёлый", fr: "difficile, pénible" },
      { ru: "одержать победу", fr: "remporter la victoire" },
    ],
  },
  {
    id: "chute-urss",
    title: "La chute de l'URSS",
    years: "1991",
    icon: "🏛️",
    level: "B2",
    paragraphs: [
      { ru: "В 1991 году Советский Союз распался на пятнадцать республик.", fr: "En 1991, l'Union soviétique s'est désintégrée en quinze républiques." },
      { ru: "Россия стала отдельным независимым государством.", fr: "La Russie est devenue un État indépendant à part entière." },
      { ru: "Это событие сильно изменило карту мира.", fr: "Cet événement a profondément changé la carte du monde." },
    ],
    keyFacts: [
      "Dissolution de l'URSS en 1991 en quinze républiques.",
      "La Russie devient un État indépendant.",
      "Bouleversement majeur de l'ordre géopolitique mondial.",
    ],
    vocab: [
      { ru: "распасться", fr: "se désintégrer" },
      { ru: "независимый", fr: "indépendant" },
      { ru: "карта", fr: "carte" },
    ],
  },
];

export function getHistoryPeriodById(id: string): HistoryPeriod | undefined {
  return russianHistory.find((h) => h.id === id);
}
