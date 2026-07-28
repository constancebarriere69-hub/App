export const XP_VALUES = {
  alphabet: 15,
  grammar: 15,
  pronunciation: 10,
  vocabulary: 10,
  mindMap: 8,
  spelling: 20, // proportionnel au score de la dictée
  storyRead: 15, // proportionnel au score du quiz
  storyWrite: 15,
  podcastListened: 10,
  podcastQuiz: 15, // proportionnel au score du quiz
  literaryWork: 25,
  conversation: 20, // proportionnel au score
  writingPractice: 20, // proportionnel au score
  pronunciationCheck: 5, // proportionnel au score, par item
  dialogueTurn: 8, // par tour de dialogue vocal réussi
  dialogueScenario: 15, // bonus à la fin d'un scénario complet
};

export const CHEER_MESSAGES = [
  "Молодец! Bien joué !",
  "Отлично! Excellent !",
  "Супер! Génial !",
  "Ты справился! Tu as réussi !",
  "Класс! Trop bien !",
  "Здорово! Formidable !",
];

export function randomCheer(): string {
  return CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
}
