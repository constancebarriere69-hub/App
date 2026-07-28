import { useState } from "react";
import type { Story } from "../../types/content";
import { SpeakButton } from "../SpeakButton";

export function StoryLesson({
  story,
  writeText,
  writeDone,
  onReadDone,
  onWriteChange,
  onWriteDone,
}: {
  story: Story;
  writeText: string;
  writeDone: boolean;
  onReadDone: (quizScore: number) => void;
  onWriteChange: (text: string) => void;
  onWriteDone: () => void;
}) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(story.questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const submitQuiz = () => {
    setSubmitted(true);
    const correct = answers.filter((a, i) => a === story.questions[i].correctIndex).length;
    onReadDone(Math.round((correct / story.questions.length) * 100));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{story.title}</h3>
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-rose-300"
          >
            {showTranslation ? "Masquer la traduction" : "Voir la traduction"}
          </button>
        </div>
        <div className="space-y-3">
          {story.paragraphs.map((p, i) => (
            <div key={i} className="flex items-start gap-2">
              <SpeakButton text={p.ru} id={`story-p-${i}`} size="sm" />
              <div>
                <p className="font-cyrillic text-lg text-gray-900">{p.ru}</p>
                {showTranslation && <p className="text-sm text-gray-400">{p.fr}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="font-semibold text-gray-900 mb-3">Questions de compréhension</h4>
        <div className="space-y-4">
          {story.questions.map((q, qi) => (
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
                      onClick={() =>
                        setAnswers((prev) => prev.map((a, i) => (i === qi ? ci : a)))
                      }
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
            Score : {answers.filter((a, i) => a === story.questions[i].correctIndex).length} / {story.questions.length} ✓
          </p>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="font-semibold text-gray-900 mb-1">À toi d'écrire !</h4>
        <p className="text-sm text-gray-600 mb-2">{story.writingPrompt}</p>
        <p className="text-xs text-gray-400 mb-3">{story.writingHint}</p>
        <textarea
          value={writeText}
          onChange={(e) => onWriteChange(e.target.value)}
          rows={4}
          placeholder="Écris ton texte en russe ici…"
          className="w-full font-cyrillic text-base rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        <button
          onClick={onWriteDone}
          disabled={writeText.trim().length === 0}
          className="mt-3 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition disabled:opacity-40"
        >
          {writeDone ? "Texte enregistré ✓" : "Enregistrer mon texte ✓"}
        </button>
      </div>
    </div>
  );
}
