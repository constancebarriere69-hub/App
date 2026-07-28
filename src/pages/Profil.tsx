import { useEffect, useRef, useState } from "react";
import { useProfilesStore } from "../store/profiles";
import { palierColorClasses } from "../lib/palierColors";
import { exportBackup, importBackup } from "../lib/backup";
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
  const setPassword = useProfilesStore((s) => s.setPassword);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswordDraft] = useState("");
  const [furColor, setFurColor] = useState<BearFurColor>(BEAR_FUR_COLORS[0]);
  const [accessory, setAccessory] = useState<BearAccessory>("none");
  const [bgColor, setBgColor] = useState(COLOR_CHOICES[0]);

  const submit = async () => {
    if (!name.trim()) return;
    const id = createProfile(name, furColor, bgColor, accessory, email);
    if (password.trim()) await setPassword(id, password.trim());
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
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Adresse mail (facultatif)"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPasswordDraft(e.target.value)}
        placeholder="Mot de passe (facultatif)"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
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
          onClick={() => void submit()}
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

function PasswordPrompt({
  name,
  wrong,
  onSubmit,
  onCancel,
}: {
  name: string;
  wrong: boolean;
  onSubmit: (password: string) => void;
  onCancel: () => void;
}) {
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" onClick={onCancel}>
      <div className="w-full max-w-xs rounded-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <p className="font-heading font-bold text-gray-900 mb-1">🔒 Profil verrouillé</p>
        <p className="text-sm text-gray-500 mb-3">Entre le mot de passe de « {name} » pour y accéder.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(password)}
          placeholder="Mot de passe"
          autoFocus
          className={`w-full rounded-xl border px-4 py-2.5 mb-2 focus:outline-none focus:ring-2 ${
            wrong ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-fuchsia-400"
          }`}
        />
        {wrong && <p className="text-xs text-red-500 mb-2">Mot de passe incorrect.</p>}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onSubmit(password)}
            className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
          >
            Déverrouiller
          </button>
          <button onClick={onCancel} className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300">
            Annuler
          </button>
        </div>
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
  const reloadFromStorage = useProfilesStore((s) => s.reloadFromStorage);
  const setEmail = useProfilesStore((s) => s.setEmail);
  const setPassword = useProfilesStore((s) => s.setPassword);
  const clearPassword = useProfilesStore((s) => s.clearPassword);
  const checkPassword = useProfilesStore((s) => s.checkPassword);

  const active = profiles.find((p) => p.id === activeProfileId);
  const [nameDraft, setNameDraft] = useState(active?.name ?? "");
  const [emailDraft, setEmailDraft] = useState(active?.email ?? "");

  useEffect(() => {
    if (active) {
      setNameDraft(active.name);
      setEmailDraft(active.email ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id, active?.name, active?.email]);

  const [showNewForm, setShowNewForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [pendingSwitchId, setPendingSwitchId] = useState<string | null>(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!active) return null;

  const doImport = async (file: File) => {
    if (!window.confirm("Restaurer cette sauvegarde remplacera tous les profils et toute la progression sur cet appareil. Continuer ?")) return;
    try {
      await importBackup(file);
      reloadFromStorage();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Impossible de restaurer cette sauvegarde.");
    }
  };

  const activeFurColor = resolveFurColor(active.avatar);
  const activeAccessory = resolveAccessory(active.accessory);

  const saveName = () => {
    if (nameDraft.trim() && nameDraft.trim() !== active.name) renameProfile(active.id, nameDraft);
  };

  const saveEmail = () => {
    if (emailDraft.trim() !== (active.email ?? "")) setEmail(active.id, emailDraft);
  };

  const doSwitch = (id: string) => {
    if (id === active.id) return;
    const target = profiles.find((p) => p.id === id);
    if (target?.passwordHash) {
      setWrongPassword(false);
      setPendingSwitchId(id);
      return;
    }
    switchProfile(id);
  };

  const confirmSwitchWithPassword = async (password: string) => {
    if (!pendingSwitchId) return;
    const ok = await checkPassword(pendingSwitchId, password);
    if (ok) {
      switchProfile(pendingSwitchId);
      setPendingSwitchId(null);
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
    }
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

        <p className="text-xs text-gray-400 mb-1.5">Adresse mail</p>
        <input
          type="email"
          value={emailDraft}
          onChange={(e) => setEmailDraft(e.target.value)}
          onBlur={saveEmail}
          onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
          placeholder="ton.adresse@exemple.com"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />

        <BearPicker
          furColor={activeFurColor}
          accessory={activeAccessory}
          bgColor={active.color}
          onChangeFur={(c) => updateAvatar(active.id, c, active.color, active.accessory)}
          onChangeAccessory={(a) => updateAvatar(active.id, active.avatar, active.color, a)}
          onChangeBg={(c) => updateAvatar(active.id, active.avatar, c, active.accessory)}
        />
      </div>

      <section className="rounded-2xl border border-pink-100 bg-white p-5 mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-1">🔒 Mot de passe</h2>
        <p className="text-xs text-gray-500 mb-3">
          Un simple verrou local pour éviter qu'on bascule sur ce profil par erreur — pas un vrai compte sécurisé, tout reste sur cet appareil.
        </p>
        {active.passwordHash ? (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Verrou actif</span>
            <button
              onClick={() => clearPassword(active.id)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
            >
              Retirer le mot de passe
            </button>
          </div>
        ) : showPasswordForm ? (
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
            <button
              onClick={async () => {
                if (!newPassword.trim()) return;
                await setPassword(active.id, newPassword.trim());
                setNewPassword("");
                setShowPasswordForm(false);
              }}
              className="text-xs px-3 py-2 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700"
            >
              Valider
            </button>
            <button
              onClick={() => setShowPasswordForm(false)}
              className="text-xs px-3 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-gray-300"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-fuchsia-300"
          >
            Définir un mot de passe
          </button>
        )}
      </section>

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
                <p className="font-semibold text-gray-900 flex items-center gap-1">
                  {p.name} {p.passwordHash && <span title="Verrouillé">🔒</span>}
                </p>
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

      <section className="rounded-2xl border border-pink-100 bg-white p-5 mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-1">Sauvegarde</h2>
        <p className="text-xs text-gray-500 mb-3">
          Toute la progression est stockée uniquement sur cet appareil. Exporte un fichier de sauvegarde pour ne rien perdre si tu changes de téléphone ou vides le cache du navigateur.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportBackup}
            className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-95 transition"
          >
            ⬇️ Exporter mes données
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-semibold hover:border-fuchsia-300 active:scale-95 transition"
          >
            ⬆️ Restaurer une sauvegarde
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void doImport(file);
              e.target.value = "";
            }}
          />
        </div>
      </section>

      {profiles.length > 1 && (
        <button
          onClick={doDelete}
          className="mt-6 text-sm text-red-500 hover:text-red-700 underline underline-offset-2"
        >
          Supprimer le profil « {active.name} »
        </button>
      )}

      {pendingSwitchId && (
        <PasswordPrompt
          name={profiles.find((p) => p.id === pendingSwitchId)?.name ?? ""}
          wrong={wrongPassword}
          onSubmit={(password) => void confirmSwitchWithPassword(password)}
          onCancel={() => {
            setPendingSwitchId(null);
            setWrongPassword(false);
          }}
        />
      )}
    </div>
  );
}
