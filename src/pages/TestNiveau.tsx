import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { levelTestQuestions } from "../data/levelTest";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { CEFRLevel, LevelTestQuestion } from "../types/content";

const LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1"];
const LEVEL_COLOR: Record<CEFRLevel, string> = {
  A1: "emerald",
  A2: "sky",
  B1: "amber",
  B2: "violet",
  C1: "rose",
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function TestNiveau() {
  const [stage, setStage] = useState<"intro" | "quiz" | "results">("intro");
  const [order, setOrder] = useState(levelTestQuestions);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const start = () => {
    setOrder(levelTestQuestions);
    setAnswers(new Array(levelTestQuestions.length).fill(null));
    setIndex(0);
    setSelected(null);
    setShowCorrection(false);
    setStage("quiz");
  };

  const next = () => {
    if (selected === null) return;
    const updated = [...answers];
    updated[index] = selected;
    setAnswers(updated);
    if (index + 1 >= order.length) {
      setStage("results");
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  const scores = LEVELS.map((level) => {
    const items = order.map((q, i) => ({ q, i })).filter(({ q }) => q.level === level);
    const correct = items.filter(({ q, i }) => answers[i] === q.correctIndex).length;
    return { level, correct, total: items.length, pct: items.length ? correct / items.length : 0 };
  });

  let estimated: CEFRLevel | null = null;
  for (const s of scores) {
    if (s.pct >= 0.6) estimated = s.level;
    else break;
  }

  if (stage === "intro") {
    return (
      <div>
        <section className="mb-6 flex items-center gap-4">
          <Mascot mood="thinking" size={72} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Test de niveau</h1>
            <p className="text-gray-500 text-sm">25 questions de vocabulaire et de grammaire pour estimer ton niveau CECR actuel.</p>
          </div>
        </section>

        <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">5 questions par niveau, de A1 à C1.</p>
          <p className="text-sm text-gray-600 mb-5">Réponds du mieux que tu peux — pas de retour en arrière, comme un vrai test.</p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-bold hover:bg-fuchsia-700 active:scale-95 transition"
          >
            Commencer le test 📝
          </button>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const q = order[index];
    return <QuizQuestion q={q} index={index} total={order.length} selected={selected} onSelect={setSelected} onNext={next} />;
  }

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood={estimated === "C1" ? "proud" : "happy"} size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Ton niveau estimé</h1>
          <p className="text-gray-500 text-sm">Basé sur tes réponses au test.</p>
        </div>
      </section>

      <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-400 text-white p-6 mb-6 text-center">
        <p className="text-5xl font-bold font-heading">{estimated ?? "< A1"}</p>
        <p className="text-sm text-white/90 mt-1">
          {estimated
            ? `Tu maîtrises solidement les bases jusqu'au niveau ${estimated}.`
            : "Continue à pratiquer les bases — le niveau A1 n'est pas encore acquis à 60%."}
        </p>
      </div>

      <section className="rounded-2xl border border-pink-100 bg-white p-5 mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Détail par niveau</h2>
        <div className="space-y-2.5">
          {scores.map((s) => (
            <div key={s.level} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 w-6 shrink-0">{s.level}</span>
              <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full ${s.pct >= 0.6 ? "bg-emerald-400" : "bg-amber-400"}`}
                  style={{ width: `${s.pct * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">
                {s.correct}/{s.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          to={estimated ? `/palier/palier-1` : "/"}
          className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
        >
          Continuer à apprendre →
        </Link>
        <button
          onClick={start}
          className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-fuchsia-300 transition"
        >
          Refaire le test
        </button>
        <button
          onClick={() => setShowCorrection((v) => !v)}
          className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-fuchsia-300 transition"
        >
          {showCorrection ? "Masquer la correction" : "Voir la correction"}
        </button>
      </div>

      {showCorrection && (
        <section className="space-y-3">
          {order.map((q, i) => {
            const correct = answers[i] === q.correctIndex;
            return (
              <div key={q.id} className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${palierColorClasses[LEVEL_COLOR[q.level]].badge}`}>
                    {q.level}
                  </span>
                  <span className={`text-xs font-semibold ${correct ? "text-emerald-600" : "text-red-500"}`}>
                    {correct ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                </div>
                <p className="font-cyrillic font-semibold text-gray-900 mb-1">{q.prompt}</p>
                <p className="text-xs text-gray-600">
                  Bonne réponse : <span className="font-semibold text-gray-800">{q.choices[q.correctIndex]}</span>
                  {!correct && answers[i] !== null && (
                    <>
                      {" "}
                      · Ta réponse : <span className="text-red-500">{q.choices[answers[i]!]}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-1">{q.explanation}</p>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

function QuizQuestion({
  q,
  index,
  total,
  selected,
  onSelect,
  onNext,
}: {
  q: LevelTestQuestion;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (originalIndex: number) => void;
  onNext: () => void;
}) {
  const shuffledMap = useMemo(() => shuffle(q.choices.map((_, i) => i)), [q]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          Question {index + 1} / {total}
        </p>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${palierColorClasses[LEVEL_COLOR[q.level]].badge}`}>
          {q.level}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400 transition-all"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-5 mb-5">
        <p className="font-cyrillic text-lg font-semibold text-gray-900">{q.prompt}</p>
      </div>

      <div className="space-y-2">
        {shuffledMap.map((originalIndex) => (
          <button
            key={originalIndex}
            onClick={() => onSelect(originalIndex)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${
              selected === originalIndex ? "border-fuchsia-400 bg-fuchsia-50/60" : "border-gray-200 bg-white hover:border-fuchsia-200"
            }`}
          >
            {q.choices[originalIndex]}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={selected === null}
        className="w-full mt-6 py-3 rounded-full bg-fuchsia-600 text-white font-bold hover:bg-fuchsia-700 active:scale-95 transition disabled:opacity-40"
      >
        {index + 1 >= total ? "Voir mon résultat" : "Suivant →"}
      </button>
    </div>
  );
}
