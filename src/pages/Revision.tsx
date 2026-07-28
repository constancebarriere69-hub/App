import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { paliers } from "../data/paliers";
import { useProgressStore } from "../store/progress";
import { useSrsStore, type SrsCard } from "../store/srs";
import { Mascot } from "../components/Mascot";
import { SpeakButton } from "../components/SpeakButton";
import { XP_VALUES, randomCheer } from "../lib/xp";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const BOX_LABELS = ["", "Nouveau", "En cours", "Connu", "Bien ancré", "Maîtrisé"];

export function Revision() {
  const progress = useProgressStore((s) => s.progress);
  const addXp = useProgressStore((s) => s.addXp);
  const ensureCards = useSrsStore((s) => s.ensureCards);
  const reviewCard = useSrsStore((s) => s.reviewCard);
  const cards = useSrsStore((s) => s.cards);

  useEffect(() => {
    const items = paliers
      .filter((p) => progress[p.id]?.vocabulary)
      .flatMap((p) => p.vocabulary.map((v) => ({ ...v, palierId: p.id })));
    if (items.length > 0) ensureCards(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const allCards = useMemo(() => Object.values(cards), [cards]);
  const today = new Date().toISOString().slice(0, 10);
  const dueCards = useMemo(() => allCards.filter((c) => c.nextReview <= today), [allCards, today]);

  const [session, setSession] = useState<SrsCard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const start = () => {
    setSession(shuffle(dueCards));
    setIndex(0);
    setFlipped(false);
    setCorrectCount(0);
    setFinished(false);
  };

  const rate = (remembered: boolean) => {
    if (!session) return;
    reviewCard(session[index].key, remembered);
    if (remembered) setCorrectCount((c) => c + 1);
    if (index + 1 >= session.length) {
      setFinished(true);
      const xp = Math.round(XP_VALUES.srsReview * (correctCount + (remembered ? 1 : 0)));
      if (xp > 0) addXp(xp, randomCheer());
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  if (allCards.length === 0) {
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
        <Mascot mood="happy" size={80} className="mx-auto mb-3" />
        <p className="text-lg font-bold text-gray-900 font-heading">Pas encore de vocabulaire à réviser</p>
        <p className="text-sm text-gray-500 mt-1">
          Termine la leçon de vocabulaire d'un palier pour que ses mots apparaissent ici.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (session && finished) {
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
        <Mascot mood={correctCount >= session.length * 0.7 ? "proud" : "happy"} size={80} className="mx-auto mb-3" />
        <p className="text-lg font-bold text-gray-900 font-heading">Révision terminée !</p>
        <p className="text-sm text-gray-500 mb-4">
          {correctCount} / {session.length} mots retrouvés
        </p>
        <div className="flex justify-center gap-2">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:border-fuchsia-300 transition"
          >
            Accueil
          </Link>
          <button
            onClick={() => setSession(null)}
            className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition"
          >
            Retour à la révision
          </button>
        </div>
      </div>
    );
  }

  if (session) {
    const card = session[index];
    return (
      <div>
        <p className="text-xs text-gray-400 mb-3">
          Carte {index + 1} / {session.length}
        </p>
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full rounded-2xl border border-pink-100 bg-white p-10 text-center hover:shadow-md transition min-h-56 flex flex-col items-center justify-center"
        >
          {!flipped ? (
            <>
              <p className="font-cyrillic text-4xl font-bold text-gray-900 mb-2">{card.ru}</p>
              <p className="text-sm text-gray-400">{card.transcription}</p>
              <p className="text-xs text-gray-300 mt-4">Touche pour voir la traduction</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold text-gray-900 mb-2">{card.fr}</p>
              <p className="font-cyrillic text-lg text-gray-400">{card.ru}</p>
            </>
          )}
        </button>
        <div className="flex justify-center mt-3">
          <SpeakButton text={card.ru} id={`srs-${card.key}`} size="md" />
        </div>

        {flipped && (
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => rate(false)}
              className="flex-1 py-3 rounded-full bg-amber-100 text-amber-700 font-semibold hover:bg-amber-200 active:scale-95 transition"
            >
              🤔 À revoir
            </button>
            <button
              onClick={() => rate(true)}
              className="flex-1 py-3 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 active:scale-95 transition"
            >
              😎 Je savais
            </button>
          </div>
        )}
      </div>
    );
  }

  const boxCounts = [1, 2, 3, 4, 5].map((box) => allCards.filter((c) => c.box === box).length);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood={dueCards.length > 0 ? "excited" : "happy"} size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Réviser le vocabulaire</h1>
          <p className="text-gray-500 text-sm">
            Répétition espacée : les mots reviennent juste avant que tu ne les oublies.
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-400 text-white p-6 mb-6 text-center">
        <p className="text-4xl font-bold font-heading">{dueCards.length}</p>
        <p className="text-sm text-white/90 mb-4">{dueCards.length > 1 ? "mots à réviser aujourd'hui" : "mot à réviser aujourd'hui"}</p>
        <button
          onClick={start}
          disabled={dueCards.length === 0}
          className="px-6 py-3 rounded-full bg-white text-fuchsia-700 font-bold hover:opacity-90 active:scale-95 transition disabled:opacity-50"
        >
          {dueCards.length === 0 ? "Rien à réviser, bravo !" : "Commencer la révision ⚡"}
        </button>
      </section>

      <section className="rounded-2xl border border-pink-100 bg-white p-5">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Ta collection</h2>
        <p className="text-sm text-gray-500 mb-4">{allCards.length} mots suivis au total, répartis en 5 niveaux de mémorisation.</p>
        <div className="space-y-2">
          {boxCounts.map((count, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-24 shrink-0">{BOX_LABELS[i + 1]}</span>
              <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400"
                  style={{ width: `${allCards.length ? (count / allCards.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
