import { useState } from "react";
import type { Podcast } from "../../types/content";
import { useSpeech } from "../../hooks/useSpeech";
import { SpeakButton } from "../SpeakButton";

export function PodcastLesson({
  podcast,
  listened,
  onListened,
  onQuizDone,
}: {
  podcast: Podcast;
  listened: boolean;
  onListened: () => void;
  onQuizDone: (score: number) => void;
}) {
  const { speakSequence, speakingId, supported, cancel } = useSpeech();
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(podcast.quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const playAll = () => {
    setIsPlaying(true);
    const items = podcast.lines.map((line, i) => ({ id: `pod-line-${i}`, text: line.ru }));
    speakSequence(items, undefined, () => {
      setIsPlaying(false);
      onListened();
    });
  };

  const stop = () => {
    cancel();
    setIsPlaying(false);
  };

  const submitQuiz = () => {
    setSubmitted(true);
    const correct = answers.filter((a, i) => a === podcast.quiz[i].correctIndex).length;
    onQuizDone(Math.round((correct / podcast.quiz.length) * 100));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="font-semibold text-gray-900">🎙️ {podcast.title}</h3>
            <p className="text-sm text-gray-500">{podcast.description}</p>
          </div>
          {listened && <span className="text-xs text-green-600 font-medium whitespace-nowrap">Écouté ✓</span>}
        </div>

        <div className="flex items-center gap-2 my-4">
          {supported ? (
            !isPlaying ? (
              <button
                onClick={playAll}
                className="px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition flex items-center gap-2"
              >
                ▶ Écouter l'épisode
              </button>
            ) : (
              <button
                onClick={stop}
                className="px-5 py-2.5 rounded-full bg-gray-900 active:scale-95 text-white font-medium hover:bg-gray-700 transition flex items-center gap-2"
              >
                ⏹ Arrêter
              </button>
            )
          ) : (
            <p className="text-xs text-gray-400">La synthèse vocale n'est pas disponible sur ce navigateur.</p>
          )}
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-rose-300"
          >
            {showTranslation ? "Masquer la traduction" : "Voir la traduction"}
          </button>
        </div>

        <div className="space-y-2">
          {podcast.lines.map((line, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg px-3 py-2 transition ${
                speakingId === `pod-line-${i}` ? "bg-rose-50 ring-1 ring-rose-300" : ""
              }`}
            >
              <SpeakButton text={line.ru} id={`pod-line-${i}`} size="sm" />
              <div>
                <p className="text-xs font-medium text-rose-600">{line.speaker}</p>
                <p className="font-cyrillic text-gray-900">{line.ru}</p>
                {showTranslation && <p className="text-sm text-gray-400">{line.fr}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="font-semibold text-gray-900 mb-3">Quiz d'écoute</h4>
        <div className="space-y-4">
          {podcast.quiz.map((q, qi) => (
            <div key={qi}>
              <p className="text-sm font-medium text-gray-700 mb-2">{q.question}</p>
              <div className="flex flex-col gap-1.5">
                {q.choices.map((choice, ci) => {
                  const selected = answers[qi] === ci;
                  const isCorrect = submitted && ci === q.correctIndex;
                  const isWrong = submitted && selected && ci !== q.correctIndex;
                  return (
                    <button
                      key={ci}
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => prev.map((a, i) => (i === qi ? ci : a)))}
                      className={`text-left text-sm rounded-lg border px-3 py-2 transition ${
                        isCorrect
                          ? "border-green-400 bg-green-50 text-green-700"
                          : isWrong
                          ? "border-red-300 bg-red-50 text-red-600"
                          : selected
                          ? "border-rose-400 bg-rose-50"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button
            onClick={submitQuiz}
            disabled={answers.some((a) => a === null)}
            className="mt-4 px-5 py-2 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white text-sm font-medium hover:bg-fuchsia-700 transition disabled:opacity-40"
          >
            Valider mes réponses
          </button>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Score : {answers.filter((a, i) => a === podcast.quiz[i].correctIndex).length} / {podcast.quiz.length} ✓
          </p>
        )}
      </div>
    </div>
  );
}
