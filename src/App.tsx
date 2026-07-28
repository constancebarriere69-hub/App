import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { PalierPage } from "./pages/PalierPage";
import { Bibliotheque } from "./pages/Bibliotheque";
import { LiteraryWorkPage } from "./pages/LiteraryWorkPage";
import { Progres } from "./pages/Progres";
import { DialoguePage } from "./pages/DialoguePage";
import { DialogueSessionPage } from "./pages/DialogueSessionPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/palier/:id" element={<PalierPage />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/bibliotheque/:id" element={<LiteraryWorkPage />} />
          <Route path="/progres" element={<Progres />} />
          <Route path="/dialogue" element={<DialoguePage />} />
          <Route path="/dialogue/:id" element={<DialogueSessionPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
