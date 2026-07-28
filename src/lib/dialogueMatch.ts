import type { DialogueTurn } from "../types/content";
import { normalize, similarityScore } from "./similarity";

export interface DialogueMatchResult {
  success: boolean;
  score: number;
  matchedKeyword?: string;
}

// Évalue une réponse parlée librement contre un tour de dialogue : succès
// immédiat si un mot-clé attendu apparaît dans ce qui a été reconnu,
// sinon on retombe sur une similarité globale avec la réponse modèle
// (le micro/la reconnaissance vocale n'étant jamais parfaits).
export function evaluateDialogueResponse(spoken: string, turn: DialogueTurn): DialogueMatchResult {
  const spokenNorm = normalize(spoken);

  for (const keyword of turn.keywords) {
    if (spokenNorm.includes(normalize(keyword))) {
      return { success: true, score: 100, matchedKeyword: keyword };
    }
  }

  const score = similarityScore(turn.modelAnswer.ru, spoken);
  return { success: score >= 40, score };
}
