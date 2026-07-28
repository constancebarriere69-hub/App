import { Component, type ReactNode } from "react";
import { Mascot } from "./Mascot";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: { componentStack?: string | null }) {
    console.error("Erreur non gérée :", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6 bg-pink-50">
          <Mascot mood="sleepy" size={80} />
          <h1 className="text-xl font-bold text-gray-900 font-heading">Oups, quelque chose s'est mal passé</h1>
          <p className="text-sm text-gray-500 max-w-xs">
            Un petit pépin technique est survenu. Tes données restent sauvegardées — essaie de recharger la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
          >
            Recharger l'application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
