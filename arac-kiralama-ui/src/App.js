import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Araclar from "./pages/Araclar";
import AracDetay from "./pages/AracDetay";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<Home />} />

        {/* Araçlar Listesi */}
        <Route path="/araclar" element={<Araclar />} />

        {/* Araç Detay Sayfası */}
        <Route path="/arac/:id" element={<AracDetay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
