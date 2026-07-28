import type { DialogueScenario } from "../types/content";

// Scénarios pour la plateforme de dialogue vocal : Миша (ou un personnage
// du scénario) parle à voix haute, l'apprenant répond au micro en russe.
export const dialogues: DialogueScenario[] = [
  {
    id: "connaissance",
    title: "Faire connaissance",
    icon: "👋",
    level: "A1",
    npcName: "Миша",
    description: "Un premier échange tout simple : se présenter et dire d'où l'on vient.",
    turns: [
      {
        npc: { ru: "Привет! Как тебя зовут?", fr: "Salut ! Comment tu t'appelles ?" },
        hint: "Dis ton prénom avec « меня зовут… ».",
        modelAnswer: { ru: "Меня зовут Анна.", fr: "Je m'appelle Anna." },
        keywords: ["зовут", "меня зовут"],
      },
      {
        npc: { ru: "Очень приятно! Откуда ты?", fr: "Enchanté ! D'où viens-tu ?" },
        hint: "Dis d'où tu viens avec « я из… ».",
        modelAnswer: { ru: "Я из Франции.", fr: "Je viens de France." },
        keywords: ["я из", "из франции", "из россии", "из бельгии"],
      },
      {
        npc: { ru: "Я тоже учу русский язык. А ты студент?", fr: "Moi aussi j'apprends le russe. Et toi, tu es étudiant ?" },
        hint: "Réponds « да, я студент » ou « нет, я работаю ».",
        modelAnswer: { ru: "Да, я студент.", fr: "Oui, je suis étudiant." },
        keywords: ["студент", "работаю", "да", "нет"],
      },
      {
        npc: { ru: "Здорово! До встречи!", fr: "Génial ! À bientôt !" },
        hint: "Dis au revoir : « до свидания » ou « пока ».",
        modelAnswer: { ru: "До свидания!", fr: "Au revoir !" },
        keywords: ["свидания", "пока"],
      },
    ],
  },
  {
    id: "cafe",
    title: "Au café",
    icon: "☕",
    level: "A1",
    npcName: "Олег",
    description: "Commande une boisson et une pâtisserie dans un café russe.",
    turns: [
      {
        npc: { ru: "Здравствуйте! Что вы хотите заказать?", fr: "Bonjour ! Que voulez-vous commander ?" },
        hint: "Commande une boisson : « я хочу чай » ou « я хочу кофе ».",
        modelAnswer: { ru: "Я хочу кофе, пожалуйста.", fr: "Je voudrais un café, s'il vous plaît." },
        keywords: ["хочу", "кофе", "чай"],
      },
      {
        npc: { ru: "Хорошо! С сахаром?", fr: "D'accord ! Avec du sucre ?" },
        hint: "Réponds « да, с сахаром » ou « нет, без сахара ».",
        modelAnswer: { ru: "Да, с сахаром.", fr: "Oui, avec du sucre." },
        keywords: ["сахар", "да", "нет"],
      },
      {
        npc: { ru: "Что-нибудь ещё? Может быть, пирожное?", fr: "Autre chose ? Peut-être une pâtisserie ?" },
        hint: "Réponds « да, пожалуйста » ou « нет, спасибо ».",
        modelAnswer: { ru: "Нет, спасибо, это всё.", fr: "Non merci, ce sera tout." },
        keywords: ["спасибо", "да", "нет", "пирожное"],
      },
      {
        npc: { ru: "Хорошо, это будет триста рублей.", fr: "D'accord, ça fera trois cents roubles." },
        hint: "Remercie : « спасибо большое ».",
        modelAnswer: { ru: "Спасибо большое!", fr: "Merci beaucoup !" },
        keywords: ["спасибо"],
      },
    ],
  },
  {
    id: "chemin",
    title: "Demander son chemin",
    icon: "🧭",
    level: "A2",
    npcName: "Настя",
    description: "Retrouve ton chemin vers le musée en pleine ville.",
    turns: [
      {
        npc: { ru: "Здравствуйте! Вам помочь?", fr: "Bonjour ! Je peux vous aider ?" },
        hint: "Demande où se trouve le musée : « где музей? »",
        modelAnswer: { ru: "Извините, где музей?", fr: "Excusez-moi, où est le musée ?" },
        keywords: ["где", "музей"],
      },
      {
        npc: { ru: "Музей на площади, недалеко отсюда.", fr: "Le musée est sur la place, pas loin d'ici." },
        hint: "Demande si c'est loin : « это далеко? »",
        modelAnswer: { ru: "Это далеко?", fr: "C'est loin ?" },
        keywords: ["далеко", "близко"],
      },
      {
        npc: { ru: "Нет, близко! Идите прямо, потом налево.", fr: "Non, c'est proche ! Allez tout droit, puis à gauche." },
        hint: "Remercie pour l'aide : « спасибо большое ».",
        modelAnswer: { ru: "Спасибо большое за помощь!", fr: "Merci beaucoup pour votre aide !" },
        keywords: ["спасибо"],
      },
      {
        npc: { ru: "Пожалуйста! Хорошей прогулки!", fr: "Je vous en prie ! Bonne balade !" },
        hint: "Dis au revoir.",
        modelAnswer: { ru: "До свидания!", fr: "Au revoir !" },
        keywords: ["свидания", "пока"],
      },
    ],
  },
  {
    id: "hotel",
    title: "Réserver une chambre d'hôtel",
    icon: "🏨",
    level: "B1",
    npcName: "Виктор",
    description: "Réserve une chambre à la réception d'un hôtel russe.",
    turns: [
      {
        npc: { ru: "Добрый день! Чем могу помочь?", fr: "Bonjour ! Comment puis-je vous aider ?" },
        hint: "Dis que tu voudrais réserver une chambre : « я хотел бы забронировать номер ».",
        modelAnswer: { ru: "Я хотел бы забронировать номер.", fr: "Je voudrais réserver une chambre." },
        keywords: ["номер", "забронировать", "хочу"],
      },
      {
        npc: { ru: "На сколько ночей?", fr: "Pour combien de nuits ?" },
        hint: "Donne un nombre de nuits, par exemple « на три ночи ».",
        modelAnswer: { ru: "На три ночи.", fr: "Pour trois nuits." },
        keywords: ["ноч", "на"],
      },
      {
        npc: { ru: "У нас есть номер с видом на море. Это подойдёт?", fr: "Nous avons une chambre avec vue sur la mer. Ça vous convient ?" },
        hint: "Réponds « да, отлично » ou pose une question.",
        modelAnswer: { ru: "Да, отлично, я согласен.", fr: "Oui, parfait, je suis d'accord." },
        keywords: ["да", "нет", "отлично"],
      },
      {
        npc: { ru: "Прекрасно! Ваш паспорт, пожалуйста.", fr: "Parfait ! Votre passeport, s'il vous plaît." },
        hint: "Dis « вот, пожалуйста » en tendant ton passeport.",
        modelAnswer: { ru: "Вот, пожалуйста.", fr: "Voici, s'il vous plaît." },
        keywords: ["вот", "пожалуйста"],
      },
      {
        npc: { ru: "Спасибо! Приятного отдыха!", fr: "Merci ! Bon séjour !" },
        hint: "Remercie en retour.",
        modelAnswer: { ru: "Спасибо, вам тоже!", fr: "Merci, à vous aussi !" },
        keywords: ["спасибо"],
      },
    ],
  },
  {
    id: "entretien",
    title: "Entretien d'embauche",
    icon: "💼",
    level: "C1",
    npcName: "Ольга Ивановна",
    description: "Un entretien d'embauche formel : parle de toi dans un registre soutenu.",
    turns: [
      {
        npc: { ru: "Расскажите немного о себе.", fr: "Parlez-moi un peu de vous." },
        hint: "Présente brièvement tes études ou ton métier.",
        modelAnswer: { ru: "Я закончил университет и работаю переводчиком.", fr: "J'ai terminé mes études universitaires et je travaille comme traducteur." },
        keywords: ["я", "работа", "университет"],
      },
      {
        npc: { ru: "Почему вы хотите работать в нашей компании?", fr: "Pourquoi voulez-vous travailler dans notre entreprise ?" },
        hint: "Explique ta motivation avec « потому что ».",
        modelAnswer: { ru: "Потому что мне интересна ваша компания.", fr: "Parce que votre entreprise m'intéresse." },
        keywords: ["потому что", "интерес"],
      },
      {
        npc: { ru: "Какие у вас сильные стороны?", fr: "Quels sont vos points forts ?" },
        hint: "Cite une qualité : « я очень ответственный » ou « трудолюбивый ».",
        modelAnswer: { ru: "Я очень ответственный и трудолюбивый.", fr: "Je suis très responsable et travailleur." },
        keywords: ["ответственн", "трудолюбив", "сильн"],
      },
      {
        npc: { ru: "А какие у вас слабые стороны?", fr: "Et quels sont vos points faibles ?" },
        hint: "Réponds avec nuance, par exemple « иногда я… ».",
        modelAnswer: { ru: "Иногда я слишком требователен к себе.", fr: "Parfois je suis trop exigeant envers moi-même." },
        keywords: ["иногда", "слаб"],
      },
      {
        npc: { ru: "Спасибо за интервью, мы свяжемся с вами.", fr: "Merci pour l'entretien, nous vous recontacterons." },
        hint: "Remercie poliment pour conclure.",
        modelAnswer: { ru: "Спасибо за возможность, до свидания!", fr: "Merci pour cette opportunité, au revoir !" },
        keywords: ["спасибо", "свидания"],
      },
    ],
  },
];

export function getDialogueById(id: string): DialogueScenario | undefined {
  return dialogues.find((d) => d.id === id);
}
