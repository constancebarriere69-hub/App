import type { Palier } from "../types/content";
import { russianAlphabet } from "./alphabet";

export const paliers: Palier[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-1",
    index: 1,
    title: "L'alphabet et les sons",
    subtitle: "Première rencontre avec le cyrillique",
    color: "rose",
    level: "A1",
    alphabet: russianAlphabet,
    grammar: [
      {
        title: "Il n'y a pas d'articles en russe",
        explanation:
          "Le russe n'a ni « le / la / les » ni « un / une / des ». On dit simplement « дом » pour « la maison » ou « une maison » : le contexte fait la différence.",
        examples: [
          { ru: "дом", fr: "la maison / une maison" },
          { ru: "книга", fr: "le livre / un livre" },
        ],
        tip: "C'est une bonne nouvelle : une difficulté du français en moins à gérer !",
      },
      {
        title: "L'ordre des mots est libre",
        explanation:
          "Grâce aux déclinaisons (que nous verrons plus tard), l'ordre des mots dans la phrase russe est plus souple qu'en français. Pour l'instant, on garde l'ordre sujet-verbe-complément, le plus naturel.",
        examples: [{ ru: "Я читаю книгу.", fr: "Je lis un livre." }],
      },
    ],
    pronunciation: {
      title: "Les sons qui n'existent pas en français",
      explanation:
        "Trois sons méritent une attention particulière dès le début : ы, х et le р roulé.",
      items: [
        { ru: "ы", frenchSound: "son grave, bouche presque fermée, entre « i » et « ou »", fr: "voyelle propre au russe" },
        { ru: "х", frenchSound: "raclement de gorge, comme la « jota » espagnole", fr: "consonne gutturale" },
        { ru: "р", frenchSound: "r roulé avec le bout de la langue, comme en espagnol/italien", fr: "consonne roulée" },
      ],
    },
    spelling: [
      { ru: "мама", fr: "maman" },
      { ru: "дом", fr: "maison" },
      { ru: "кот", fr: "chat" },
      { ru: "вода", fr: "eau" },
      { ru: "школа", fr: "école" },
      { ru: "ты", fr: "tu", hint: "contient le son ы" },
    ],
    vocabulary: [
      { ru: "привет", fr: "salut", transcription: "privét" },
      { ru: "да", fr: "oui", transcription: "da" },
      { ru: "нет", fr: "non", transcription: "niet" },
      { ru: "спасибо", fr: "merci", transcription: "spassiba" },
      { ru: "пожалуйста", fr: "s'il te plaît / je t'en prie", transcription: "pajalousta" },
      { ru: "я", fr: "je", transcription: "ia" },
      { ru: "ты", fr: "tu", transcription: "ty" },
      { ru: "дом", fr: "maison", transcription: "dom" },
      { ru: "кот", fr: "chat", transcription: "kot" },
      { ru: "вода", fr: "eau", transcription: "vada" },
    ],
    mindMap: {
      center: "Alphabet russe",
      branches: [
        { label: "Voyelles (10)", children: ["а", "е / ё", "и / й", "о", "у", "ы / э", "ю / я"] },
        { label: "Consonnes (20)", children: ["б в г д ж з", "к л м н п р", "с т ф х ц", "ч ш щ"] },
        { label: "Signes (2)", children: ["ъ signe dur", "ь signe mou"] },
        { label: "Pièges pour francophones", children: ["р roulé", "х guttural", "ы unique"] },
      ],
    },
    story: {
      title: "Знакомство (La rencontre)",
      paragraphs: [
        { ru: "Привет! Я кот.", fr: "Salut ! Je suis un chat." },
        { ru: "Это дом. Это вода.", fr: "Voici une maison. Voici de l'eau." },
        { ru: "Да, спасибо!", fr: "Oui, merci !" },
      ],
      questions: [
        {
          question: "Que veut dire « привет » ?",
          choices: ["Au revoir", "Salut", "Merci"],
          correctIndex: 1,
        },
        {
          question: "Qui parle dans l'histoire ?",
          choices: ["Un chat", "Une maison", "De l'eau"],
          correctIndex: 0,
        },
      ],
      writingPrompt: "Écris trois phrases très simples en russe en réutilisant « привет », « да » et « спасибо ».",
      writingHint: "Exemple possible : Привет! Да, спасибо.",
    },
    podcast: {
      title: "Épisode 1 — Premiers mots",
      description: "Un très court dialogue avec les tout premiers mots de russe : salutations et politesse.",
      lines: [
        { speaker: "Анна", ru: "Привет!", fr: "Salut !" },
        { speaker: "Борис", ru: "Привет! Как дела?", fr: "Salut ! Comment ça va ?" },
        { speaker: "Анна", ru: "Спасибо, хорошо. А ты?", fr: "Merci, bien. Et toi ?" },
        { speaker: "Борис", ru: "Тоже хорошо, спасибо.", fr: "Bien aussi, merci." },
      ],
      quiz: [
        {
          question: "Comment dit-on « comment ça va ? » en russe ?",
          choices: ["Спасибо", "Как дела?", "До свидания"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-2",
    index: 2,
    title: "Salutations et présentations",
    subtitle: "Se présenter et engager la conversation",
    color: "orange",
    level: "A1",
    grammar: [
      {
        title: "Le verbe « être » disparaît au présent",
        explanation:
          "En russe, le verbe быть (être) ne s'utilise quasiment jamais au présent. « Je suis étudiant » se dit simplement « Я студент », mot à mot « Je étudiant ».",
        examples: [
          { ru: "Я студент.", fr: "Je suis étudiant." },
          { ru: "Она врач.", fr: "Elle est médecin." },
        ],
        tip: "Pas de « suis / es / est » à conjuguer : une vraie simplification !",
      },
      {
        title: "Les pronoms personnels",
        explanation: "Les six pronoms de base à connaître par cœur.",
        examples: [
          { ru: "я", fr: "je" },
          { ru: "ты", fr: "tu" },
          { ru: "он / она / оно", fr: "il / elle / il (neutre)" },
          { ru: "мы", fr: "nous" },
          { ru: "вы", fr: "vous" },
          { ru: "они", fr: "ils / elles" },
        ],
      },
    ],
    pronunciation: {
      title: "L'intonation des questions",
      explanation:
        "Le russe ne change pas l'ordre des mots pour poser une question : c'est la montée de la voix sur le mot important qui signale la question.",
      items: [
        { ru: "Как дела?", frenchSound: "monter la voix sur « как »", fr: "Comment ça va ?" },
        { ru: "Тебя зовут Анна?", frenchSound: "monter la voix sur « Анна »", fr: "Tu t'appelles Anna ?" },
      ],
    },
    spelling: [
      { ru: "зовут", fr: "on appelle" },
      { ru: "меня", fr: "moi (accusatif)" },
      { ru: "студент", fr: "étudiant" },
      { ru: "откуда", fr: "d'où" },
      { ru: "Франция", fr: "France" },
      { ru: "друг", fr: "ami" },
    ],
    vocabulary: [
      { ru: "меня зовут", fr: "je m'appelle", transcription: "menia zavout" },
      { ru: "как тебя зовут?", fr: "comment tu t'appelles ?", transcription: "kak tebia zavout" },
      { ru: "очень приятно", fr: "enchanté(e)", transcription: "otchen priatna" },
      { ru: "откуда ты?", fr: "d'où viens-tu ?", transcription: "atkouda ty" },
      { ru: "я из Франции", fr: "je viens de France", transcription: "ia iz frantsii" },
      { ru: "студент / студентка", fr: "étudiant / étudiante", transcription: "stoudient / stoudientka" },
      { ru: "друг / подруга", fr: "ami / amie", transcription: "droug / padrouga" },
      { ru: "до свидания", fr: "au revoir", transcription: "da svidania" },
      { ru: "пока", fr: "salut (familier)", transcription: "paka" },
      { ru: "рад / рада", fr: "content / contente (m/f)", transcription: "rad / rada" },
    ],
    mindMap: {
      center: "Se présenter",
      branches: [
        { label: "Nom", children: ["Меня зовут…", "Как тебя зовут?"] },
        { label: "Origine", children: ["Я из Франции", "Откуда ты?"] },
        { label: "Statut", children: ["Я студент/ка", "Я работаю (je travaille)"] },
        { label: "Politesse", children: ["Очень приятно", "До свидания", "Пока"] },
      ],
    },
    story: {
      title: "Новый друг (Un nouvel ami)",
      paragraphs: [
        { ru: "Привет! Меня зовут Лиза. Я студентка.", fr: "Salut ! Je m'appelle Lisa. Je suis étudiante." },
        { ru: "Я из Франции. А ты откуда?", fr: "Je viens de France. Et toi, d'où viens-tu ?" },
        { ru: "Очень приятно! До свидания, друг!", fr: "Enchantée ! Au revoir, ami !" },
      ],
      questions: [
        {
          question: "Comment s'appelle la narratrice ?",
          choices: ["Анна", "Лиза", "Борис"],
          correctIndex: 1,
        },
        {
          question: "D'où vient-elle ?",
          choices: ["De Russie", "De France", "D'Espagne"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Présente-toi en russe en 3 phrases : ton prénom, ton origine et ton statut (étudiant·e, ami·e...).",
      writingHint: "Structure : Меня зовут… Я из… Я студент/студентка.",
    },
    podcast: {
      title: "Épisode 2 — Faire connaissance",
      description: "Deux personnes se rencontrent pour la première fois et échangent leurs prénoms et origines.",
      lines: [
        { speaker: "Марк", ru: "Привет! Как тебя зовут?", fr: "Salut ! Comment tu t'appelles ?" },
        { speaker: "Оля", ru: "Меня зовут Оля. А тебя?", fr: "Je m'appelle Olia. Et toi ?" },
        { speaker: "Марк", ru: "Меня зовут Марк. Очень приятно!", fr: "Je m'appelle Marc. Enchanté !" },
        { speaker: "Оля", ru: "Откуда ты, Марк?", fr: "D'où viens-tu, Marc ?" },
        { speaker: "Марк", ru: "Я из Франции. А ты?", fr: "Je viens de France. Et toi ?" },
        { speaker: "Оля", ru: "Я из России. Пока, Марк!", fr: "Je viens de Russie. Salut, Marc !" },
      ],
      quiz: [
        {
          question: "D'où vient Оля ?",
          choices: ["De France", "De Russie", "D'Italie"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-3",
    index: 3,
    title: "Genre et pluriel des noms",
    subtitle: "Masculin, féminin, neutre",
    color: "amber",
    level: "A1",
    grammar: [
      {
        title: "Les trois genres",
        explanation:
          "Chaque nom russe a un genre déterminé par sa terminaison : consonne = masculin, -а/-я = féminin, -о/-е = neutre.",
        examples: [
          { ru: "дом (masculin)", fr: "maison" },
          { ru: "книга (féminin)", fr: "livre" },
          { ru: "окно (neutre)", fr: "fenêtre" },
        ],
        tip: "Regarde toujours la dernière lettre du mot pour deviner son genre.",
      },
      {
        title: "Le pluriel régulier",
        explanation:
          "Masculin et féminin prennent -ы ou -и au pluriel ; le neutre prend -а ou -я.",
        examples: [
          { ru: "дом → дома", fr: "maison → maisons" },
          { ru: "книга → книги", fr: "livre → livres" },
          { ru: "окно → окна", fr: "fenêtre → fenêtres" },
        ],
      },
    ],
    pronunciation: {
      title: "Les voyelles non accentuées",
      explanation:
        "En russe, seule la syllabe accentuée se prononce clairement. Les « о » non accentués se prononcent souvent comme un « a ».",
      items: [
        { ru: "молоко", frenchSound: "« malako », accent sur le dernier о", fr: "lait" },
        { ru: "хорошо", frenchSound: "« kharacho », accent sur le dernier о", fr: "bien" },
      ],
    },
    spelling: [
      { ru: "семья", fr: "famille" },
      { ru: "брат", fr: "frère" },
      { ru: "сестра", fr: "sœur" },
      { ru: "стол", fr: "table" },
      { ru: "окно", fr: "fenêtre" },
      { ru: "книга", fr: "livre" },
    ],
    vocabulary: [
      { ru: "семья", fr: "famille", transcription: "semia", category: "famille" },
      { ru: "мама / папа", fr: "maman / papa", transcription: "mama / papa", category: "famille" },
      { ru: "брат / сестра", fr: "frère / sœur", transcription: "brat / sestra", category: "famille" },
      { ru: "сын / дочь", fr: "fils / fille", transcription: "syn / dotch", category: "famille" },
      { ru: "стол", fr: "table", transcription: "stol", category: "objets" },
      { ru: "стул", fr: "chaise", transcription: "stoul", category: "objets" },
      { ru: "окно", fr: "fenêtre", transcription: "akno", category: "objets" },
      { ru: "книга", fr: "livre", transcription: "kniga", category: "objets" },
      { ru: "телефон", fr: "téléphone", transcription: "telefon", category: "objets" },
      { ru: "квартира", fr: "appartement", transcription: "kvartira", category: "objets" },
    ],
    mindMap: {
      center: "Genre des noms",
      branches: [
        { label: "Masculin (consonne)", children: ["дом", "стол", "брат"] },
        { label: "Féminin (-а/-я)", children: ["книга", "семья", "сестра"] },
        { label: "Neutre (-о/-е)", children: ["окно", "море", "имя"] },
        { label: "Pluriel", children: ["-ы / -и (m/f)", "-а / -я (neutre)"] },
      ],
    },
    story: {
      title: "Моя семья (Ma famille)",
      paragraphs: [
        { ru: "Это моя семья. Мама, папа, брат и сестра.", fr: "Voici ma famille. Maman, papa, frère et sœur." },
        { ru: "У нас большая квартира. Есть стол, стулья и окна.", fr: "Nous avons un grand appartement. Il y a une table, des chaises et des fenêtres." },
        { ru: "Моя сестра читает книги.", fr: "Ma sœur lit des livres." },
      ],
      questions: [
        {
          question: "Qui lit des livres dans l'histoire ?",
          choices: ["Le frère", "La sœur", "Le papa"],
          correctIndex: 1,
        },
        {
          question: "Quel est le genre de « окно » ?",
          choices: ["Masculin", "Féminin", "Neutre"],
          correctIndex: 2,
        },
      ],
      writingPrompt: "Décris ta famille en russe en 3-4 phrases, en utilisant au moins un mot au pluriel.",
      writingHint: "Exemple : Это моя семья. У меня есть брат и сестра.",
    },
    podcast: {
      title: "Épisode 3 — Ma famille",
      description: "Une amie décrit sa famille et son appartement à l'aide du vocabulaire du foyer.",
      lines: [
        { speaker: "Настя", ru: "У тебя есть семья?", fr: "Tu as une famille ?" },
        { speaker: "Поль", ru: "Да, у меня есть мама, папа и сестра.", fr: "Oui, j'ai une maman, un papa et une sœur." },
        { speaker: "Настя", ru: "А брат есть?", fr: "Et un frère, tu en as ?" },
        { speaker: "Поль", ru: "Нет, брата нет. Только сестра.", fr: "Non, je n'ai pas de frère. Seulement une sœur." },
        { speaker: "Настя", ru: "У вас большая квартира?", fr: "Vous avez un grand appartement ?" },
        { speaker: "Поль", ru: "Да, большая. Есть стол, стулья и много окон.", fr: "Oui, grand. Il y a une table, des chaises et beaucoup de fenêtres." },
      ],
      quiz: [
        {
          question: "Est-ce que Поль a un frère ?",
          choices: ["Oui", "Non", "On ne sait pas"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-4",
    index: 4,
    title: "Les verbes au présent",
    subtitle: "1ère et 2e conjugaison",
    color: "emerald",
    level: "A1",
    grammar: [
      {
        title: "La 1ère conjugaison (verbes en -ать)",
        explanation:
          "Les verbes comme читать (lire) suivent le modèle : -ю, -ешь, -ет, -ем, -ете, -ют.",
        examples: [
          { ru: "я читаю", fr: "je lis" },
          { ru: "ты читаешь", fr: "tu lis" },
          { ru: "он читает", fr: "il lit" },
          { ru: "мы читаем", fr: "nous lisons" },
        ],
      },
      {
        title: "La 2e conjugaison (verbes en -ить)",
        explanation:
          "Les verbes comme говорить (parler) suivent le modèle : -ю, -ишь, -ит, -им, -ите, -ят.",
        examples: [
          { ru: "я говорю", fr: "je parle" },
          { ru: "ты говоришь", fr: "tu parles" },
          { ru: "мы говорим", fr: "nous parlons" },
        ],
        tip: "Le radical + la terminaison : apprends les deux modèles par cœur, ils couvrent la majorité des verbes.",
      },
    ],
    pronunciation: {
      title: "Les consonnes douces avant -ить",
      explanation:
        "Devant les voyelles е, ё, и, ю, я, la consonne qui précède s'adoucit (elle se prononce avec le dos de la langue relevé).",
      items: [
        { ru: "говорить", frenchSound: "le « р » et le « т » sont légèrement mouillés devant « и »", fr: "parler" },
        { ru: "жить", frenchSound: "« т » adouci par le signe mou final", fr: "vivre" },
      ],
    },
    spelling: [
      { ru: "читать", fr: "lire" },
      { ru: "говорить", fr: "parler" },
      { ru: "жить", fr: "vivre" },
      { ru: "работать", fr: "travailler" },
      { ru: "любить", fr: "aimer" },
      { ru: "делать", fr: "faire" },
    ],
    vocabulary: [
      { ru: "читать", fr: "lire", transcription: "tchitat" },
      { ru: "говорить", fr: "parler", transcription: "gavarit" },
      { ru: "жить", fr: "vivre", transcription: "jit" },
      { ru: "работать", fr: "travailler", transcription: "rabotat" },
      { ru: "любить", fr: "aimer", transcription: "loubit" },
      { ru: "делать", fr: "faire", transcription: "delat" },
      { ru: "изучать", fr: "étudier", transcription: "izoutchat" },
      { ru: "каждый день", fr: "chaque jour", transcription: "kajdy den" },
      { ru: "сегодня", fr: "aujourd'hui", transcription: "sevodnia" },
      { ru: "всегда", fr: "toujours", transcription: "vsegda" },
    ],
    mindMap: {
      center: "Verbes au présent",
      branches: [
        { label: "1ère conj. (-ать)", children: ["читать", "делать", "работать"] },
        { label: "2e conj. (-ить)", children: ["говорить", "любить", "жить*"] },
        { label: "Terminaisons -ать", children: ["ю / ешь / ет", "ем / ете / ют"] },
        { label: "Terminaisons -ить", children: ["ю / ишь / ит", "им / ите / ят"] },
      ],
    },
    story: {
      title: "Мой день (Ma journée)",
      paragraphs: [
        { ru: "Каждый день я читаю и изучаю русский язык.", fr: "Chaque jour, je lis et j'étudie le russe." },
        { ru: "Я живу во Франции, но я люблю Россию.", fr: "Je vis en France, mais j'aime la Russie." },
        { ru: "Сегодня я работаю дома.", fr: "Aujourd'hui, je travaille à la maison." },
      ],
      questions: [
        {
          question: "Que fait le narrateur chaque jour ?",
          choices: ["Il travaille au bureau", "Il lit et étudie le russe", "Il cuisine"],
          correctIndex: 1,
        },
        {
          question: "À quel groupe appartient « говорить » ?",
          choices: ["1ère conjugaison", "2e conjugaison", "Aucune"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Décris ta journée type en russe avec au moins 3 verbes conjugués au présent.",
      writingHint: "Exemple : Я работаю. Я читаю. Я говорю по-русски.",
    },
    podcast: {
      title: "Épisode 4 — La routine quotidienne",
      description: "Deux amis discutent de ce qu'ils font chaque jour.",
      lines: [
        { speaker: "Ира", ru: "Что ты делаешь каждый день?", fr: "Que fais-tu chaque jour ?" },
        { speaker: "Тома", ru: "Я работаю и изучаю русский язык.", fr: "Je travaille et j'étudie le russe." },
        { speaker: "Ира", ru: "Ты говоришь по-русски?", fr: "Tu parles russe ?" },
        { speaker: "Тома", ru: "Немного! Я люблю читать книги.", fr: "Un peu ! J'aime lire des livres." },
        { speaker: "Ира", ru: "А где ты живёшь?", fr: "Et où habites-tu ?" },
        { speaker: "Тома", ru: "Я живу во Франции.", fr: "J'habite en France." },
      ],
      quiz: [
        {
          question: "Qu'aime faire Тома ?",
          choices: ["Cuisiner", "Lire des livres", "Voyager"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-5",
    index: 5,
    title: "Le cas accusatif",
    subtitle: "Exprimer le complément d'objet direct",
    color: "sky",
    level: "A1",
    grammar: [
      {
        title: "À quoi sert l'accusatif ?",
        explanation:
          "L'accusatif marque le complément d'objet direct (COD) : la personne ou la chose qui subit l'action.",
        examples: [
          { ru: "Я читаю книгу.", fr: "Je lis un livre." },
          { ru: "Я люблю Россию.", fr: "J'aime la Russie." },
        ],
      },
      {
        title: "Formation de l'accusatif féminin",
        explanation:
          "Les noms féminins en -а deviennent -у, ceux en -я deviennent -ю. Le masculin inanimé et le neutre ne changent pas.",
        examples: [
          { ru: "книга → книгу", fr: "livre (nom → COD)" },
          { ru: "Россия → Россию", fr: "Russie (nom → COD)" },
          { ru: "стол → стол", fr: "table (inchangé)" },
        ],
        tip: "Pour les noms masculins animés (personnes/animaux), l'accusatif copie le génitif — nous verrons ce cas plus tard.",
      },
    ],
    pronunciation: {
      title: "L'accent tonique mobile",
      explanation:
        "L'accent tonique peut se déplacer entre les formes d'un même mot. Il faut apprendre chaque mot avec son accent.",
      items: [
        { ru: "вода́ → во́ду", frenchSound: "l'accent se déplace vers le début", fr: "eau (nominatif → accusatif)" },
        { ru: "рука́ → ру́ку", frenchSound: "l'accent se déplace vers le début", fr: "main (nominatif → accusatif)" },
      ],
    },
    spelling: [
      { ru: "магазин", fr: "magasin" },
      { ru: "хлеб", fr: "pain" },
      { ru: "яблоко", fr: "pomme" },
      { ru: "молоко", fr: "lait" },
      { ru: "покупать", fr: "acheter" },
      { ru: "рынок", fr: "marché" },
    ],
    vocabulary: [
      { ru: "покупать", fr: "acheter", transcription: "pakoupat" },
      { ru: "хлеб", fr: "pain", transcription: "khleb" },
      { ru: "яблоко", fr: "pomme", transcription: "iablaka" },
      { ru: "молоко", fr: "lait", transcription: "malako" },
      { ru: "сыр", fr: "fromage", transcription: "syr" },
      { ru: "магазин", fr: "magasin", transcription: "magazin" },
      { ru: "рынок", fr: "marché", transcription: "rynak" },
      { ru: "сколько стоит?", fr: "combien ça coûte ?", transcription: "skolka stoit" },
      { ru: "рубль", fr: "rouble", transcription: "roubl" },
      { ru: "вкусный", fr: "délicieux", transcription: "vkousny" },
    ],
    mindMap: {
      center: "Accusatif",
      branches: [
        { label: "Usage", children: ["COD de l'action", "Я вижу… (je vois…)", "Я покупаю… (j'achète…)"] },
        { label: "Féminin -а → -у", children: ["книга → книгу", "вода → воду"] },
        { label: "Féminin -я → -ю", children: ["Россия → Россию"] },
        { label: "Masc. inanimé / neutre", children: ["ne change pas"] },
      ],
    },
    story: {
      title: "На рынке (Au marché)",
      paragraphs: [
        { ru: "Я иду на рынок. Я покупаю хлеб и яблоко.", fr: "Je vais au marché. J'achète du pain et une pomme." },
        { ru: "Сколько стоит молоко? Это недорого.", fr: "Combien coûte le lait ? Ce n'est pas cher." },
        { ru: "Хлеб очень вкусный!", fr: "Le pain est très bon !" },
      ],
      questions: [
        {
          question: "Où va le narrateur ?",
          choices: ["Au restaurant", "Au marché", "À l'école"],
          correctIndex: 1,
        },
        {
          question: "Quelle est la forme accusative de « вода » ?",
          choices: ["воду", "воде", "воды"],
          correctIndex: 0,
        },
      ],
      writingPrompt: "Écris une petite liste de courses en russe avec le verbe покупать et 3 aliments à l'accusatif.",
      writingHint: "Exemple : Я покупаю хлеб, яблоко и молоко.",
    },
    podcast: {
      title: "Épisode 5 — Faire les courses",
      description: "Une conversation au marché autour des aliments et des prix.",
      lines: [
        { speaker: "Продавец", ru: "Здравствуйте! Что вы хотите?", fr: "Bonjour ! Que voulez-vous ?" },
        { speaker: "Клиент", ru: "Я хочу купить хлеб и яблоко.", fr: "Je veux acheter du pain et une pomme." },
        { speaker: "Продавец", ru: "Хорошо. Ещё молоко и сыр?", fr: "D'accord. Aussi du lait et du fromage ?" },
        { speaker: "Клиент", ru: "Да! Сколько это стоит?", fr: "Oui ! Combien ça coûte ?" },
        { speaker: "Продавец", ru: "Двести рублей.", fr: "Deux cents roubles." },
        { speaker: "Клиент", ru: "Спасибо, очень вкусный хлеб!", fr: "Merci, le pain est très bon !" },
      ],
      quiz: [
        {
          question: "Que veut acheter le client, en plus du hlebe ?",
          choices: ["Une pomme", "Un livre", "Une chaise"],
          correctIndex: 0,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-6",
    index: 6,
    title: "Le cas prépositionnel",
    subtitle: "Parler d'un lieu",
    color: "violet",
    level: "A2",
    grammar: [
      {
        title: "В et На + prépositionnel",
        explanation:
          "Pour dire « dans » ou « sur / à » un lieu, on utilise в ou на suivi du nom au cas prépositionnel.",
        examples: [
          { ru: "в доме", fr: "dans la maison" },
          { ru: "в школе", fr: "à l'école" },
          { ru: "на работе", fr: "au travail" },
        ],
      },
      {
        title: "Formation du prépositionnel",
        explanation:
          "La plupart des noms masculins et neutres prennent -е ; les féminins en -а prennent aussi -е, ceux en -ь ou -я prennent -и.",
        examples: [
          { ru: "дом → в доме", fr: "maison → dans la maison" },
          { ru: "школа → в школе", fr: "école → à l'école" },
          { ru: "Россия → в России", fr: "Russie → en Russie" },
        ],
        tip: "Retiens le duo в / на comme les deux prépositions de lieu les plus utiles au quotidien.",
      },
    ],
    pronunciation: {
      title: "Les groupes de consonnes",
      explanation:
        "Le russe tolère des groupes de plusieurs consonnes consécutives, difficiles pour un francophone. Il faut ralentir et détacher chaque son.",
      items: [
        { ru: "здравствуйте", frenchSound: "« zdrastvouïtié », détacher zdr-a-vst-vouï", fr: "bonjour (formel)" },
        { ru: "встреча", frenchSound: "« fstretcha », groupe vstr", fr: "rendez-vous" },
      ],
    },
    spelling: [
      { ru: "город", fr: "ville" },
      { ru: "улица", fr: "rue" },
      { ru: "музей", fr: "musée" },
      { ru: "площадь", fr: "place" },
      { ru: "метро", fr: "métro" },
      { ru: "театр", fr: "théâtre" },
    ],
    vocabulary: [
      { ru: "город", fr: "ville", transcription: "gorad" },
      { ru: "улица", fr: "rue", transcription: "oulitsa" },
      { ru: "музей", fr: "musée", transcription: "mouzei" },
      { ru: "площадь", fr: "place", transcription: "ploschad" },
      { ru: "метро", fr: "métro", transcription: "metro" },
      { ru: "театр", fr: "théâtre", transcription: "teatr" },
      { ru: "где?", fr: "où ?", transcription: "gdié" },
      { ru: "далеко / близко", fr: "loin / proche", transcription: "daleko / blizka" },
      { ru: "налево / направо", fr: "à gauche / à droite", transcription: "nalieva / naprava" },
      { ru: "прямо", fr: "tout droit", transcription: "priama" },
    ],
    mindMap: {
      center: "Prépositionnel (lieu)",
      branches: [
        { label: "В (dans)", children: ["в доме", "в городе", "в России"] },
        { label: "На (sur / à)", children: ["на улице", "на площади", "на работе"] },
        { label: "Questions", children: ["Где…? (où)", "Далеко? (loin ?)"] },
        { label: "Direction", children: ["налево", "направо", "прямо"] },
      ],
    },
    story: {
      title: "Прогулка по городу (Une balade en ville)",
      paragraphs: [
        { ru: "Сегодня я гуляю в городе. Музей на площади.", fr: "Aujourd'hui, je me promène en ville. Le musée est sur la place." },
        { ru: "Театр далеко, а метро близко.", fr: "Le théâtre est loin, mais le métro est proche." },
        { ru: "Иди прямо, потом налево.", fr: "Va tout droit, puis à gauche." },
      ],
      questions: [
        {
          question: "Où se trouve le musée ?",
          choices: ["Sur la place", "Dans le métro", "Au théâtre"],
          correctIndex: 0,
        },
        {
          question: "Quelle préposition utilise-t-on pour « à la place » ?",
          choices: ["в", "на", "и"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Décris un itinéraire en ville en russe avec в/на + un lieu et une indication de direction.",
      writingHint: "Exemple : Музей на площади. Иди прямо, потом направо.",
    },
    podcast: {
      title: "Épisode 6 — Se repérer en ville",
      description: "Un touriste demande son chemin dans une ville russe.",
      lines: [
        { speaker: "Турист", ru: "Извините, где музей?", fr: "Excusez-moi, où est le musée ?" },
        { speaker: "Прохожий", ru: "Музей на площади, недалеко отсюда.", fr: "Le musée est sur la place, pas loin d'ici." },
        { speaker: "Турист", ru: "А метро тоже близко?", fr: "Et le métro est proche aussi ?" },
        { speaker: "Прохожий", ru: "Да, идите прямо, потом налево.", fr: "Oui, allez tout droit, puis à gauche." },
        { speaker: "Турист", ru: "Спасибо большое!", fr: "Merci beaucoup !" },
        { speaker: "Прохожий", ru: "Пожалуйста! Хорошей прогулки!", fr: "Je vous en prie ! Bonne balade !" },
      ],
      quiz: [
        {
          question: "Comment aller au musée ?",
          choices: ["Prendre le métro", "Tout droit puis à gauche", "Tout droit puis à droite"],
          correctIndex: 1,
        },
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-7",
    index: 7,
    title: "Le génitif",
    subtitle: "Exprimer l'absence, la possession, la quantité",
    color: "fuchsia",
    level: "A2",
    grammar: [
      {
        title: "Нет + génitif : exprimer l'absence",
        explanation:
          "Pour dire qu'il n'y a pas quelque chose, on utilise « нет » suivi du nom au génitif (et non à l'accusatif).",
        examples: [
          { ru: "стол → Нет стола.", fr: "table → Il n'y a pas de table." },
          { ru: "книга → Нет книги.", fr: "livre → Il n'y a pas de livre." },
          { ru: "окно → Нет окна.", fr: "fenêtre → Il n'y a pas de fenêtre." },
        ],
        tip: "Masculin/neutre : on ajoute -а/-я. Féminin en -а : on remplace par -ы/-и.",
      },
      {
        title: "Le génitif pour la possession",
        explanation:
          "Pour dire « le livre de la sœur » ou « la maison de mon ami », le possesseur se met au génitif, placé après le nom possédé.",
        examples: [
          { ru: "книга сестры", fr: "le livre de la sœur" },
          { ru: "дом друга", fr: "la maison de l'ami" },
        ],
        tip: "У меня, у тебя, у него… (littéralement « chez moi ») utilisent aussi le génitif : c'est ainsi qu'on exprime « avoir » en russe.",
      },
    ],
    pronunciation: {
      title: "Le piège de -ого / -его",
      explanation:
        "Au génitif masculin/neutre des adjectifs et pronoms, la terminaison -ого/-его s'écrit avec un г mais se prononce comme un в !",
      items: [
        { ru: "его", frenchSound: "se prononce « yevo », pas « yego »", fr: "de lui / son" },
        { ru: "ничего", frenchSound: "se prononce « nitchevo »", fr: "rien" },
      ],
    },
    spelling: [
      { ru: "стола", fr: "de la table" },
      { ru: "книги", fr: "du livre" },
      { ru: "окна", fr: "de la fenêtre" },
      { ru: "брата", fr: "du frère" },
      { ru: "сестры", fr: "de la sœur" },
      { ru: "ничего", fr: "rien" },
    ],
    vocabulary: [
      { ru: "один, два, три", fr: "un, deux, trois", transcription: "adin, dva, tri" },
      { ru: "четыре, пять", fr: "quatre, cinq", transcription: "tchetyre, piat" },
      { ru: "шесть, семь", fr: "six, sept", transcription: "chest, sem" },
      { ru: "восемь, девять, десять", fr: "huit, neuf, dix", transcription: "vosem, deviat, desiat" },
      { ru: "у меня нет…", fr: "je n'ai pas de…", transcription: "ou menia niet" },
      { ru: "много", fr: "beaucoup", transcription: "mnoga" },
      { ru: "мало", fr: "peu", transcription: "mala" },
      { ru: "сколько?", fr: "combien ?", transcription: "skolka" },
      { ru: "немного", fr: "un peu", transcription: "nemnoga" },
      { ru: "ничего", fr: "rien", transcription: "nitchevo" },
    ],
    mindMap: {
      center: "Génitif",
      branches: [
        { label: "Usage", children: ["нет + génitif", "possession (de)", "у меня есть/нет", "quantités"] },
        { label: "Masculin/neutre", children: ["+а / +я", "стол → стола"] },
        { label: "Féminin -а/-я", children: ["→ ы / и", "книга → книги"] },
        { label: "Piège", children: ["-ого se prononce -ово"] },
      ],
    },
    story: {
      title: "В холодильнике ничего нет! (Le frigo est vide !)",
      paragraphs: [
        { ru: "Сегодня у нас нет хлеба и нет молока.", fr: "Aujourd'hui, nous n'avons ni pain ni lait." },
        { ru: "У соседа есть десять яблок, но у нас только два.", fr: "Le voisin a dix pommes, mais nous n'en avons que deux." },
        { ru: "Сколько денег у тебя? Немного, но хватит.", fr: "Combien d'argent as-tu ? Un peu, mais ça suffira." },
      ],
      questions: [
        {
          question: "Que veut dire « У нас нет хлеба » ?",
          choices: ["Nous avons du pain", "Nous n'avons pas de pain", "Nous voulons du pain"],
          correctIndex: 1,
        },
        {
          question: "Quelle est la forme génitive de « яблоко » utilisée après un chiffre comme « два » ?",
          choices: ["яблоко", "яблока", "яблок"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Fais une liste de 3 choses qui manquent chez toi, avec « нет + génitif ».",
      writingHint: "Exemple : У меня нет хлеба. Нет молока. Нет времени.",
    },
    podcast: {
      title: "Épisode 7 — Le frigo vide",
      description: "Deux colocataires découvrent qu'il ne reste presque rien à manger à la maison.",
      lines: [
        { speaker: "Катя", ru: "У нас есть хлеб?", fr: "On a du pain ?" },
        { speaker: "Дима", ru: "Нет, хлеба нет. И молока тоже нет.", fr: "Non, pas de pain. Et pas de lait non plus." },
        { speaker: "Катя", ru: "Сколько у нас яблок?", fr: "Combien de pommes on a ?" },
        { speaker: "Дима", ru: "Только два яблока. Это мало!", fr: "Seulement deux pommes. C'est peu !" },
        { speaker: "Катя", ru: "Ничего страшного, идём в магазин.", fr: "Ce n'est pas grave, allons au magasin." },
        { speaker: "Дима", ru: "Хорошо, у меня есть немного денег.", fr: "D'accord, j'ai un peu d'argent." },
      ],
      quiz: [
        {
          question: "Qu'est-ce qui manque complètement chez Катя et Дима ?",
          choices: ["Les pommes", "Le pain et le lait", "L'argent"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-8",
    index: 8,
    title: "Le datif et l'instrumental",
    subtitle: "À qui ? Avec quoi ?",
    color: "teal",
    level: "A2",
    grammar: [
      {
        title: "Le datif : le destinataire",
        explanation:
          "Le datif indique à qui on donne, dit ou offre quelque chose. Il sert aussi pour l'âge et avec le verbe « нравиться » (aimer, littéralement « plaire à »).",
        examples: [
          { ru: "Я дарю подарок другу.", fr: "J'offre un cadeau à un ami." },
          { ru: "Мне нравится Россия.", fr: "J'aime la Russie (litt. la Russie me plaît)." },
          { ru: "Ей двадцать лет.", fr: "Elle a vingt ans." },
        ],
        tip: "Masculin/neutre : +у/ю. Féminin -а/-я → -е.",
      },
      {
        title: "L'instrumental : le moyen et l'accompagnement",
        explanation:
          "L'instrumental répond à « avec quoi / avec qui ? ». Il sert pour le moyen (écrire avec un stylo), l'accompagnement (с + instrumental) et la profession après « быть ».",
        examples: [
          { ru: "Я пишу ручкой.", fr: "J'écris avec un stylo." },
          { ru: "Я гуляю с другом.", fr: "Je me promène avec un ami." },
          { ru: "Он хочет быть врачом.", fr: "Il veut être médecin." },
        ],
        tip: "Masculin/neutre : +ом/ем. Féminin -а/-я → -ой/-ей.",
      },
    ],
    pronunciation: {
      title: "-ом ou -ем après les chuintantes",
      explanation:
        "Après ж, ш, ч, щ, ц non accentués, on écrit -ем au lieu de -ом à l'instrumental.",
      items: [
        { ru: "муж → мужем", frenchSound: "« mou-jem », pas « mou-jom »", fr: "mari → avec le mari" },
        { ru: "врач → врачом", frenchSound: "ici l'accent tombe sur la terminaison : « vratchom »", fr: "médecin → en tant que médecin" },
      ],
    },
    spelling: [
      { ru: "другу", fr: "à l'ami" },
      { ru: "ручкой", fr: "avec un stylo" },
      { ru: "врачом", fr: "médecin (instr.)" },
      { ru: "мужем", fr: "avec le mari" },
      { ru: "нравится", fr: "plaît" },
      { ru: "лет", fr: "ans" },
    ],
    vocabulary: [
      { ru: "врач", fr: "médecin", transcription: "vratch" },
      { ru: "учитель / учительница", fr: "professeur", transcription: "outchitel" },
      { ru: "инженер", fr: "ingénieur", transcription: "injenier" },
      { ru: "актёр / актриса", fr: "acteur / actrice", transcription: "akter / aktrissa" },
      { ru: "ручка", fr: "stylo", transcription: "routchka" },
      { ru: "карандаш", fr: "crayon", transcription: "karandach" },
      { ru: "нравиться", fr: "plaire, aimer", transcription: "nravitsa" },
      { ru: "сколько тебе лет?", fr: "quel âge as-tu ?", transcription: "skolka tebe let" },
      { ru: "подарок", fr: "cadeau", transcription: "padarak" },
      { ru: "вместе", fr: "ensemble", transcription: "vmeste" },
    ],
    mindMap: {
      center: "Датив и творительный",
      branches: [
        { label: "Datif — usage", children: ["destinataire", "мне нравится", "âge (мне 20 лет)"] },
        { label: "Datif — formation", children: ["+у / +ю", "-а/-я → -е"] },
        { label: "Instrumental — usage", children: ["moyen", "с + qqn", "profession (быть + instr.)"] },
        { label: "Instrumental — formation", children: ["+ом / +ем", "-а/-я → -ой/-ей"] },
      ],
    },
    story: {
      title: "День рождения друга (L'anniversaire d'un ami)",
      paragraphs: [
        { ru: "Сегодня день рождения моего друга. Я дарю ему подарок.", fr: "Aujourd'hui c'est l'anniversaire de mon ami. Je lui offre un cadeau." },
        { ru: "Ему нравится писать ручкой, поэтому я дарю красивую ручку.", fr: "Il aime écrire avec un stylo, alors je lui offre un beau stylo." },
        { ru: "Вечером мы гуляем с друзьями вместе.", fr: "Le soir, nous nous promenons ensemble avec des amis." },
      ],
      questions: [
        {
          question: "Que reçoit l'ami en cadeau ?",
          choices: ["Un livre", "Un stylo", "Un crayon"],
          correctIndex: 1,
        },
        {
          question: "Quel cas utilise-t-on après « с » (avec) ?",
          choices: ["Le datif", "L'instrumental", "Le génitif"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Décris un cadeau que tu offres à un ami et dis avec qui tu te promènes, en utilisant le datif et l'instrumental.",
      writingHint: "Exemple : Я дарю подарок другу. Я гуляю с подругой.",
    },
    podcast: {
      title: "Épisode 8 — Quel métier plus tard ?",
      description: "Deux amis parlent de leur âge et du métier qu'ils rêvent de faire.",
      lines: [
        { speaker: "Настя", ru: "Сколько тебе лет?", fr: "Quel âge as-tu ?" },
        { speaker: "Олег", ru: "Мне двадцать два года. А тебе?", fr: "J'ai vingt-deux ans. Et toi ?" },
        { speaker: "Настя", ru: "Мне двадцать. Кем ты хочешь быть?", fr: "J'ai vingt ans. Que veux-tu devenir ?" },
        { speaker: "Олег", ru: "Я хочу быть врачом. А тебе нравится эта профессия?", fr: "Je veux être médecin. Et toi, ce métier te plaît ?" },
        { speaker: "Настя", ru: "Нет, мне больше нравится быть учительницей.", fr: "Non, j'aime mieux être professeure." },
        { speaker: "Олег", ru: "Здорово! Пойдём гулять с друзьями?", fr: "Génial ! On va se promener avec des amis ?" },
      ],
      quiz: [
        {
          question: "Quel métier Олег veut-il faire ?",
          choices: ["Professeur", "Médecin", "Ingénieur"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-9",
    index: 9,
    title: "Le passé et l'aspect des verbes",
    subtitle: "Raconter ce qui s'est passé",
    color: "indigo",
    level: "B1",
    grammar: [
      {
        title: "Former le passé",
        explanation:
          "On enlève -ть de l'infinitif et on ajoute -л (masculin), -ла (féminin), -ло (neutre) ou -ли (pluriel). Le passé s'accorde en genre et en nombre, jamais en personne.",
        examples: [
          { ru: "он читал", fr: "il lisait / a lu" },
          { ru: "она читала", fr: "elle lisait / a lu" },
          { ru: "они читали", fr: "ils/elles lisaient / ont lu" },
        ],
      },
      {
        title: "Imperfectif vs perfectif",
        explanation:
          "Le russe a deux verbes pour une même action : l'imperfectif (action en cours, habituelle, sans résultat précisé) et le perfectif (action ponctuelle, terminée, avec résultat).",
        examples: [
          { ru: "Я читал книгу.", fr: "Je lisais un livre (en cours, pas forcément fini)." },
          { ru: "Я прочитал книгу.", fr: "J'ai lu tout le livre (terminé, résultat)." },
          { ru: "делать → сделать", fr: "faire (en cours) → faire (fini)" },
        ],
        tip: "Beaucoup de verbes perfectifs se forment avec un préfixe : читать → прочитать, писать → написать, делать → сделать.",
      },
    ],
    pronunciation: {
      title: "L'accent mobile au féminin passé",
      explanation:
        "Pour certains verbes très courants, l'accent tonique saute sur la terminaison au féminin passé — une exception à retenir par cœur.",
      items: [
        { ru: "был → была́", frenchSound: "accent qui se déplace sur le dernier а", fr: "il était → elle était" },
        { ru: "жил → жила́", frenchSound: "même déplacement d'accent", fr: "il vivait → elle vivait" },
      ],
    },
    spelling: [
      { ru: "читал", fr: "il lisait" },
      { ru: "читала", fr: "elle lisait" },
      { ru: "сделал", fr: "il a fait" },
      { ru: "вчера", fr: "hier" },
      { ru: "вечером", fr: "le soir" },
      { ru: "была", fr: "elle était" },
    ],
    vocabulary: [
      { ru: "вчера", fr: "hier", transcription: "vtchera" },
      { ru: "на прошлой неделе", fr: "la semaine dernière", transcription: "na prochlai nedele" },
      { ru: "утром", fr: "le matin", transcription: "outram" },
      { ru: "днём", fr: "l'après-midi", transcription: "dniom" },
      { ru: "вечером", fr: "le soir", transcription: "vetcheram" },
      { ru: "уже", fr: "déjà", transcription: "ouje" },
      { ru: "потом", fr: "ensuite", transcription: "patom" },
      { ru: "сначала", fr: "d'abord", transcription: "snatchala" },
      { ru: "весь день", fr: "toute la journée", transcription: "ves den" },
      { ru: "наконец", fr: "enfin", transcription: "nakanets" },
    ],
    mindMap: {
      center: "Passé & aspect",
      branches: [
        { label: "Formation", children: ["-л / -ла", "-ло / -ли"] },
        { label: "Imperfectif", children: ["action en cours", "habitude", "читать, делать"] },
        { label: "Perfectif", children: ["action finie + résultat", "прочитать, сделать"] },
        { label: "Marqueurs", children: ["вчера", "потом", "уже", "сначала"] },
      ],
    },
    story: {
      title: "Вчера был длинный день (Hier, une longue journée)",
      paragraphs: [
        { ru: "Вчера утром я читал книгу, а потом сделал завтрак.", fr: "Hier matin, je lisais un livre, puis j'ai préparé le petit-déjeuner." },
        { ru: "Днём я работал, а вечером гулял с другом.", fr: "L'après-midi, j'ai travaillé, et le soir je me suis promené avec un ami." },
        { ru: "Наконец, я прочитал всю книгу. Это был хороший день!", fr: "Enfin, j'ai fini tout le livre. C'était une bonne journée !" },
      ],
      questions: [
        {
          question: "Qu'a fait le narrateur en dernier ?",
          choices: ["Il a préparé le petit-déjeuner", "Il a fini le livre", "Il a travaillé"],
          correctIndex: 1,
        },
        {
          question: "« Я читал книгу » (imperfectif) insiste sur…",
          choices: ["le résultat final", "l'action en train de se dérouler", "le futur"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Raconte ta journée d'hier en russe avec au moins 3 verbes au passé (imperfectif et perfectif).",
      writingHint: "Exemple : Вчера утром я читал. Потом я сделал завтрак.",
    },
    podcast: {
      title: "Épisode 9 — Qu'as-tu fait hier ?",
      description: "Deux amis se racontent leur journée de la veille.",
      lines: [
        { speaker: "Лена", ru: "Что ты делал вчера?", fr: "Qu'as-tu fait hier ?" },
        { speaker: "Саша", ru: "Утром я работал, а днём читал книгу.", fr: "Le matin j'ai travaillé, l'après-midi j'ai lu un livre." },
        { speaker: "Лена", ru: "Ты прочитал всю книгу?", fr: "Tu as fini tout le livre ?" },
        { speaker: "Саша", ru: "Да, наконец прочитал! А ты что делала?", fr: "Oui, enfin fini ! Et toi, qu'as-tu fait ?" },
        { speaker: "Лена", ru: "Вечером я гуляла с подругой.", fr: "Le soir, je me suis promenée avec une amie." },
        { speaker: "Саша", ru: "Здорово, это был хороший день!", fr: "Super, c'était une bonne journée !" },
      ],
      quiz: [
        {
          question: "Qu'est-ce que Саша a fini hier ?",
          choices: ["Un film", "Un livre", "Un repas"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-10",
    index: 10,
    title: "Le futur et l'impératif",
    subtitle: "Faire des projets et donner des conseils",
    color: "lime",
    level: "B1",
    grammar: [
      {
        title: "Le futur composé (imperfectif)",
        explanation:
          "Pour un verbe imperfectif, le futur se forme avec буду/будешь/будет/будем/будете/будут + l'infinitif imperfectif.",
        examples: [
          { ru: "Я буду читать.", fr: "Je vais lire / je lirai." },
          { ru: "Мы будем работать.", fr: "Nous allons travailler." },
        ],
      },
      {
        title: "Le futur simple (perfectif) et l'impératif",
        explanation:
          "Un verbe perfectif se conjugue comme au présent mais prend un sens futur. L'impératif se forme à partir du radical du présent + -и/-й (tu) ou -ите/-йте (vous).",
        examples: [
          { ru: "Я прочитаю книгу.", fr: "Je lirai le livre (en entier)." },
          { ru: "Читай! Читайте!", fr: "Lis ! Lisez !" },
          { ru: "Иди! Идите!", fr: "Va ! Allez !" },
        ],
        tip: "Pour adoucir un ordre, ajoute « пожалуйста » (s'il te/vous plaît) : Читай, пожалуйста!",
      },
    ],
    pronunciation: {
      title: "L'intonation de l'ordre et de la prière",
      explanation:
        "Un impératif sec a une intonation descendante et ferme ; une demande polie avec « пожалуйста » a une intonation plus douce et montante.",
      items: [
        { ru: "Иди сюда!", frenchSound: "ton ferme, descendant", fr: "Viens ici ! (ordre)" },
        { ru: "Помоги мне, пожалуйста.", frenchSound: "ton doux, presque suppliant", fr: "Aide-moi, s'il te plaît." },
      ],
    },
    spelling: [
      { ru: "буду", fr: "je serai / vais" },
      { ru: "прочитаю", fr: "je lirai (entièrement)" },
      { ru: "читай", fr: "lis !" },
      { ru: "говорите", fr: "parlez !" },
      { ru: "завтра", fr: "demain" },
      { ru: "скоро", fr: "bientôt" },
    ],
    vocabulary: [
      { ru: "завтра", fr: "demain", transcription: "zavtra" },
      { ru: "скоро", fr: "bientôt", transcription: "skora" },
      { ru: "план", fr: "projet, plan", transcription: "plan" },
      { ru: "совет", fr: "conseil", transcription: "saviet" },
      { ru: "обязательно", fr: "absolument, sans faute", transcription: "abiazatelna" },
      { ru: "давай!", fr: "allons-y !", transcription: "davai" },
      { ru: "будущее", fr: "avenir", transcription: "boudouchtchee" },
      { ru: "мечта", fr: "rêve", transcription: "metchta" },
      { ru: "постараться", fr: "essayer, faire de son mieux", transcription: "pastaratsa" },
      { ru: "удача", fr: "chance, réussite", transcription: "oudatcha" },
    ],
    mindMap: {
      center: "Futur & impératif",
      branches: [
        { label: "Futur composé", children: ["буду + infinitif imperf.", "action longue/habituelle"] },
        { label: "Futur simple", children: ["verbe perfectif conjugué", "action ponctuelle finie"] },
        { label: "Impératif", children: ["радикал + -и/-й (tu)", "+ -ите/-йте (vous)"] },
        { label: "Marqueurs", children: ["завтра", "скоро", "обязательно"] },
      ],
    },
    story: {
      title: "Мечты о будущем (Rêves d'avenir)",
      paragraphs: [
        { ru: "Завтра я буду изучать русский язык весь день.", fr: "Demain, je vais étudier le russe toute la journée." },
        { ru: "Скоро я прочитаю первую русскую книгу целиком!", fr: "Bientôt je lirai mon premier livre russe en entier !" },
        { ru: "Друг говорит мне: «Занимайся каждый день и у тебя всё получится!»", fr: "Un ami me dit : « Entraîne-toi chaque jour et tu réussiras ! »" },
      ],
      questions: [
        {
          question: "Que va faire le narrateur demain ?",
          choices: ["Se reposer", "Étudier le russe toute la journée", "Voyager"],
          correctIndex: 1,
        },
        {
          question: "« Занимайся каждый день! » est…",
          choices: ["un futur", "un impératif", "un passé"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Écris 3 phrases sur tes projets pour demain, puis donne-toi un conseil à l'impératif.",
      writingHint: "Exemple : Завтра я буду читать. Я обязательно прочитаю книгу. Занимайся каждый день!",
    },
    podcast: {
      title: "Épisode 10 — Les projets de demain",
      description: "Deux amis planifient leur semaine et se donnent des conseils avant un voyage.",
      lines: [
        { speaker: "Оля", ru: "Что ты будешь делать завтра?", fr: "Que vas-tu faire demain ?" },
        { speaker: "Ваня", ru: "Я буду готовиться к поездке в Россию.", fr: "Je vais me préparer pour le voyage en Russie." },
        { speaker: "Оля", ru: "Обязательно возьми словарь!", fr: "Prends absolument un dictionnaire !" },
        { speaker: "Ваня", ru: "Хорошо. А ты дашь мне советы?", fr: "D'accord. Et toi, tu me donneras des conseils ?" },
        { speaker: "Оля", ru: "Да! Говори медленно и слушай подкасты каждый день.", fr: "Oui ! Parle lentement et écoute des podcasts chaque jour." },
        { speaker: "Ваня", ru: "Спасибо! Скоро я буду говорить по-русски свободно.", fr: "Merci ! Bientôt je parlerai russe couramment." },
      ],
      quiz: [
        {
          question: "Quel conseil Оля donne-t-elle à Ваня ?",
          choices: ["Dormir beaucoup", "Parler lentement et écouter des podcasts", "Acheter des livres"],
          correctIndex: 1,
        },
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-11",
    index: 11,
    title: "Les verbes de mouvement",
    subtitle: "Aller à pied, en voiture, une fois ou souvent",
    color: "cyan",
    level: "B1",
    grammar: [
      {
        title: "Deux radicaux pour un seul verbe",
        explanation:
          "Le russe distingue le mouvement dans une seule direction précise (идти, ехать) du mouvement habituel ou en va-et-vient (ходить, ездить). C'est une notion sans équivalent direct en français.",
        examples: [
          { ru: "Я иду в школу.", fr: "Je vais à l'école (maintenant, à pied)." },
          { ru: "Я хожу в школу каждый день.", fr: "Je vais à l'école chaque jour (habitude)." },
          { ru: "Я еду в Москву.", fr: "Je vais à Moscou (maintenant, en train/voiture)." },
        ],
        tip: "идти/ехать = un trajet précis en cours ; ходить/ездить = habitude, répétition, ou aller-retour.",
      },
      {
        title: "Les préfixes de mouvement",
        explanation:
          "En ajoutant un préfixe à идти/ехать, on précise le sens du déplacement : по- (se mettre en route), при- (arriver), у- (partir, s'en aller), пере- (traverser).",
        examples: [
          { ru: "Я пошёл домой.", fr: "Je suis parti chez moi." },
          { ru: "Он пришёл вовремя.", fr: "Il est arrivé à l'heure." },
          { ru: "Она ушла рано.", fr: "Elle est partie tôt." },
        ],
      },
    ],
    pronunciation: {
      title: "Пришёл ou пошёл ?",
      explanation: "Ces deux mots se ressemblent beaucoup à l'oral : seule la première syllabe change le sens.",
      items: [
        { ru: "пришёл", frenchSound: "« pri-CHOL », accent sur la fin", fr: "il est arrivé" },
        { ru: "пошёл", frenchSound: "« pa-CHOL », accent sur la fin", fr: "il est parti" },
      ],
    },
    spelling: [
      { ru: "иду", fr: "je vais (à pied)" },
      { ru: "хожу", fr: "je vais (habituellement)" },
      { ru: "еду", fr: "je vais (en véhicule)" },
      { ru: "езжу", fr: "je vais (habituellement, en véhicule)" },
      { ru: "пришёл", fr: "il est arrivé" },
      { ru: "ушла", fr: "elle est partie" },
    ],
    vocabulary: [
      { ru: "идти", fr: "aller à pied (une fois)", transcription: "idti" },
      { ru: "ходить", fr: "aller à pied (habituellement)", transcription: "khodit" },
      { ru: "ехать", fr: "aller en véhicule (une fois)", transcription: "yekhat" },
      { ru: "ездить", fr: "aller en véhicule (habituellement)", transcription: "yezdit" },
      { ru: "прийти", fr: "arriver (à pied)", transcription: "priiti" },
      { ru: "уйти", fr: "partir (à pied)", transcription: "ouiti" },
      { ru: "транспорт", fr: "les transports", transcription: "transpart" },
      { ru: "машина", fr: "voiture", transcription: "machina" },
      { ru: "поезд", fr: "train", transcription: "poezd" },
      { ru: "самолёт", fr: "avion", transcription: "samaliot" },
    ],
    mindMap: {
      center: "Verbes de mouvement",
      branches: [
        { label: "Direction unique", children: ["идти (à pied)", "ехать (en véhicule)"] },
        { label: "Habituel / répété", children: ["ходить", "ездить"] },
        { label: "Préfixes", children: ["по- partir", "при- arriver", "у- s'en aller", "пере- traverser"] },
        { label: "Transport", children: ["машина", "поезд", "самолёт"] },
      ],
    },
    story: {
      title: "Поездка в Москву (Un voyage à Moscou)",
      paragraphs: [
        { ru: "Каждое лето я езжу к бабушке в деревню.", fr: "Chaque été, je vais chez ma grand-mère à la campagne." },
        { ru: "Но в этом году я еду в Москву на поезде!", fr: "Mais cette année, je vais à Moscou en train !" },
        { ru: "Когда я приехал, друг уже пришёл на вокзал меня встречать.", fr: "Quand je suis arrivé, un ami était déjà venu à la gare pour m'accueillir." },
      ],
      questions: [
        {
          question: "Où va le narrateur d'habitude en été ?",
          choices: ["À Moscou", "Chez sa grand-mère", "À l'étranger"],
          correctIndex: 1,
        },
        {
          question: "« Ездить » exprime…",
          choices: ["un trajet précis en cours", "une habitude ou un aller-retour", "le futur uniquement"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Raconte un trajet que tu fais souvent (ходить/ездить) puis un trajet exceptionnel que tu es en train de faire (идти/ехать).",
      writingHint: "Exemple : Я хожу в парк каждый день. Сегодня я иду в музей.",
    },
    podcast: {
      title: "Épisode 11 — On y va comment ?",
      description: "Deux amis organisent un trajet et discutent de leurs habitudes de déplacement.",
      lines: [
        { speaker: "Настя", ru: "Как ты едешь на работу?", fr: "Comment vas-tu au travail ?" },
        { speaker: "Игорь", ru: "Обычно я езжу на машине, но сегодня иду пешком.", fr: "D'habitude je vais en voiture, mais aujourd'hui j'y vais à pied." },
        { speaker: "Настя", ru: "А в отпуск вы куда едете?", fr: "Et pour les vacances, vous allez où ?" },
        { speaker: "Игорь", ru: "Мы едем на поезде в Санкт-Петербург.", fr: "Nous allons en train à Saint-Pétersbourg." },
        { speaker: "Настя", ru: "Когда вы приезжаете?", fr: "Quand arrivez-vous ?" },
        { speaker: "Игорь", ru: "Мы приезжаем в субботу утром.", fr: "Nous arrivons samedi matin." },
      ],
      quiz: [
        {
          question: "Comment Игорь va-t-il au travail aujourd'hui ?",
          choices: ["En voiture", "À pied", "En train"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-12",
    index: 12,
    title: "Les participes",
    subtitle: "Причастия : décrire avec élégance",
    color: "pink",
    level: "B2",
    grammar: [
      {
        title: "Le participe actif présent",
        explanation:
          "Formé sur le radical du présent + -щий (читающий, говорящий), il remplace « qui + verbe » dans un registre plus écrit et concis.",
        examples: [
          { ru: "Студент, который читает книгу.", fr: "L'étudiant qui lit un livre. (oral)" },
          { ru: "Студент, читающий книгу.", fr: "L'étudiant lisant un livre. (écrit, plus concis)" },
        ],
      },
      {
        title: "Le participe passé passif",
        explanation:
          "Formé sur des verbes perfectifs avec -нный/-тый (написанный, прочитанный), il décrit le résultat d'une action. Sa forme courte (написан, прочитана) s'utilise comme attribut, un peu comme un passif.",
        examples: [
          { ru: "написанное письмо", fr: "la lettre écrite" },
          { ru: "Книга прочитана.", fr: "Le livre a été lu (est lu)." },
        ],
        tip: "Les participes sont surtout utiles à l'écrit (articles, littérature) ; à l'oral, « который + verbe » reste plus naturel.",
      },
    ],
    pronunciation: {
      title: "Les groupes -нн- et l'accent mobile",
      explanation:
        "Le doublement du н dans les participes passifs (написанный) s'entend clairement, et l'accent se déplace souvent vers l'avant dans la forme courte féminine.",
      items: [
        { ru: "напи́сан → напи́сана", frenchSound: "l'accent reste sur la même syllabe ici", fr: "écrit → écrite" },
        { ru: "прочи́танный", frenchSound: "bien détacher les deux « н »", fr: "lu (entièrement)" },
      ],
    },
    spelling: [
      { ru: "читающий", fr: "lisant / qui lit" },
      { ru: "говорящий", fr: "parlant / qui parle" },
      { ru: "написанный", fr: "écrit" },
      { ru: "прочитана", fr: "lue (résultat)" },
      { ru: "который", fr: "qui, lequel" },
      { ru: "известный", fr: "connu" },
    ],
    vocabulary: [
      { ru: "который", fr: "qui, lequel", transcription: "katory" },
      { ru: "известный", fr: "connu, célèbre", transcription: "izvestny" },
      { ru: "созданный", fr: "créé", transcription: "sozdanny" },
      { ru: "включать", fr: "inclure", transcription: "vklioutchat" },
      { ru: "ситуация", fr: "situation", transcription: "sitouatsia" },
      { ru: "событие", fr: "événement", transcription: "sabytie" },
      { ru: "известно", fr: "il est connu que", transcription: "izvestna" },
      { ru: "факт", fr: "fait", transcription: "fakt" },
      { ru: "изменение", fr: "changement", transcription: "izmenenie" },
      { ru: "участие", fr: "participation", transcription: "outchastie" },
    ],
    mindMap: {
      center: "Причастия",
      branches: [
        { label: "Actif présent", children: ["-ущий / -ющий", "-ащий / -ящий", "читающий"] },
        { label: "Passif passé", children: ["-нный / -тый", "написанный"] },
        { label: "Forme courte", children: ["état résultant", "книга прочитана"] },
        { label: "Équivalent oral", children: ["который + verbe conjugué"] },
      ],
    },
    story: {
      title: "Событие, изменившее город (L'événement qui a changé la ville)",
      paragraphs: [
        { ru: "Музей, созданный сто лет назад, стал известным во всём мире.", fr: "Le musée, créé il y a cent ans, est devenu connu dans le monde entier." },
        { ru: "Событие, включающее тысячи участников, изменило город.", fr: "L'événement, réunissant des milliers de participants, a changé la ville." },
        { ru: "Сегодня об этом факте известно каждому жителю.", fr: "Aujourd'hui, ce fait est connu de chaque habitant." },
      ],
      questions: [
        {
          question: "Que veut dire « созданный » ?",
          choices: ["qui crée", "créé", "en train de créer"],
          correctIndex: 1,
        },
        {
          question: "« Студент, читающий книгу » est équivalent à…",
          choices: ["Студент, который читает книгу", "Студент читал книгу", "Студент прочитал книгу"],
          correctIndex: 0,
        },
      ],
      writingPrompt: "Décris un lieu ou un événement célèbre en utilisant un participe (ex. « созданный », « известный »).",
      writingHint: "Exemple : Это парк, созданный в этом году. Он стал известным местом.",
    },
    podcast: {
      title: "Épisode 12 — Un débat culturel",
      description: "Deux étudiants discutent d'un événement culturel en utilisant un registre plus soutenu.",
      lines: [
        { speaker: "Вера", ru: "Ты читала статью об этом событии?", fr: "Tu as lu l'article sur cet événement ?" },
        { speaker: "Максим", ru: "Да, о фестивале, включающем много стран?", fr: "Oui, sur le festival réunissant beaucoup de pays ?" },
        { speaker: "Вера", ru: "Именно! Он стал известным очень быстро.", fr: "Exactement ! Il est devenu connu très vite." },
        { speaker: "Максим", ru: "Программа, созданная организаторами, впечатляет.", fr: "Le programme, créé par les organisateurs, est impressionnant." },
        { speaker: "Вера", ru: "Билеты уже все проданы.", fr: "Les billets sont déjà tous vendus." },
        { speaker: "Максим", ru: "Неудивительно, это важное событие!", fr: "Pas étonnant, c'est un événement important !" },
      ],
      quiz: [
        {
          question: "Comment sont les billets pour le festival ?",
          choices: ["Encore disponibles", "Tous vendus", "Gratuits"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-13",
    index: 13,
    title: "Les gérondifs",
    subtitle: "Деепричастия : enchaîner deux actions avec style",
    color: "purple",
    level: "B2",
    grammar: [
      {
        title: "Le gérondif imperfectif (action simultanée)",
        explanation:
          "Formé sur le radical du présent + -я/-а (читая, говоря), il exprime une action qui se déroule en même temps que l'action principale.",
        examples: [
          { ru: "Он читает, слушая музыку.", fr: "Il lit en écoutant de la musique." },
          { ru: "Она улыбается, говоря со мной.", fr: "Elle sourit en me parlant." },
        ],
      },
      {
        title: "Le gérondif perfectif (action antérieure)",
        explanation:
          "Formé sur le radical du passé + -в/-вши (прочитав, сказав), il exprime une action achevée avant l'action principale — un raccourci élégant pour « après avoir fait… ».",
        examples: [
          { ru: "Прочитав книгу, она пошла спать.", fr: "Ayant lu le livre, elle est allée dormir." },
          { ru: "Сказав это, он ушёл.", fr: "Ayant dit cela, il est parti." },
        ],
        tip: "Le sujet du gérondif est toujours le même que celui de la phrase principale.",
      },
    ],
    pronunciation: {
      title: "Le rythme des propositions au gérondif",
      explanation:
        "À l'oral, on marque une légère pause avant et après le gérondif, comme à l'écrit avec les virgules qui l'encadrent.",
      items: [
        { ru: "Прочитав книгу, ...", frenchSound: "pause nette après « книгу »", fr: "Ayant lu le livre, ..." },
        { ru: "..., улыбаясь.", frenchSound: "légère pause avant « улыбаясь »", fr: "..., en souriant." },
      ],
    },
    spelling: [
      { ru: "читая", fr: "en lisant" },
      { ru: "говоря", fr: "en parlant" },
      { ru: "прочитав", fr: "ayant lu" },
      { ru: "сказав", fr: "ayant dit" },
      { ru: "слушая", fr: "en écoutant" },
      { ru: "увидев", fr: "ayant vu" },
    ],
    vocabulary: [
      { ru: "слушая", fr: "en écoutant", transcription: "sloouchaia" },
      { ru: "увидев", fr: "ayant vu", transcription: "ouvidev" },
      { ru: "узнав", fr: "ayant appris (une nouvelle)", transcription: "ouznav" },
      { ru: "вернувшись", fr: "étant rentré", transcription: "vernouvchis" },
      { ru: "продолжая", fr: "en continuant", transcription: "pradaljaia" },
      { ru: "начиная", fr: "en commençant", transcription: "natchinaia" },
      { ru: "заканчивая", fr: "en finissant", transcription: "zakantchivaia" },
      { ru: "одновременно", fr: "simultanément", transcription: "adnavremenna" },
      { ru: "внезапно", fr: "soudain", transcription: "vnezapna" },
      { ru: "пока", fr: "pendant que", transcription: "paka" },
    ],
    mindMap: {
      center: "Деепричастия",
      branches: [
        { label: "Imperfectif", children: ["-я / -а", "action simultanée", "читая"] },
        { label: "Perfectif", children: ["-в / -вши", "action antérieure", "прочитав"] },
        { label: "Règle d'or", children: ["même sujet que la phrase principale"] },
        { label: "À l'écrit", children: ["remplace « et il… »", "style fluide et littéraire"] },
      ],
    },
    story: {
      title: "Утро, начатое с сюрприза (Un matin qui a commencé par une surprise)",
      paragraphs: [
        { ru: "Проснувшись рано, я услышал странный шум на кухне.", fr: "M'étant réveillé tôt, j'ai entendu un bruit étrange dans la cuisine." },
        { ru: "Войдя туда, я увидел кота, играющего с чашкой.", fr: "En y entrant, j'ai vu le chat jouant avec une tasse." },
        { ru: "Улыбнувшись, я взял чашку, не говоря ни слова.", fr: "Ayant souri, j'ai pris la tasse, sans dire un mot." },
      ],
      questions: [
        {
          question: "Que veut dire « проснувшись » ?",
          choices: ["en dormant", "s'étant réveillé", "il se réveille"],
          correctIndex: 1,
        },
        {
          question: "Le gérondif perfectif exprime une action…",
          choices: ["simultanée", "future", "achevée avant l'action principale"],
          correctIndex: 2,
        },
      ],
      writingPrompt: "Raconte une petite scène du matin en utilisant au moins un gérondif imperfectif et un perfectif.",
      writingHint: "Exemple : Проснувшись, я встал. Пя завтракаю, слушая радио.",
    },
    podcast: {
      title: "Épisode 13 — Une histoire bien racontée",
      description: "Un ami raconte une aventure de voyage avec un style fluide, riche en gérondifs.",
      lines: [
        { speaker: "Дима", ru: "Расскажи о поездке!", fr: "Raconte-moi ton voyage !" },
        { speaker: "Соня", ru: "Приехав в город, я сразу пошла гулять.", fr: "Arrivée en ville, je suis tout de suite allée me promener." },
        { speaker: "Дима", ru: "И что ты увидела?", fr: "Et qu'as-tu vu ?" },
        { speaker: "Соня", ru: "Идя по улице, я увидела старый замок.", fr: "En marchant dans la rue, j'ai vu un vieux château." },
        { speaker: "Дима", ru: "Ты зашла внутрь?", fr: "Tu es entrée à l'intérieur ?" },
        { speaker: "Соня", ru: "Да, и, войдя, я была поражена красотой.", fr: "Oui, et, en entrant, j'ai été frappée par la beauté." },
      ],
      quiz: [
        {
          question: "Qu'a vu Соня en marchant dans la rue ?",
          choices: ["Un musée", "Un vieux château", "Une gare"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-14",
    index: 14,
    title: "Subordination et conditionnel",
    subtitle: "Который, чтобы, если бы",
    color: "yellow",
    level: "B2",
    grammar: [
      {
        title: "Который décliné dans tous les sens",
        explanation:
          "« Который » (qui, que, lequel) s'accorde en genre et en nombre avec son antécédent, mais se décline selon SA fonction dans la proposition relative.",
        examples: [
          { ru: "Человек, которого я видел…", fr: "L'homme que j'ai vu… (accusatif : COD de « voir »)" },
          { ru: "Дом, в котором я живу…", fr: "La maison dans laquelle j'habite… (prépositionnel après « в »)" },
        ],
      },
      {
        title: "Le conditionnel avec бы",
        explanation:
          "Le passé + бы exprime l'hypothèse ou l'irréel (sans distinction présent/passé, contrairement au français). « Чтобы » + passé exprime un but ou une volonté concernant quelqu'un d'autre.",
        examples: [
          { ru: "Если бы я знал, я бы сказал.", fr: "Si je savais/avais su, je le dirais/l'aurais dit." },
          { ru: "Я хочу, чтобы ты пришёл.", fr: "Je veux que tu viennes." },
        ],
        tip: "Бы est une petite particule mobile : elle se place juste après le mot qu'elle met en relief, souvent après le verbe.",
      },
    ],
    pronunciation: {
      title: "L'intonation des phrases hypothétiques",
      explanation: "On marque une pause après la virgule qui précède который, чтобы ou если — un signal clair de la subordination.",
      items: [
        { ru: "Если бы…, я бы…", frenchSound: "voix suspendue sur la première partie", fr: "Si… (hypothèse), je … (conséquence)" },
        { ru: "Дом, в котором…", frenchSound: "légère pause avant « в котором »", fr: "La maison dans laquelle…" },
      ],
    },
    spelling: [
      { ru: "который", fr: "qui, lequel" },
      { ru: "которого", fr: "que (accusatif animé)" },
      { ru: "которой", fr: "de laquelle" },
      { ru: "чтобы", fr: "pour que, que" },
      { ru: "если бы", fr: "si (hypothèse)" },
      { ru: "хотел бы", fr: "je voudrais" },
    ],
    vocabulary: [
      { ru: "который", fr: "qui, lequel", transcription: "katory" },
      { ru: "чтобы", fr: "pour que, que", transcription: "chtoby" },
      { ru: "если бы", fr: "si (hypothèse)", transcription: "esli by" },
      { ru: "конечно", fr: "bien sûr", transcription: "kanechna" },
      { ru: "возможно", fr: "peut-être, il se peut", transcription: "vazmojna" },
      { ru: "наверное", fr: "probablement", transcription: "navernae" },
      { ru: "кажется", fr: "il semble que", transcription: "kajetsa" },
      { ru: "в случае если", fr: "au cas où", transcription: "v sloutchae esli" },
      { ru: "при условии", fr: "à condition que", transcription: "pri ouslovii" },
      { ru: "зависеть", fr: "dépendre", transcription: "zaviset" },
    ],
    mindMap: {
      center: "Subordination & conditionnel",
      branches: [
        { label: "Который", children: ["s'accorde avec l'antécédent", "se décline selon sa fonction"] },
        { label: "Чтобы", children: ["but", "volonté envers autrui"] },
        { label: "Если бы", children: ["hypothèse irréelle", "pas de distinction présent/passé"] },
        { label: "Marqueurs", children: ["конечно", "возможно", "кажется"] },
      ],
    },
    story: {
      title: "Если бы у меня было больше времени… (Si j'avais plus de temps…)",
      paragraphs: [
        { ru: "Если бы у меня было больше времени, я бы путешествовал каждый год.", fr: "Si j'avais plus de temps, je voyagerais chaque année." },
        { ru: "Я хочу, чтобы моя семья тоже увидела эти места.", fr: "Je veux que ma famille voie ces endroits aussi." },
        { ru: "Страна, которую я мечтаю посетить, — это Япония.", fr: "Le pays que je rêve de visiter, c'est le Japon." },
      ],
      questions: [
        {
          question: "Que ferait le narrateur s'il avait plus de temps ?",
          choices: ["Il travaillerait plus", "Il voyagerait chaque année", "Il resterait chez lui"],
          correctIndex: 1,
        },
        {
          question: "« Чтобы » introduit ici…",
          choices: ["une hypothèse", "une volonté concernant quelqu'un d'autre", "une cause"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Écris 3 phrases avec « если бы » pour décrire ce que tu ferais dans une situation imaginaire.",
      writingHint: "Exemple : Если бы я был богат, я бы путешествовал. Я хочу, чтобы все были счастливы.",
    },
    podcast: {
      title: "Épisode 14 — Et si tu gagnais au loto ?",
      description: "Deux amis imaginent ce qu'ils feraient avec beaucoup d'argent.",
      lines: [
        { speaker: "Лёша", ru: "Что бы ты сделал, если бы выиграл в лотерею?", fr: "Que ferais-tu si tu gagnais à la loterie ?" },
        { speaker: "Марина", ru: "Я бы купила дом, в котором давно мечтала жить.", fr: "J'achèterais la maison dans laquelle je rêve d'habiter depuis longtemps." },
        { speaker: "Лёша", ru: "А путешествия?", fr: "Et les voyages ?" },
        { speaker: "Марина", ru: "Конечно! Я хочу, чтобы вся семья поехала со мной.", fr: "Bien sûr ! Je veux que toute la famille parte avec moi." },
        { speaker: "Лёша", ru: "Возможно, я бы тоже так сделал.", fr: "Peut-être que je ferais pareil." },
        { speaker: "Марина", ru: "Всё зависит от суммы, наверное!", fr: "Tout dépend de la somme, sans doute !" },
      ],
      quiz: [
        {
          question: "Qu'achèterait Марина si elle gagnait à la loterie ?",
          choices: ["Une voiture", "La maison dont elle rêve", "Un billet d'avion"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-15",
    index: 15,
    title: "La voix passive et le style soutenu",
    subtitle: "Décrire sans dire qui agit",
    color: "red",
    level: "C1",
    grammar: [
      {
        title: "Le passif réfléchi en -ся (imperfectif)",
        explanation:
          "En ajoutant -ся à un verbe transitif, le sujet devient celui qui subit l'action — utile en style journalistique ou administratif quand l'agent importe peu.",
        examples: [
          { ru: "Дом строится рабочими.", fr: "La maison est construite par les ouvriers." },
          { ru: "Проблема решается.", fr: "Le problème est en train d'être résolu." },
        ],
      },
      {
        title: "Le participe passé court comme passif (perfectif)",
        explanation:
          "Pour une action perfective achevée, on emploie la forme courte du participe passé passif, avec « être » sous-entendu au présent.",
        examples: [
          { ru: "Дом построен в 1990 году.", fr: "La maison a été construite en 1990." },
          { ru: "Задача решена.", fr: "Le problème est résolu." },
        ],
        tip: "Passif en cours → -ся (imperfectif). Passif achevé avec résultat → participe court (perfectif).",
      },
    ],
    pronunciation: {
      title: "Le débit posé du registre soutenu",
      explanation:
        "À l'oral formel (actualités, conférences), le débit ralentit légèrement et chaque participe est clairement articulé.",
      items: [
        { ru: "рассма́тривается", frenchSound: "articuler chaque syllabe distinctement", fr: "est examiné(e)" },
        { ru: "бы́ло при́нято", frenchSound: "deux mots bien détachés", fr: "il a été décidé" },
      ],
    },
    spelling: [
      { ru: "строится", fr: "est construit(e) (en cours)" },
      { ru: "решается", fr: "est résolu(e) (en cours)" },
      { ru: "построен", fr: "construit (résultat)" },
      { ru: "решена", fr: "résolue (résultat)" },
      { ru: "создаётся", fr: "est créé(e)" },
      { ru: "было принято", fr: "il a été décidé" },
    ],
    vocabulary: [
      { ru: "осуществляться", fr: "se réaliser", transcription: "asouchestvliatsa" },
      { ru: "рассматриваться", fr: "être examiné", transcription: "rassmatrivatsa" },
      { ru: "считаться", fr: "être considéré", transcription: "schitatsa" },
      { ru: "предполагаться", fr: "être supposé, prévu", transcription: "predpalagatsa" },
      { ru: "утверждать", fr: "affirmer", transcription: "outverjdat" },
      { ru: "в связи с", fr: "en lien avec", transcription: "v sviazi s" },
      { ru: "таким образом", fr: "ainsi", transcription: "takim obrazam" },
      { ru: "с одной стороны", fr: "d'un côté", transcription: "s adnoi starony" },
      { ru: "с другой стороны", fr: "d'un autre côté", transcription: "s drougoi starony" },
      { ru: "в целом", fr: "dans l'ensemble", transcription: "v tselam" },
    ],
    mindMap: {
      center: "Voix passive",
      branches: [
        { label: "-ся passif", children: ["imperfectif", "action en cours", "строится"] },
        { label: "Participe court", children: ["perfectif", "résultat", "построен"] },
        { label: "Registre", children: ["journalistique", "administratif", "académique"] },
        { label: "Connecteurs", children: ["таким образом", "в связи с", "в целом"] },
      ],
    },
    story: {
      title: "Новый мост открыт (Le nouveau pont est ouvert)",
      paragraphs: [
        { ru: "Мост через реку строился три года и наконец построен.", fr: "Le pont sur la rivière était en construction depuis trois ans, et il est enfin construit." },
        { ru: "Проект рассматривался городским советом с одной стороны как дорогой, с другой — как необходимый.", fr: "Le projet a été examiné par le conseil municipal, d'un côté comme coûteux, de l'autre comme nécessaire." },
        { ru: "Таким образом, было принято решение открыть мост в этом году.", fr: "Ainsi, la décision a été prise d'ouvrir le pont cette année." },
      ],
      questions: [
        {
          question: "Le mont a été construit en combien de temps ?",
          choices: ["Un an", "Trois ans", "Dix ans"],
          correctIndex: 1,
        },
        {
          question: "« Построен » exprime…",
          choices: ["une action en cours", "un résultat achevé", "une intention future"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Rédige 3 phrases dans un style soutenu décrivant un projet (utilise -ся et un participe court passif).",
      writingHint: "Exemple : Проект разрабатывается. Решение принято. Результат считается успешным.",
    },
    podcast: {
      title: "Épisode 15 — Le journal du soir",
      description: "Un bulletin d'information fictif, dans un registre soutenu, sur un grand projet urbain.",
      lines: [
        { speaker: "Ведущая", ru: "Добрый вечер! Сегодня в новостях: новый парк открыт в центре города.", fr: "Bonsoir ! Aujourd'hui dans l'actualité : un nouveau parc est ouvert au centre-ville." },
        { speaker: "Корреспондент", ru: "Парк создавался в течение двух лет.", fr: "Le parc a été créé pendant deux ans." },
        { speaker: "Ведущая", ru: "Что говорят жители?", fr: "Que disent les habitants ?" },
        { speaker: "Корреспондент", ru: "Проект в целом считается успешным.", fr: "Le projet est globalement considéré comme réussi." },
        { speaker: "Ведущая", ru: "А что предполагается сделать дальше?", fr: "Et qu'est-il prévu de faire ensuite ?" },
        { speaker: "Корреспондент", ru: "Предполагается построить ещё один парк в следующем году.", fr: "Il est prévu de construire un autre parc l'année prochaine." },
      ],
      quiz: [
        {
          question: "Comment le projet est-il globalement perçu ?",
          choices: ["Comme un échec", "Comme réussi", "Comme trop cher"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-16",
    index: 16,
    title: "Le discours rapporté",
    subtitle: "Rapporter les paroles de quelqu'un avec nuance",
    color: "blue",
    level: "C1",
    grammar: [
      {
        title: "Discours indirect : pas de concordance des temps",
        explanation:
          "Contrairement au français, le russe garde le temps de la parole d'origine dans le discours rapporté : on ne recule jamais le temps du verbe. Seuls les pronoms changent.",
        examples: [
          { ru: "Он сказал: «Я устал». → Он сказал, что он устал.", fr: "Il a dit : « Je suis fatigué ». → Il a dit qu'il était fatigué." },
          { ru: "Она спросила: «Ты придёшь?» → Она спросила, приду ли я.", fr: "Elle a demandé : « Tu viendras ? » → Elle a demandé si je viendrais." },
        ],
        tip: "Pour une question fermée (oui/non), on utilise « ли » juste après le verbe, sans « если ».",
      },
      {
        title: "Nuances aspectuelles à l'impératif négatif",
        explanation:
          "À l'impératif négatif, l'imperfectif exprime un conseil général (« ne fais pas l'habitude de… ») tandis que le perfectif avertit d'un risque ponctuel précis.",
        examples: [
          { ru: "Не закрывай окно!", fr: "Ne ferme pas la fenêtre (consigne générale, laisse-la ouverte)." },
          { ru: "Не закрой дверь случайно!", fr: "Attention à ne pas fermer la porte par erreur (un seul événement précis à éviter)." },
        ],
      },
    ],
    pronunciation: {
      title: "L'intonation des questions rapportées",
      explanation:
        "Avec « ли », l'intonation monte légèrement sur le mot mis en doute, juste avant « ли », même si la phrase entière est affirmative dans sa structure.",
      items: [
        { ru: "Приду́ ли я…", frenchSound: "montée sur « приду », puis on enchaîne", fr: "si je viendrai…" },
        { ru: "Зна́ет ли он…", frenchSound: "montée sur « знает »", fr: "s'il sait…" },
      ],
    },
    spelling: [
      { ru: "что", fr: "que (affirmation rapportée)" },
      { ru: "ли", fr: "si (question rapportée)" },
      { ru: "сказал", fr: "il a dit" },
      { ru: "спросила", fr: "elle a demandé" },
      { ru: "попросил", fr: "il a demandé (une action)" },
      { ru: "сообщил", fr: "il a informé" },
    ],
    vocabulary: [
      { ru: "сообщать", fr: "informer, annoncer", transcription: "saabschat" },
      { ru: "утверждать", fr: "affirmer", transcription: "outverjdat" },
      { ru: "отрицать", fr: "nier", transcription: "atritsat" },
      { ru: "уточнять", fr: "préciser", transcription: "outotchniat" },
      { ru: "подчёркивать", fr: "souligner (une idée)", transcription: "padtchiorkivat" },
      { ru: "по словам", fr: "selon les propos de", transcription: "pa slavam" },
      { ru: "якобы", fr: "soi-disant, prétendument", transcription: "iakaby" },
      { ru: "будто", fr: "comme si", transcription: "boudta" },
      { ru: "признаться", fr: "avouer", transcription: "priznatsa" },
      { ru: "намекать", fr: "sous-entendre, insinuer", transcription: "namekat" },
    ],
    mindMap: {
      center: "Discours rapporté",
      branches: [
        { label: "Affirmation", children: ["что", "pas de recul du temps"] },
        { label: "Question fermée", children: ["ли", "juste après le verbe"] },
        { label: "Ordre / demande", children: ["чтобы + passé"] },
        { label: "Aspect à l'impératif nég.", children: ["imperfectif = conseil", "perfectif = alerte ponctuelle"] },
      ],
    },
    story: {
      title: "Что сказал министр (Ce qu'a dit le ministre)",
      paragraphs: [
        { ru: "Министр заявил, что экономика растёт.", fr: "Le ministre a déclaré que l'économie croissait." },
        { ru: "Журналист спросил, будет ли повышение зарплат.", fr: "Le journaliste a demandé s'il y aurait une augmentation des salaires." },
        { ru: "По словам министра, решение будет принято скоро, но он якобы ничего не обещал.", fr: "Selon les propos du ministre, la décision sera prise bientôt, mais il n'aurait soi-disant rien promis." },
      ],
      questions: [
        {
          question: "Qu'a demandé le journaliste ?",
          choices: ["Si l'économie croît", "S'il y aura une hausse des salaires", "Quand aura lieu l'élection"],
          correctIndex: 1,
        },
        {
          question: "« Ли » sert à rapporter…",
          choices: ["une affirmation", "une question fermée (oui/non)", "un ordre"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Rapporte au discours indirect 3 phrases qu'un ami t'a dites récemment (affirmation, question, demande).",
      writingHint: "Exemple : Он сказал, что устал. Он спросил, приду ли я. Он попросил, чтобы я помог.",
    },
    podcast: {
      title: "Épisode 16 — Une interview racontée",
      description: "Deux collègues discutent d'une interview qu'ils viennent de regarder, en la rapportant au discours indirect.",
      lines: [
        { speaker: "Олег", ru: "Ты видела интервью с директором?", fr: "Tu as vu l'interview du directeur ?" },
        { speaker: "Аня", ru: "Да! Он сказал, что компания скоро изменится.", fr: "Oui ! Il a dit que l'entreprise allait bientôt changer." },
        { speaker: "Олег", ru: "А журналист спросил, будут ли новые сотрудники?", fr: "Et le journaliste a demandé s'il y aurait de nouveaux employés ?" },
        { speaker: "Аня", ru: "Да, и директор подтвердил, что да.", fr: "Oui, et le directeur a confirmé que oui." },
        { speaker: "Олег", ru: "Он уточнил, когда именно?", fr: "Il a précisé quand exactement ?" },
        { speaker: "Аня", ru: "Он сказал, что это будет в следующем месяце.", fr: "Il a dit que ce serait le mois prochain." },
      ],
      quiz: [
        {
          question: "Qu'a confirmé le directeur ?",
          choices: ["Qu'il n'y aura pas de changement", "Qu'il y aura de nouveaux employés", "Qu'il démissionne"],
          correctIndex: 1,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    id: "palier-17",
    index: 17,
    title: "Registre soutenu et idiomes",
    subtitle: "Vers un russe académique et naturel",
    color: "green",
    level: "C1",
    grammar: [
      {
        title: "Nominalisation : du verbe au nom",
        explanation:
          "Le style soutenu russe préfère souvent un nom d'action à un verbe conjugué — une transformation typique de l'écrit académique ou administratif.",
        examples: [
          { ru: "Мы обсудили это. → Состоялось обсуждение этого вопроса.", fr: "Nous en avons discuté. → La discussion de cette question a eu lieu." },
          { ru: "изменить → изменение", fr: "changer → le changement" },
        ],
      },
      {
        title: "Expressions idiomatiques courantes",
        explanation:
          "Le russe cultivé est riche en expressions figées, à connaître telles quelles pour sonner naturel à l'oral comme à l'écrit.",
        examples: [
          { ru: "Взять себя в руки.", fr: "Se ressaisir (litt. « se prendre en main »)." },
          { ru: "Это не моё дело.", fr: "Ce ne sont pas mes affaires." },
          { ru: "Ни пуха ни пера!", fr: "Bonne chance ! (réponse rituelle : « К чёрту! »)" },
        ],
        tip: "Ne traduis jamais un idiome mot à mot : apprends-le comme un bloc entier.",
      },
    ],
    pronunciation: {
      title: "Le débit du russe soutenu à l'oral",
      explanation:
        "Dans un discours formel (conférence, débat), les connecteurs logiques sont mis en valeur par une légère pause avant et un ton plus posé.",
      items: [
        { ru: "следовательно,", frenchSound: "pause avant, ton posé", fr: "par conséquent," },
        { ru: "тем не менее,", frenchSound: "légèrement détaché du reste", fr: "néanmoins," },
      ],
    },
    spelling: [
      { ru: "обсуждение", fr: "discussion" },
      { ru: "следовательно", fr: "par conséquent" },
      { ru: "тем не менее", fr: "néanmoins" },
      { ru: "взять себя в руки", fr: "se ressaisir" },
      { ru: "ни пуха ни пера", fr: "bonne chance" },
      { ru: "к чёрту", fr: "réponse rituelle à « bonne chance »" },
    ],
    vocabulary: [
      { ru: "следовательно", fr: "par conséquent", transcription: "sledavatelna" },
      { ru: "тем не менее", fr: "néanmoins", transcription: "tem ne menee" },
      { ru: "с точки зрения", fr: "du point de vue de", transcription: "s totchki zrenia" },
      { ru: "в целом", fr: "dans l'ensemble", transcription: "v tselam" },
      { ru: "взять себя в руки", fr: "se ressaisir", transcription: "vziat sebia v rouki" },
      { ru: "ни пуха ни пера", fr: "bonne chance", transcription: "ni poukha ni pera" },
      { ru: "душа компании", fr: "l'âme de la fête", transcription: "doucha kampanii" },
      { ru: "брать быка за рога", fr: "prendre le taureau par les cornes", transcription: "brat byka za raga" },
      { ru: "обсуждение", fr: "discussion", transcription: "apsoujdenie" },
      { ru: "точка зрения", fr: "point de vue", transcription: "totchka zrenia" },
    ],
    mindMap: {
      center: "Registre soutenu & idiomes",
      branches: [
        { label: "Nominalisation", children: ["verbe → nom", "обсудить → обсуждение"] },
        { label: "Connecteurs soutenus", children: ["следовательно", "тем не менее"] },
        { label: "Idiomes courants", children: ["взять себя в руки", "ни пуха ни пера"] },
        { label: "Registre académique", children: ["с точки зрения", "в целом"] },
      ],
    },
    story: {
      title: "Точка зрения (Un point de vue)",
      paragraphs: [
        { ru: "С точки зрения многих экспертов, изменение климата — главная проблема века.", fr: "Du point de vue de nombreux experts, le changement climatique est le problème majeur du siècle." },
        { ru: "Тем не менее, обсуждение решений продолжается уже много лет.", fr: "Néanmoins, la discussion des solutions se poursuit depuis de nombreuses années." },
        { ru: "Следовательно, каждый из нас должен взять себя в руки и начать действовать.", fr: "Par conséquent, chacun de nous doit se ressaisir et commencer à agir." },
      ],
      questions: [
        {
          question: "Quel est le sujet principal de ce texte ?",
          choices: ["Un idiome sur la chance", "Le changement climatique", "Une recette de cuisine"],
          correctIndex: 1,
        },
        {
          question: "« Взять себя в руки » signifie…",
          choices: ["prendre un objet", "se ressaisir", "aider quelqu'un"],
          correctIndex: 1,
        },
      ],
      writingPrompt: "Rédige un court paragraphe d'opinion (façon dissertation) en utilisant « с точки зрения », « тем не менее » et « следовательно ».",
      writingHint: "Exemple : С точки зрения студентов, экзамены слишком сложные. Тем не менее, они необходимы. Следовательно, нужно найти баланс.",
    },
    podcast: {
      title: "Épisode 17 — Un débat à la radio",
      description: "Deux invités débattent poliment d'un sujet de société dans un registre soutenu.",
      lines: [
        { speaker: "Ведущий", ru: "Какова ваша точка зрения на этот вопрос?", fr: "Quel est votre point de vue sur cette question ?" },
        { speaker: "Гость 1", ru: "С моей точки зрения, изменения необходимы.", fr: "De mon point de vue, des changements sont nécessaires." },
        { speaker: "Гость 2", ru: "Тем не менее, нужно действовать осторожно.", fr: "Néanmoins, il faut agir avec prudence." },
        { speaker: "Ведущий", ru: "Следовательно, вы не согласны друг с другом?", fr: "Par conséquent, vous n'êtes pas d'accord l'un avec l'autre ?" },
        { speaker: "Гость 1", ru: "В целом, мы согласны, но детали различаются.", fr: "Dans l'ensemble, nous sommes d'accord, mais les détails diffèrent." },
        { speaker: "Гость 2", ru: "Точно. Главное — не терять голову и взять себя в руки.", fr: "Exactement. L'essentiel est de garder la tête froide et de se ressaisir." },
      ],
      quiz: [
        {
          question: "Sur quoi les deux invités sont-ils globalement d'accord ?",
          choices: ["Rien du tout", "L'essentiel, malgré des détails différents", "Le sujet n'a aucune importance"],
          correctIndex: 1,
        },
      ],
    },
  },
];

export function getPalierById(id: string): Palier | undefined {
  return paliers.find((p) => p.id === id);
}
