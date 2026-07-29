import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { PalierPage } from "./pages/PalierPage";
import { Bibliotheque } from "./pages/Bibliotheque";
import { LiteraryWorkPage } from "./pages/LiteraryWorkPage";
import { RussianHistoryPage } from "./pages/RussianHistoryPage";
import { Progres } from "./pages/Progres";
import { DialoguePage } from "./pages/DialoguePage";
import { DialogueSessionPage } from "./pages/DialogueSessionPage";
import { Revision } from "./pages/Revision";
import { Grammaire } from "./pages/Grammaire";
import { Vocabulaire } from "./pages/Vocabulaire";
import { Conjugaison } from "./pages/Conjugaison";
import { Declinaison } from "./pages/Declinaison";
import { Nombres } from "./pages/Nombres";
import { Idiomes } from "./pages/Idiomes";
import { Aspects } from "./pages/Aspects";
import { VerbesMouvement } from "./pages/VerbesMouvement";
import { Prepositions } from "./pages/Prepositions";
import { TestNiveau } from "./pages/TestNiveau";
import { Profil } from "./pages/Profil";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/palier/:id" element={<PalierPage />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/bibliotheque/:id" element={<LiteraryWorkPage />} />
          <Route path="/histoire-russie/:id" element={<RussianHistoryPage />} />
          <Route path="/progres" element={<Progres />} />
          <Route path="/dialogue" element={<DialoguePage />} />
          <Route path="/dialogue/:id" element={<DialogueSessionPage />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/grammaire" element={<Grammaire />} />
          <Route path="/vocabulaire" element={<Vocabulaire />} />
          <Route path="/vocabulaire/:id" element={<Vocabulaire />} />
          <Route path="/conjugaison" element={<Conjugaison />} />
          <Route path="/conjugaison/:id" element={<Conjugaison />} />
          <Route path="/declinaison" element={<Declinaison />} />
          <Route path="/nombres" element={<Nombres />} />
          <Route path="/idiomes" element={<Idiomes />} />
          <Route path="/aspects" element={<Aspects />} />
          <Route path="/verbes-mouvement" element={<VerbesMouvement />} />
          <Route path="/prepositions" element={<Prepositions />} />
          <Route path="/test-niveau" element={<TestNiveau />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
