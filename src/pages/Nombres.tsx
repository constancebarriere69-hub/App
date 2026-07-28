import { numbers, agreementRules } from "../data/numbers";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";

export function Nombres() {
  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Les nombres</h1>
          <p className="text-gray-500 text-sm">Compter de 0 à 100, et la règle d'accord qui rend les nombres russes redoutables.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-bold text-gray-900 mb-3">De 0 à 100</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {numbers.map((n) => (
            <div key={n.value} className="rounded-xl border border-gray-200 bg-white p-3 flex items-center gap-2">
              <SpeakButton text={n.ru} id={`num-${n.value}`} size="sm" />
              <div>
                <p className="text-xs text-gray-400">{n.value}</p>
                <p className="font-cyrillic font-semibold text-gray-900 text-sm">{n.ru}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading font-bold text-gray-900 mb-1">La règle d'accord</h2>
        <p className="text-sm text-gray-500 mb-4">
          En russe, le nom qui suit un nombre change de cas (et parfois de nombre grammatical) selon le dernier chiffre du nombre.
        </p>
        <div className="space-y-4">
          {agreementRules.map((rule) => (
            <div key={rule.id} className="rounded-2xl border border-pink-100 bg-white p-5">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-semibold text-gray-900">{rule.title}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 whitespace-nowrap">
                  {rule.range}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rule.explanation}</p>
              <div className="space-y-1.5">
                {rule.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-amber-50/60 rounded-lg px-3 py-2">
                    <SpeakButton text={ex.ru} id={`rule-${rule.id}-${i}`} size="sm" />
                    <span className="font-cyrillic font-medium text-gray-900">{ex.ru}</span>
                    <span className="text-gray-400">— {ex.fr}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
