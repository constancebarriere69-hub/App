import { Link } from "react-router-dom";
import { dialogues } from "../data/dialogues";
import { useProgressStore } from "../store/progress";
import { palierColorClasses } from "../lib/palierColors";
import { Mascot } from "../components/Mascot";

const LEVEL_COLOR: Record<string, string> = {
  A1: "rose",
  A2: "sky",
  B1: "indigo",
  B2: "purple",
  C1: "green",
};

export function DialoguePage() {
  const dialoguesDone = useProgressStore((s) => s.dialoguesDone);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="listening" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Dialogue vocal avec Миша</h1>
          <p className="text-gray-500 text-sm">
            Parle à voix haute en russe : Миша (ou un personnage) te répond vraiment ! Choisis une scène pour t'entraîner.
          </p>
        </div>
      </section>

      <div className="rounded-2xl bg-white border border-pink-100 p-3 mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {dialoguesDone.length} / {dialogues.length} scènes terminées
        </p>
        <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400"
            style={{ width: `${dialogues.length ? (dialoguesDone.length / dialogues.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-6 text-xs text-amber-700">
        🎤 Utilise Chrome sur ordinateur ou Android pour parler au micro. Sur Safari/iPhone, tu peux quand même suivre le
        dialogue et t'entraîner à voix haute, en auto-évaluant ta réponse.
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {dialogues.map((scenario) => {
          const colors = palierColorClasses[LEVEL_COLOR[scenario.level] ?? "rose"];
          const isDone = dialoguesDone.includes(scenario.id);
          return (
            <Link
              key={scenario.id}
              to={`/dialogue/${scenario.id}`}
              className="rounded-2xl border border-pink-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition relative"
            >
              {isDone && (
                <span className="absolute top-3 right-3 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                  Terminé ✓
                </span>
              )}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{scenario.icon}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                  {scenario.level}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900">{scenario.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{scenario.description}</p>
              <p className="text-xs text-gray-400">Avec {scenario.npcName} · {scenario.turns.length} échanges</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
