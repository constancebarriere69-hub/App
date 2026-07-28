import { useMemo, useState } from "react";
import type { Podcast } from "../../types/content";
import { useSpeech } from "../../hooks/useSpeech";
import { PronunciationChecker } from "../PronunciationChecker";
import { Mascot } from "../Mascot";

interface Turn {
  index: number;
  speaker: string;
  ru: string;
  fr: string;
  options: string[];
}

function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function ConversationPractice({
  podcast,
  onComplete,
}: {
  podcast: Podcast;
  onComplete: (score: number) => void;
}) {
  const { speak, speakingId } = useSpeech();

  const turns: Turn[] = useMemo(() => {
    return podcast.lines.slice(1).map((line, idx) => {
      const i = idx + 1;
      const pool = podcast.lines.filter((_, j) => j !== i).map((l) => l.ru);
      const distractors = shuffled(pool).slice(0, 2);
      return {
        index: i,
        speaker: line.speaker,
        ru: line.ru,
        fr: line.fr,
        options: shuffled([...distractors, line.ru]),
      };
    });
  }, [podcast]);

  const [turnIndex, setTurnIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const turn = turns[turnIndex];
  const history = podcast.lines.slice(0, (turn?.index ?? podcast.lines.length) + (selected ? 1 : 0));

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === turn.ru;
    if (isCorrect) setCorrectCount((c) => c + 1);
    speak(turn.ru, `conv-${turn.index}`, { rate: 0.85 });
  };

  const next = () => {
    if (turnIndex + 1 >= turns.length) {
      setFinished(true);
      const score = Math.round((correctCount / turns.length) * 100);
      onComplete(score);
      return;
    }
    setTurnIndex((i) => i + 1);
    setSelected(null);
  };

  if (turns.length === 0) return null;

  if (finished) {
    const score = Math.round((correctCount / turns.length) * 100);
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
        <Mascot mood={score >= 70 ? "proud" : "happy"} size={64} className="mx-auto mb-2" />
        <p className="text-lg font-bold text-gray-900 font-heading">
          {correctCount} / {turns.length} bonnes réponses
        </p>
        <p className="text-sm text-gray-500 mb-1">Score : {score}%</p>
        <p className="text-xs text-gray-400">Tu peux refaire cette conversation autant de fois que tu veux pour t'entraîner.</p>
        <button
          onClick={() => {
            setFinished(false);
            setTurnIndex(0);
            setSelected(null);
            setCorrectCount(0);
          }}
          className="mt-4 px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
        >
          Recommencer la conversation
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          Tour {turnIndex + 1} / {turns.length} — choisis la bonne réplique pour continuer la conversation.
        </p>
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-fuchsia-300 whitespace-nowrap"
        >
          {showTranslation ? "Masquer trad." : "Voir trad."}
        </button>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-4 mb-4 space-y-2 max-h-80 overflow-y-auto">
        {history.map((line, i) => {
          const isLeft = i % 2 === 0;
          const isNewlyRevealed = selected && i === turn.index;
          return (
            <div key={i} className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  isLeft ? "bg-gray-100 text-gray-800" : "bg-fuchsia-100 text-fuchsia-900"
                } ${isNewlyRevealed ? "animate-pop-in ring-2 ring-fuchsia-300" : ""}`}
              >
                <p className="text-[10px] font-semibold opacity-60">{line.speaker}</p>
                <p className="font-cyrillic">{line.ru}</p>
                {showTranslation && <p className="text-xs opacity-60 mt-0.5">{line.fr}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-pink-100 bg-fuchsia-50/50 p-4">
        <p className="text-xs font-semibold text-fuchsia-700 mb-2">Que répond {turn.speaker} ?</p>
        <div className="flex flex-col gap-2">
          {turn.options.map((option) => {
            const isThisCorrect = selected && option === turn.ru;
            const isThisWrong = selected && option === selected && option !== turn.ru;
            return (
              <button
                key={option}
                disabled={Boolean(selected)}
                onClick={() => choose(option)}
                className={`text-left font-cyrillic rounded-xl border px-3 py-2 text-sm transition ${
                  isThisCorrect
                    ? "border-green-400 bg-green-50 text-green-700"
                    : isThisWrong
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white hover:border-fuchsia-300"
                } ${speakingId === `conv-${turn.index}` && isThisCorrect ? "animate-speaking" : ""}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-3">
            {showTranslation && <p className="text-xs text-gray-500 mb-2">{turn.fr}</p>}
            <PronunciationChecker targetText={turn.ru} />
            <button
              onClick={next}
              className="mt-3 px-5 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
            >
              {turnIndex + 1 >= turns.length ? "Voir mon score" : "Continuer →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
