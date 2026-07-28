import { useState } from "react";
import type { AlphabetLetter } from "../../types/content";
import { useSpeech } from "../../hooks/useSpeech";
import { useProgressStore } from "../../store/progress";
import { XP_VALUES, randomCheer } from "../../lib/xp";
import { Mascot } from "../Mascot";

const GROUP_SIZE = 5;
type Round = 1 | 2;

function chunk<T>(arr: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeLetter(s: string): string {
  return s.trim().toLowerCase();
}

function normalizeWord(s: string): string {
  return s.trim().toLowerCase().replace(/ё/g, "е");
}

function GroupExercise({ group, onFinish }: { group: AlphabetLetter[]; onFinish: (correctRatio: number) => void }) {
  const { speak, supported: ttsSupported, speakingId } = useSpeech();
  const [round, setRound] = useState<Round>(1);
  const [queue, setQueue] = useState<AlphabetLetter[]>(() => shuffle(group));
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [attempts, setAttempts] = useState({ correct: 0, total: 0 });

  const current = queue[0];

  if (!current) {
    if (round === 1) {
      setRound(2);
      setQueue(shuffle(group));
      return null;
    }
    const ratio = attempts.total > 0 ? attempts.correct / attempts.total : 1;
    onFinish(ratio);
    return null;
  }

  const check = () => {
    if (feedback !== null) return;
    const isCorrect =
      round === 1
        ? normalizeLetter(input) === normalizeLetter(current.upper) || normalizeLetter(input) === normalizeLetter(current.lower)
        : normalizeWord(input) === normalizeWord(current.example.ru);
    setFeedback(isCorrect);
    setAttempts((a) => ({ correct: a.correct + (isCorrect ? 1 : 0), total: a.total + 1 }));
    window.setTimeout(() => {
      setQueue((q) => {
        const [first, ...rest] = q;
        if (isCorrect) return rest;
        const insertAt = Math.min(rest.length, 3);
        return [...rest.slice(0, insertAt), first, ...rest.slice(insertAt)];
      });
      setInput("");
      setFeedback(null);
    }, 1100);
  };

  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6">
      <p className="text-xs font-semibold text-fuchsia-700 mb-4">
        Manche {round}/2 · {round === 1 ? "Écris la lettre que tu entends" : "Écris le mot que tu entends"}
      </p>

      <div className="text-center mb-5">
        <button
          onClick={() => ttsSupported && speak(round === 1 ? current.upper : current.example.ru, `write-${current.upper}-${round}`, { rate: 0.7 })}
          className={`w-20 h-20 rounded-full bg-fuchsia-600 text-white text-3xl flex items-center justify-center mx-auto hover:bg-fuchsia-700 active:scale-95 transition shadow-lg shadow-fuchsia-200 ${
            speakingId === `write-${current.upper}-${round}` ? "animate-speaking" : ""
          }`}
          disabled={!ttsSupported}
        >
          🔊
        </button>
        {!ttsSupported && (
          <p className="text-xs text-gray-400 mt-2">
            {round === 1 ? `Indice : ${current.frenchSound}` : `Indice : ${current.example.fr}`}
          </p>
        )}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && check()}
        disabled={feedback !== null}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        autoFocus
        placeholder={round === 1 ? "Tape la lettre en cyrillique…" : "Tape le mot en cyrillique…"}
        className="w-full font-cyrillic text-xl text-center rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:bg-gray-50"
      />

      {feedback !== null && (
        <div
          className={`mt-3 rounded-lg px-4 py-2 text-sm font-medium text-center ${
            feedback ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {feedback ? (
            "Correct ! ✓"
          ) : (
            <>
              La bonne réponse était :{" "}
              <span className="font-cyrillic font-semibold">{round === 1 ? `${current.upper} ${current.lower}` : current.example.ru}</span>
            </>
          )}
        </div>
      )}

      {feedback === null && (
        <button
          onClick={check}
          disabled={!input.trim()}
          className="mt-4 w-full px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-95 transition disabled:opacity-40"
        >
          Vérifier
        </button>
      )}

      <p className="text-xs text-gray-400 text-center mt-4">{queue.length} lettre{queue.length > 1 ? "s" : ""} restante{queue.length > 1 ? "s" : ""} dans cette manche</p>
    </div>
  );
}

export function AlphabetWriting({ letters }: { letters: AlphabetLetter[] }) {
  const groups = chunk(letters, GROUP_SIZE);
  const addXp = useProgressStore((s) => s.addXp);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [groupsDone, setGroupsDone] = useState<Set<number>>(new Set());

  const finishGroup = (ratio: number) => {
    if (activeGroup === null) return;
    const alreadyDone = groupsDone.has(activeGroup);
    if (!alreadyDone) {
      addXp(Math.round(XP_VALUES.alphabetWriting * ratio) || 1, randomCheer());
    }
    const next = new Set(groupsDone);
    next.add(activeGroup);
    setGroupsDone(next);
    setActiveGroup(null);
    if (!alreadyDone && next.size === groups.length) {
      addXp(XP_VALUES.alphabetWritingComplete, "Tout l'alphabet écrit de mémoire ! 🎉");
    }
  };

  if (activeGroup !== null) {
    return (
      <div>
        <button onClick={() => setActiveGroup(null)} className="text-sm text-gray-400 hover:text-gray-600 mb-3">
          ← Retour aux groupes
        </button>
        <p className="text-xs font-semibold text-gray-500 mb-3">
          Groupe {activeGroup + 1}/{groups.length} · {groups[activeGroup].map((l) => l.upper).join(" ")}
        </p>
        <GroupExercise key={activeGroup} group={groups[activeGroup]} onFinish={finishGroup} />
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Pas de bouton à toucher ici : écoute le son ou le mot, puis <strong>tape-le toi-même</strong> avec le clavier cyrillique de ton téléphone.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {groups.map((group, i) => {
          const done = groupsDone.has(i);
          return (
            <button
              key={i}
              onClick={() => setActiveGroup(i)}
              className={`rounded-xl border-2 p-4 text-center transition ${
                done ? "border-green-300 bg-green-50" : "border-fuchsia-200 bg-white hover:border-fuchsia-400 hover:shadow-md"
              }`}
            >
              <p className="text-xs font-semibold text-gray-400 mb-1">
                Groupe {i + 1} {done ? "✅" : ""}
              </p>
              <p className="text-xl font-bold font-cyrillic text-gray-900">{group.map((l) => l.upper).join(" ")}</p>
            </button>
          );
        })}
      </div>

      {groupsDone.size === groups.length && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
          <Mascot mood="proud" size={64} className="mx-auto mb-2" />
          <p className="font-bold text-gray-900 font-heading">Bravo, tu as écrit tout l'alphabet toi-même ! 🎉</p>
        </div>
      )}
    </div>
  );
}
