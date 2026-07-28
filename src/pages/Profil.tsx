import { useEffect, useState } from "react";
import { useProfilesStore } from "../store/profiles";
import { palierColorClasses } from "../lib/palierColors";
import {
  AvatarBear,
  BEAR_FUR_COLORS,
  BEAR_ACCESSORIES,
  resolveFurColor,
  resolveAccessory,
  type BearFurColor,
  type BearAccessory,
} from "../components/AvatarBear";

const COLOR_CHOICES = ["rose", "orange", "amber", "emerald", "sky", "violet", "teal", "indigo"];
const ACCESSORY_LABELS: Record<BearAccessory, string> = {
  none: "Aucun",
  bow: "Nœud",
  flower: "Fleur",
  glasses: "Lunettes",
  star: "Étoile",
};

function BearPicker({
  furColor,
  accessory,
  bgColor,
  onChangeFur,
  onChangeAccessory,
  onChangeBg,
}: {
  furColor: BearFurColor;
  accessory: BearAccessory;
  bgColor: string;
  onChangeFur: (c: BearFurColor) => void;
  onChangeAccessory: (a: BearAccessory) => void;
  onChangeBg: (c: string) => void;
}) {
  return (
    <>
      <p className="text-xs text-gray-400 mb-1.5">Couleur de l'ours</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {BEAR_FUR_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChangeFur(c)}
            className={`rounded-full border-2 transition ${furColor === c ? "border-fuchsia-500" : "border-transparent"}`}
          >
            <AvatarBear furColor={c} accessory="none" size={40} />
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-1.5">Accessoire</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {BEAR_ACCESSORIES.map((a) => (
          <button
            key={a}
            onClick={() => onChangeAccessory(a)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              accessory === a ? "bg-fuchsia-600 text-white border-fuchsia-600" : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {ACCESSORY_LABELS[a]}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-1.5">Fond</p>
      <div className="flex flex-wrap gap-2">
        {COLOR_CHOICES.map((c) => {
          const colors = palierColorClasses[c] ?? palierColorClasses.rose;
          return (
            <button
              key={c}
              onClick={() => onChangeBg(c)}
              className={`w-8 h-8 rounded-full ${colors.bar} border-2 transition ${
                bgColor === c ? "border-gray-900 scale-110" : "border-transparent"
              }`}
            />
          );
        })}
      </div>
    </>
  );
}

function AvatarCircle({ avatar, accessory, color, size = 56 }: { avatar: string; accessory?: string; color: string; size?: number }) {
  const colors = palierColorClasses[color] ?? palierColorClasses.rose;
  const furColor = resolveFurColor(avatar);
  const bearAccessory = resolveAccessory(accessory);
  return (
    <div className={`rounded-full flex items-center justify-center ${colors.badge} shrink-0`} style={{ width: size, height: size }}>
      <AvatarBear furColor={furColor} accessory={bearAccessory} size={size * 0.8} />
    </div>
  );
}

function NewProfileForm({ onCancel }: { onCancel: () => void }) {
  const createProfile = useProfilesStore((s) => s.createProfile);
  const switchProfile = useProfilesStore((s) => s.switchProfile);
  const [name, setName] = useState("");
  const [furColor, setFurColor] = useState<BearFurColor>(BEAR_FUR_COLORS[0]);
  const [accessory, setAccessory] = useState<BearAccessory>("none");
  const [bgColor, setBgColor] = useState(COLOR_CHOICES[0]);

  const submit = () => {
    if (!name.trim()) return;
    const id = createProfile(name, furColor, bgColor, accessory);
    switchProfile(id);
    onCancel();
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-fuchsia-300 bg-fuchsia-50/40 p-5">
      <p className="font-heading font-bold text-gray-900 mb-3">Nouveau profil</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Prénom ou pseudo"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        autoFocus
      />
      <BearPicker
        furColor={furColor}
        accessory={accessory}
        bgColor={bgColor}
        onChangeFur={setFurColor}
        onChangeAccessory={setAccessory}
        onChangeBg={setBgColor}
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={submit}
          disabled={!name.trim()}
          className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition disabled:opacity-40"
        >
          Créer et basculer
        </button>
        <button onClick={onCancel} className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
          Annuler
        </button>
      </div>
    </div>
  );
}

export function Profil() {
  const profiles = useProfilesStore((s) => s.profiles);
  const activeProfileId = useProfilesStore((s) => s.activeProfileId);
  const renameProfile = useProfilesStore((s) => s.renameProfile);
  const updateAvatar = useProfilesStore((s) => s.updateAvatar);
  const switchProfile = useProfilesStore((s) => s.switchProfile);
  const deleteProfile = useProfilesStore((s) => s.deleteProfile);

  const active = profiles.find((p) => p.id === activeProfileId);
  const [nameDraft, setNameDraft] = useState(active?.name ?? "");

  useEffect(() => {
    if (active) setNameDraft(active.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id, active?.name]);

  const [showNewForm, setShowNewForm] = useState(false);

  if (!active) return null;

  const activeFurColor = resolveFurColor(active.avatar);
  const activeAccessory = resolveAccessory(active.accessory);

  const saveName = () => {
    if (nameDraft.trim() && nameDraft.trim() !== active.name) renameProfile(active.id, nameDraft);
  };

  const doSwitch = (id: string) => {
    if (id === active.id) return;
    switchProfile(id);
  };

  const doDelete = () => {
    if (profiles.length <= 1) return;
    if (!window.confirm(`Supprimer le profil « ${active.name} » et toute sa progression ? Cette action est irréversible.`)) return;
    deleteProfile(active.id);
  };

  return (
    <div>
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Ton profil</h1>
        <p className="text-gray-500 text-sm">Chaque profil garde sa propre progression, ses badges et son niveau — utile si vous êtes plusieurs sur cet appareil.</p>
      </section>

      <div className="rounded-2xl border border-pink-100 bg-white p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <AvatarCircle avatar={active.avatar} accessory={active.accessory} color={active.color} size={64} />
          <input
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
            className="flex-1 text-xl font-bold font-heading text-gray-900 rounded-lg border border-transparent hover:border-gray-200 focus:border-fuchsia-300 px-2 py-1 -ml-2 focus:outline-none"
          />
        </div>
        <BearPicker
          furColor={activeFurColor}
          accessory={activeAccessory}
          bgColor={active.color}
          onChangeFur={(c) => updateAvatar(active.id, c, active.color, active.accessory)}
          onChangeAccessory={(a) => updateAvatar(active.id, active.avatar, active.color, a)}
          onChangeBg={(c) => updateAvatar(active.id, active.avatar, c, active.accessory)}
        />
      </div>

      <section className="mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Profils sur cet appareil</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => doSwitch(p.id)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                p.id === active.id ? "border-fuchsia-400 bg-fuchsia-50/50" : "border-gray-200 bg-white hover:border-fuchsia-300"
              }`}
            >
              <AvatarCircle avatar={p.avatar} accessory={p.accessory} color={p.color} size={44} />
              <div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-400">{p.id === active.id ? "Profil actif ✓" : "Toucher pour basculer"}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {showNewForm ? (
        <NewProfileForm onCancel={() => setShowNewForm(false)} />
      ) : (
        <button
          onClick={() => setShowNewForm(true)}
          className="w-full rounded-2xl border-2 border-dashed border-gray-200 p-4 text-center text-gray-500 hover:border-fuchsia-300 hover:text-fuchsia-600 transition mb-6"
        >
          + Ajouter un profil
        </button>
      )}

      {profiles.length > 1 && (
        <button
          onClick={doDelete}
          className="mt-6 text-sm text-red-500 hover:text-red-700 underline underline-offset-2"
        >
          Supprimer le profil « {active.name} »
        </button>
      )}
    </div>
  );
}
