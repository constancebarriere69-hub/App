import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getDialogueById } from "../data/dialogues";
import { useSpeech } from "../hooks/useSpeech";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { evaluateDialogueResponse, type DialogueMatchResult } from "../lib/dialogueMatch";
import { useProgressStore } from "../store/progress";
import { XP_VALUES, randomCheer } from "../lib/xp";
import { Mascot, type MascotMood } from "../components/Mascot";

type Phase = "intro" | "npc" | "ready" | "listening" | "feedback" | "done";

interface HistoryEntry {
  speaker: "npc" | "user";
  ru: string;
  fr?: string;
  success?: boolean;
}

export function DialogueSessionPage() {
  const { id } = useParams<{ id: string }>();
  const scenario = id ? getDialogueById(id) : undefined;

  const { speak, speakingId, supported: ttsSupported } = useSpeech();
  const { supported: sttSupported, listening: sttListening, listen, error: sttError } = useSpeechRecognition();
  const markDialogueDone = useProgressStore((s) => s.markDialogueDone);
  const addXp = useProgressStore((s) => s.addXp);

  const [phase, setPhase] = useState<Phase>("intro");
  const [turnIndex, setTurnIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [result, setResult] = useState<DialogueMatchResult | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [turnSuccess, setTurnSuccess] = useState<boolean[]>([]);
  const [noSpeechNotice, setNoSpeechNotice] = useState(false);
  const gotResultRef = useRef(false);

  useEffect(() => {
    if (!scenario) return;
    setTurnSuccess(Array(scenario.turns.length).fill(false));
  }, [scenario]);

  useEffect(() => {
    if (phase !== "npc" || !scenario) return;
    const turn = scenario.turns[turnIndex];
    if (!turn) {
      setPhase("done");
      return;
    }
    setHistory((h) => [...h, { speaker: "npc", ru: turn.npc.ru, fr: turn.npc.fr }]);
    if (ttsSupported) {
      speak(turn.npc.ru, `dlg-npc-${turnIndex}`, { onEnd: () => setPhase((p) => (p === "npc" ? "ready" : p)) });
    } else {
      setPhase("ready");
    }
    // Filet de sécurité : si la synthèse vocale ne déclenche jamais sa fin
    // (bug navigateur, voix indisponible…), on ne bloque pas l'apprenant.
    const safety = setTimeout(() => {
      setPhase((p) => (p === "npc" ? "ready" : p));
    }, 6000);
    return () => clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turnIndex, scenario]);

  // Si la reconnaissance vocale s'arrête sans avoir produit de résultat
  // (silence, bruit, timeout navigateur), on débloque l'apprenant au lieu
  // de le laisser bloqué sur "Je t'écoute…".
  useEffect(() => {
    if (!sttListening && phase === "listening" && !gotResultRef.current) {
      setPhase("ready");
      setNoSpeechNotice(true);
    }
  }, [sttListening, phase]);

  if (!scenario) return <Navigate to="/dialogue" replace />;

  const turn = scenario.turns[turnIndex];

  const start = () => {
    setPhase("npc");
  };

  const recordResult = (res: DialogueMatchResult, transcript?: string) => {
    gotResultRef.current = true;
    setResult(res);
    setTurnSuccess((s) => {
      const copy = [...s];
      copy[turnIndex] = res.success;
      return copy;
    });
    setHistory((h) => [
      ...h,
      { speaker: "user", ru: transcript ?? "(réponse à voix haute)", success: res.success },
    ]);
    setPhase("feedback");
    if (res.success) addXp(XP_VALUES.dialogueTurn, randomCheer());
    speak(turn.modelAnswer.ru, `dlg-model-${turnIndex}`);
  };

  const handleMicClick = () => {
    gotResultRef.current = false;
    setNoSpeechNotice(false);
    setPhase("listening");
    listen((transcript) => {
      const res = evaluateDialogueResponse(transcript, turn);
      recordResult(res, transcript);
    });
  };

  const handleSelfReport = (success: boolean) => {
    recordResult({ success, score: success ? 100 : 30 });
  };

  const retry = () => {
    setNoSpeechNotice(false);
    setPhase("ready");
  };

  const next = () => {
    if (turnIndex + 1 >= scenario.turns.length) {
      const successCount = turnSuccess.filter(Boolean).length;
      const score = Math.round((successCount / scenario.turns.length) * 100);
      markDialogueDone(scenario.id, Math.round((XP_VALUES.dialogueScenario * score) / 100), randomCheer());
      setPhase("done");
      return;
    }
    setNoSpeechNotice(false);
    setTurnIndex((i) => i + 1);
    setPhase("npc");
  };

  const restart = () => {
    setTurnIndex(0);
    setHistory([]);
    setResult(null);
    setNoSpeechNotice(false);
    setTurnSuccess(Array(scenario.turns.length).fill(false));
    setPhase("intro");
  };

  const mascotMood: MascotMood =
    phase === "listening"
      ? "listening"
      : phase === "npc" || speakingId?.startsWith("dlg-")
      ? "excited"
      : phase === "feedback"
      ? result?.success
        ? "proud"
        : "thinking"
      : "happy";

  return (
    <div>
      <Link to="/dialogue" className="text-sm text-gray-400 hover:text-gray-600">
        ← Retour aux dialogues
      </Link>

      <div className="mt-3 mb-6 flex items-start gap-3">
        <Mascot mood={mascotMood} size={56} />
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700">
            {scenario.level} · avec {scenario.npcName}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2 font-heading">
            {scenario.icon} {scenario.title}
          </h1>
          <p className="text-gray-500 text-sm">{scenario.description}</p>
        </div>
      </div>

      {phase === "intro" && (
        <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
          <Mascot mood="excited" size={72} className="mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-4">
            {scenario.npcName} va te parler en russe à voix haute. Écoute bien, puis réponds avec ton micro —
            tu peux aussi t'aider de l'indice affiché à chaque tour.
          </p>
          <button
            onClick={start}
            className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
          >
            🎙️ Commencer la conversation
          </button>
        </div>
      )}

      {phase !== "intro" && phase !== "done" && (
        <>
          <p className="text-xs text-gray-400 mb-2">
            Tour {turnIndex + 1} / {scenario.turns.length}
          </p>

          <div className="rounded-2xl border border-pink-100 bg-white p-4 mb-4 space-y-2 max-h-72 overflow-y-auto">
            {history.map((entry, i) => {
              const isNpc = entry.speaker === "npc";
              return (
                <div key={i} className={`flex ${isNpc ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      isNpc
                        ? "bg-gray-100 text-gray-800"
                        : entry.success
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-fuchsia-100 text-fuchsia-900"
                    }`}
                  >
                    <p className="text-[10px] font-semibold opacity-60">{isNpc ? scenario.npcName : "Toi"}</p>
                    <p className="font-cyrillic">{entry.ru}</p>
                    {showTranslation && entry.fr && <p className="text-xs opacity-60 mt-0.5">{entry.fr}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-fuchsia-300 mb-4"
          >
            {showTranslation ? "Masquer trad." : "Voir trad."}
          </button>

          {phase === "ready" && (
            <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50/50 p-5 text-center">
              <p className="text-xs text-fuchsia-700 font-semibold mb-3">💡 {turn.hint}</p>
              {noSpeechNotice && (
                <p className="text-xs text-amber-600 mb-2">Je n'ai rien entendu — réessaie en parlant juste après avoir appuyé.</p>
              )}
              {sttSupported ? (
                <button
                  onClick={handleMicClick}
                  className="w-20 h-20 rounded-full bg-fuchsia-600 text-white text-3xl flex items-center justify-center mx-auto hover:bg-fuchsia-700 active:scale-95 transition shadow-lg shadow-fuchsia-200"
                >
                  🎤
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    Répète la phrase à voix haute, puis dis-nous comment ça s'est passé :
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleSelfReport(true)}
                      className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 active:scale-95 transition"
                    >
                      J'ai réussi ✓
                    </button>
                    <button
                      onClick={() => handleSelfReport(false)}
                      className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-300 active:scale-95 transition"
                    >
                      À retravailler
                    </button>
                  </div>
                </div>
              )}
              {sttError && (
                <p className="text-xs text-rose-500 mt-2">Micro non accessible : autorise l'accès et réessaie.</p>
              )}
            </div>
          )}

          {phase === "listening" && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-rose-500 text-white text-3xl flex items-center justify-center mx-auto animate-speaking">
                🎙️
              </div>
              <p className="text-sm text-rose-600 font-semibold mt-3">Je t'écoute… parle maintenant !</p>
            </div>
          )}

          {phase === "feedback" && result && (
            <div
              className={`rounded-2xl border p-5 text-center ${
                result.success ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
              }`}
            >
              <p className={`font-bold ${result.success ? "text-emerald-700" : "text-amber-700"}`}>
                {result.success ? "Отлично ! Très bien !" : "Continue à t'entraîner !"}
              </p>
              <div className="mt-3 bg-white rounded-xl p-3 text-left">
                <p className="text-xs text-gray-400 mb-1">Réponse modèle :</p>
                <p className="font-cyrillic text-lg text-gray-900">{turn.modelAnswer.ru}</p>
                <p className="text-xs text-gray-400">{turn.modelAnswer.fr}</p>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={retry}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-semibold hover:border-fuchsia-300 active:scale-95 transition"
                >
                  🔁 Réessayer
                </button>
                <button
                  onClick={next}
                  className="px-5 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
                >
                  {turnIndex + 1 >= scenario.turns.length ? "Voir mon score →" : "Continuer →"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {phase === "done" && (
        <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
          <Mascot mood="proud" size={80} className="mx-auto mb-3" />
          <p className="text-lg font-bold text-gray-900 font-heading">Scène terminée !</p>
          <p className="text-sm text-gray-500 mb-4">
            {turnSuccess.filter(Boolean).length} / {scenario.turns.length} réponses réussies
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {turnSuccess.map((ok, i) => (
              <span key={i} className={`text-2xl ${ok ? "" : "opacity-30 grayscale"}`}>
                ⭐
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={restart}
              className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:border-fuchsia-300 active:scale-95 transition"
            >
              Recommencer
            </button>
            <Link
              to="/dialogue"
              className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
            >
              Autres scènes →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
