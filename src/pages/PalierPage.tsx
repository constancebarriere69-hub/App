import { useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { paliers, getPalierById } from "../data/paliers";
import { useProgressStore } from "../store/progress";
import { ProgressBar } from "../components/ProgressBar";
import { palierColorClasses } from "../lib/palierColors";
import { AlphabetLesson } from "../components/lessons/AlphabetLesson";
import { GrammarLesson } from "../components/lessons/GrammarLesson";
import { PronunciationLesson } from "../components/lessons/PronunciationLesson";
import { SpellingLesson } from "../components/lessons/SpellingLesson";
import { VocabLesson } from "../components/lessons/VocabLesson";
import { MindMapView } from "../components/lessons/MindMapView";
import { StoryLesson } from "../components/lessons/StoryLesson";
import { PodcastLesson } from "../components/lessons/PodcastLesson";
import { ConversationPractice } from "../components/lessons/ConversationPractice";
import { WritingPractice } from "../components/lessons/WritingPractice";
import { XP_VALUES, randomCheer } from "../lib/xp";
import { Mascot } from "../components/Mascot";

type TabKey =
  | "alphabet"
  | "grammaire"
  | "prononciation"
  | "orthographe"
  | "vocabulaire"
  | "fiche"
  | "ecriture"
  | "histoire"
  | "podcast"
  | "conversation";

const ALL_TABS: { key: TabKey; label: string; needsAlphabet?: boolean }[] = [
  { key: "alphabet", label: "Alphabet", needsAlphabet: true },
  { key: "grammaire", label: "Grammaire" },
  { key: "prononciation", label: "Prononciation" },
  { key: "orthographe", label: "Orthographe" },
  { key: "vocabulaire", label: "Vocabulaire" },
  { key: "fiche", label: "Fiche mentale" },
  { key: "ecriture", label: "Écriture" },
  { key: "histoire", label: "Histoire" },
  { key: "podcast", label: "Podcast" },
  { key: "conversation", label: "Conversation" },
];

export function PalierPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const palier = id ? getPalierById(id) : undefined;

  const markStep = useProgressStore((s) => s.markStep);
  const award = useProgressStore((s) => s.award);
  const getLessonProgress = useProgressStore((s) => s.getLessonProgress);
  const getPalierCompletion = useProgressStore((s) => s.getPalierCompletion);

  const tabs = ALL_TABS.filter((t) => !t.needsAlphabet || palier?.alphabet);
  const initialTab = (searchParams.get("tab") as TabKey) ?? tabs[0]?.key;
  const [activeTab, setActiveTab] = useState<TabKey>(tabs.some((t) => t.key === initialTab) ? initialTab : tabs[0].key);

  if (!palier) return <Navigate to="/" replace />;

  const lp = getLessonProgress(palier.id);
  const completion = getPalierCompletion(palier.id, palier);
  const colors = palierColorClasses[palier.color] ?? palierColorClasses.rose;

  const idx = paliers.findIndex((p) => p.id === palier.id);
  const prev = paliers[idx - 1];
  const next = paliers[idx + 1];

  const selectTab = (tab: TabKey) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div>
      <Link to="/" className="text-sm text-gray-400 hover:text-gray-600">
        ← Retour à l'accueil
      </Link>

      <div className="mt-3 mb-6 flex items-start gap-3">
        <Mascot mood={completion >= 1 ? "proud" : "happy"} size={52} />
        <div className="flex-1">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
            Palier {palier.index}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2 font-heading">{palier.title}</h1>
          <p className="text-gray-500">{palier.subtitle}</p>
          <ProgressBar value={completion} colorClass={colors.bar} className="mt-3 max-w-sm" />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => selectTab(tab.key)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab.key ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "alphabet" && palier.alphabet && (
          <AlphabetLesson
            letters={palier.alphabet}
            onDone={() => award(palier.id, "alphabet", true, XP_VALUES.alphabet, randomCheer())}
          />
        )}
        {activeTab === "grammaire" && (
          <GrammarLesson
            points={palier.grammar}
            onDone={() => award(palier.id, "grammar", true, XP_VALUES.grammar, randomCheer())}
          />
        )}
        {activeTab === "prononciation" && (
          <PronunciationLesson
            drill={palier.pronunciation}
            onDone={() => award(palier.id, "pronunciation", true, XP_VALUES.pronunciation, randomCheer())}
            onCheckResult={(score) => {
              if (score >= 60) {
                award(
                  palier.id,
                  "pronunciationCheckScore",
                  score,
                  Math.round((XP_VALUES.pronunciationCheck * score) / 100),
                  randomCheer()
                );
              }
            }}
          />
        )}
        {activeTab === "orthographe" && (
          <SpellingLesson
            words={palier.spelling}
            onDone={(score) => {
              markStep(palier.id, "spellingScore", score);
              award(palier.id, "spelling", true, Math.round((XP_VALUES.spelling * score) / 100), randomCheer());
            }}
          />
        )}
        {activeTab === "vocabulaire" && (
          <VocabLesson
            items={palier.vocabulary}
            onDone={() => award(palier.id, "vocabulary", true, XP_VALUES.vocabulary, randomCheer())}
          />
        )}
        {activeTab === "fiche" && (
          <MindMapView
            mindMap={palier.mindMap}
            onDone={() => award(palier.id, "mindMap", true, XP_VALUES.mindMap, randomCheer())}
          />
        )}
        {activeTab === "ecriture" && (
          <WritingPractice
            vocabulary={palier.vocabulary}
            sentences={[
              ...palier.story.paragraphs.map((p) => p.ru),
              ...palier.podcast.lines.map((l) => l.ru),
            ]}
            onDone={(score) =>
              award(palier.id, "writingPracticeDone", true, Math.round((XP_VALUES.writingPractice * score) / 100), randomCheer())
            }
          />
        )}
        {activeTab === "histoire" && (
          <StoryLesson
            story={palier.story}
            writeText={lp.storyWriteText}
            writeDone={lp.storyWriteDone}
            onReadDone={(score) => {
              markStep(palier.id, "storyRead", true);
              award(palier.id, "storyQuizScore", score, Math.round((XP_VALUES.storyRead * score) / 100), randomCheer());
            }}
            onWriteChange={(text) => markStep(palier.id, "storyWriteText", text)}
            onWriteDone={() => award(palier.id, "storyWriteDone", true, XP_VALUES.storyWrite, randomCheer())}
          />
        )}
        {activeTab === "podcast" && (
          <PodcastLesson
            podcast={palier.podcast}
            listened={lp.podcastListened}
            onListened={() => award(palier.id, "podcastListened", true, XP_VALUES.podcastListened, randomCheer())}
            onQuizDone={(score) =>
              award(palier.id, "podcastQuizScore", score, Math.round((XP_VALUES.podcastQuiz * score) / 100), randomCheer())
            }
          />
        )}
        {activeTab === "conversation" && (
          <ConversationPractice
            podcast={palier.podcast}
            onComplete={(score) =>
              award(palier.id, "conversationDone", true, Math.round((XP_VALUES.conversation * score) / 100), randomCheer())
            }
          />
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
        {prev ? (
          <Link to={`/palier/${prev.id}`} className="text-sm text-gray-500 hover:text-gray-800">
            ← Palier {prev.index} · {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/palier/${next.id}`} className="text-sm text-gray-500 hover:text-gray-800">
            Palier {next.index} · {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
