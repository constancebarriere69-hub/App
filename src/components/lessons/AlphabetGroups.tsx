import { useState } from "react";
import type { AlphabetLetter } from "../../types/content";
import { useProgressStore } from "../../store/progress";
import { XP_VALUES, randomCheer } from "../../lib/xp";
import { Mascot } from "../Mascot";
import { AlphabetExpress } from "./AlphabetExpress";

const GROUP_SIZE = 5;

function chunk<T>(arr: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    groups.push(arr.slice(i, i + size));
  }
  return groups;
}

export function AlphabetGroups({
  letters,
  palierId,
  onAllDone,
}: {
  letters: AlphabetLetter[];
  palierId: string;
  onAllDone: () => void;
}) {
  const groups = chunk(letters, GROUP_SIZE);
  const lp = useProgressStore((s) => s.getLessonProgress(palierId));
  const markAlphabetGroupDone = useProgressStore((s) => s.markAlphabetGroupDone);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const groupsDone = lp.alphabetGroupsDone ?? [];

  if (activeGroup !== null) {
    const group = groups[activeGroup];
    return (
      <div>
        <button
          onClick={() => setActiveGroup(null)}
          className="text-sm text-gray-400 hover:text-gray-600 mb-3"
        >
          ← Retour aux groupes
        </button>
        <p className="text-xs font-semibold text-fuchsia-700 mb-3">
          Groupe {activeGroup + 1}/{groups.length} · {group.map((l) => l.upper).join(" ")}
        </p>
        <AlphabetExpress
          letters={group}
          allLetters={letters}
          onDone={() => {
            const alreadyDone = groupsDone.includes(activeGroup);
            markAlphabetGroupDone(palierId, activeGroup, XP_VALUES.alphabetGroup, randomCheer());
            const willBeComplete = alreadyDone
              ? groupsDone.length === groups.length
              : groupsDone.length + 1 === groups.length;
            setActiveGroup(null);
            if (willBeComplete && !lp.alphabet) {
              onAllDone();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Apprends l'alphabet petit groupe par petit groupe, à ton rythme.</p>
        <p className="text-xs text-gray-400 shrink-0 ml-2">
          {groupsDone.length}/{groups.length}
        </p>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400 transition-all duration-300"
          style={{ width: `${(groupsDone.length / groups.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {groups.map((group, i) => {
          const done = groupsDone.includes(i);
          const locked = i > 0 && !groupsDone.includes(i - 1) && !done;
          return (
            <button
              key={i}
              disabled={locked}
              onClick={() => setActiveGroup(i)}
              className={`rounded-xl border-2 p-4 text-center transition ${
                done
                  ? "border-green-300 bg-green-50"
                  : locked
                  ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                  : "border-fuchsia-200 bg-white hover:border-fuchsia-400 hover:shadow-md"
              }`}
            >
              <p className="text-xs font-semibold text-gray-400 mb-1">
                Groupe {i + 1} {done ? "✅" : locked ? "🔒" : ""}
              </p>
              <p className="text-xl font-bold font-cyrillic text-gray-900">{group.map((l) => l.upper).join(" ")}</p>
            </button>
          );
        })}
      </div>

      {groupsDone.length === groups.length && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
          <Mascot mood="proud" size={64} className="mx-auto mb-2" />
          <p className="font-bold text-gray-900 font-heading">Alphabet complet maîtrisé ! 🎉</p>
          <p className="text-sm text-gray-500">Tu peux revenir réviser un groupe à tout moment.</p>
        </div>
      )}
    </div>
  );
}
