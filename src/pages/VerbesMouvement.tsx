import { motionVerbs } from "../data/motionVerbs";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";

export function VerbesMouvement() {
  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Verbes de mouvement</h1>
          <p className="text-gray-500 text-sm">Un deuxième système à part entière : chaque déplacement a deux verbes différents.</p>
        </div>
      </section>

      <section className="mb-8 space-y-3">
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <h3 className="font-semibold text-sky-900 mb-1">➡️ Unidirectionnel</h3>
          <p className="text-sm text-sky-800">
            Un trajet <strong>précis</strong>, dans <strong>une seule direction</strong>, souvent en cours au moment où l'on parle.
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
          <h3 className="font-semibold text-violet-900 mb-1">🔄 Multidirectionnel</h3>
          <p className="text-sm text-violet-800">
            Un déplacement <strong>habituel</strong>, <strong>répété</strong>, en <strong>aller-retour</strong>, ou une
            <strong> capacité générale</strong> (savoir nager, savoir courir).
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-semibold text-amber-900 mb-1">💡 Et avec un préfixe ?</h3>
          <p className="text-sm text-amber-800">
            En ajoutant un préfixe (при-, у-, вы-, пере-...) à la forme unidirectionnelle, on obtient un verbe perfectif précis :
            прийти (arriver à pied), уехать (partir en véhicule), войти (entrer). C'est une étape suivante, une fois ce tableau maîtrisé.
          </p>
        </div>
      </section>

      <div className="space-y-4">
        {motionVerbs.map((pair) => {
          const colors = palierColorClasses["indigo"] ?? palierColorClasses.rose;
          return (
            <div key={pair.id} className="rounded-2xl border border-pink-100 bg-white p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-500">{pair.meaning}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} whitespace-nowrap`}>{pair.level}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                <div className="rounded-xl bg-sky-50/60 p-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">unidirectionnel</span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <SpeakButton text={pair.unidirectional} id={`mv-uni-${pair.id}`} size="sm" />
                    <span className="font-cyrillic font-bold text-gray-900">{pair.unidirectional}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{pair.unidirectionalFr}</p>
                </div>
                <div className="rounded-xl bg-violet-50/60 p-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">multidirectionnel</span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <SpeakButton text={pair.multidirectional} id={`mv-multi-${pair.id}`} size="sm" />
                    <span className="font-cyrillic font-bold text-gray-900">{pair.multidirectional}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{pair.multidirectionalFr}</p>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-start gap-2 text-sm bg-sky-50/40 rounded-lg px-3 py-2">
                  <SpeakButton text={pair.exampleUnidirectional.ru} id={`mv-ex-uni-${pair.id}`} size="sm" />
                  <div>
                    <p className="font-cyrillic text-gray-900">{pair.exampleUnidirectional.ru}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pair.exampleUnidirectional.fr}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm bg-violet-50/40 rounded-lg px-3 py-2">
                  <SpeakButton text={pair.exampleMultidirectional.ru} id={`mv-ex-multi-${pair.id}`} size="sm" />
                  <div>
                    <p className="font-cyrillic text-gray-900">{pair.exampleMultidirectional.ru}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pair.exampleMultidirectional.fr}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
