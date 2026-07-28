import { useMemo, useState } from "react";
import type { AlphabetLetter } from "../../types/content";
import { useSpeech } from "../../hooks/useSpeech";
import { Mascot } from "../Mascot";

type Round = 1 | 2 | "done";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDistractors(letters: AlphabetLetter[], exclude: AlphabetLetter, n: number): AlphabetLetter[] {
  return shuffle(letters.filter((l) => l.upper !== exclude.upper)).slice(0, n);
}

export function AlphabetExpress({ letters, onDone }: { letters: AlphabetLetter[]; onDone: () => void }) {
  const { speak, supported: ttsSupported, speakingId } = useSpeech();

  const [round, setRound] = useState<Round>(1);
  const [queue, setQueue] = useState<AlphabetLetter[]>(() => shuffle(letters));
  const [masteredCount, setMasteredCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false); // manche 2 : révèle le mot après la réponse
  const [round1Score, setRound1Score] = useState({ correct: 0, total: 0 });
  const [round2Score, setRound2Score] = useState({ correct: 0, total: 0 });

  const current = queue[0];

  const options = useMemo(() => {
    if (!current) return [];
    if (round === 1) {
      const distractors = pickDistractors(letters, current, 3).map((l) => l.name);
      return shuffle([current.name, ...distractors]);
    }
    if (round === 2) {
      const distractors = pickDistractors(letters, current, 3);
      return shuffle([current, ...distractors]);
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, round]);

  if (!current && round !== "done") {
    // La manche est vide : on passe à la suivante, ou on termine la leçon.
    if (round === 1) {
      setRound(2);
      setQueue(shuffle(letters));
      setMasteredCount(0);
    } else {
      setRound("done");
    }
    return null;
  }

  const answer = (choiceValue: string, isCorrect: boolean) => {
    if (selected) return;
    setSelected(choiceValue);
    setRevealed(true);

    if (round === 1) setRound1Score((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (round === 2) setRound2Score((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));

    window.setTimeout(() => {
      setQueue((q) => {
        const [first, ...rest] = q;
        if (isCorrect) {
          setMasteredCount((c) => c + 1);
          return rest;
        }
        // Lettre pas encore maîtrisée : on la replace un peu plus loin dans la pile.
        const insertAt = Math.min(rest.length, 3);
        return [...rest.slice(0, insertAt), first, ...rest.slice(insertAt)];
      });
      setSelected(null);
      setRevealed(false);
    }, 700);
  };

  if (round === "done") {
    const total = round1Score.total + round2Score.total;
    const correct = round1Score.correct + round2Score.correct;
    const score = total > 0 ? Math.round((correct / total) * 100) : 100;
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
        <Mascot mood="proud" size={80} className="mx-auto mb-3" />
        <p className="text-lg font-bold text-gray-900 font-heading">Leçon express terminée !</p>
        <p className="text-sm text-gray-500 mb-1">Les 33 lettres reconnues dans les deux manches. 🎉</p>
        <p className="text-xs text-gray-400 mb-4">Précision globale : {score}%</p>
        <button
          onClick={onDone}
          className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
        >
          Valider la leçon ✓
        </button>
      </div>
    );
  }

  const progress = masteredCount / letters.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-fuchsia-700">
          Manche {round}/2 · {round === 1 ? "Quel est le son de la lettre ?" : "Reconnais la lettre à l'oreille"}
        </p>
        <p className="text-xs text-gray-400">
          {masteredCount}/{letters.length}
        </p>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
        {round === 1 ? (
          <p className="text-6xl font-bold text-gray-900 font-cyrillic mb-6">
            {current.upper}
            {current.lower}
          </p>
        ) : (
          <div className="mb-6">
            <button
              onClick={() => ttsSupported && speak(current.example.ru, `express-${current.upper}`, { rate: 0.8 })}
              className={`w-20 h-20 rounded-full bg-fuchsia-600 text-white text-3xl flex items-center justify-center mx-auto hover:bg-fuchsia-700 active:scale-95 transition shadow-lg shadow-fuchsia-200 ${
                speakingId === `express-${current.upper}` ? "animate-speaking" : ""
              }`}
            >
              🔊
            </button>
            <p className="text-xs text-gray-400 mt-3">
              {revealed
                ? `${current.example.ru} — ${current.example.fr}`
                : ttsSupported
                ? "Écoute le mot : par quelle lettre commence-t-il ?"
                : `${current.example.ru} — par quelle lettre commence ce mot ?`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {round === 1
            ? (options as string[]).map((name) => {
                const isCorrect = selected && name === current.name;
                const isWrongPick = selected === name && name !== current.name;
                return (
                  <button
                    key={name}
                    disabled={Boolean(selected)}
                    onClick={() => answer(name, name === current.name)}
                    className={`rounded-xl border-2 px-3 py-3 text-base font-semibold transition ${
                      isCorrect
                        ? "border-green-400 bg-green-50 text-green-700"
                        : isWrongPick
                        ? "border-red-300 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white hover:border-fuchsia-300"
                    }`}
                  >
                    {name}
                  </button>
                );
              })
            : (options as AlphabetLetter[]).map((letter) => {
                const isCorrect = selected && letter.upper === current.upper;
                const isWrongPick = selected === letter.upper && letter.upper !== current.upper;
                return (
                  <button
                    key={letter.upper}
                    disabled={Boolean(selected)}
                    onClick={() => answer(letter.upper, letter.upper === current.upper)}
                    className={`rounded-xl border-2 px-3 py-4 text-3xl font-bold font-cyrillic transition ${
                      isCorrect
                        ? "border-green-400 bg-green-50 text-green-700"
                        : isWrongPick
                        ? "border-red-300 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white hover:border-fuchsia-300"
                    }`}
                  >
                    {letter.upper}
                    {letter.lower}
                  </button>
                );
              })}
        </div>
      </div>
    </div>
  );
}
