import { useCallback, useEffect, useRef, useState } from "react";

// Petit hook autour de la Web Speech API pour prononcer du texte russe
// (utilisé pour les lettres, le vocabulaire, les phrases et les podcasts).
export function useSpeech() {
  const [supported, setSupported] = useState(true);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang?.toLowerCase().startsWith("ru")) ?? null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
    };
  }, []);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supported]);

  const speak = useCallback(
    (text: string, id: string, opts?: { rate?: number; onEnd?: () => void }) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.rate = opts?.rate ?? 0.9;
      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => {
        setSpeakingId((current) => (current === id ? null : current));
        opts?.onEnd?.();
      };
      utterance.onerror = () => {
        setSpeakingId((current) => (current === id ? null : current));
      };
      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  // Joue une liste de répliques les unes après les autres (podcast).
  const speakSequence = useCallback(
    (items: { id: string; text: string }[], onItemStart?: (id: string) => void, onDone?: () => void) => {
      if (!supported || items.length === 0) return;
      window.speechSynthesis.cancel();

      const playAt = (index: number) => {
        if (index >= items.length) {
          setSpeakingId(null);
          onDone?.();
          return;
        }
        const item = items[index];
        const utterance = new SpeechSynthesisUtterance(item.text);
        utterance.lang = "ru-RU";
        if (voiceRef.current) utterance.voice = voiceRef.current;
        utterance.rate = 0.9;
        utterance.onstart = () => {
          setSpeakingId(item.id);
          onItemStart?.(item.id);
        };
        utterance.onend = () => playAt(index + 1);
        utterance.onerror = () => playAt(index + 1);
        window.speechSynthesis.speak(utterance);
      };

      playAt(0);
    },
    [supported]
  );

  return { supported, speak, speakSequence, cancel, speakingId };
}
