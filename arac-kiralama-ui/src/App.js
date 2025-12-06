import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Araclar from "./pages/Araclar";        // Uygun araçlar
import TumAraclar from "./pages/TumAraclar";  // Tüm araçlar
import AracDetay from "./pages/AracDetay";
import Rezervasyon from "./pages/Rezervasyon";
import Odeme from "./pages/Odeme";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar her sayfada görünsün */}
      <Navbar />

      <Routes>
        {/* Ana Sayfa */}
        <Route path="/" element={<Home />} />

        {/* Tüm Araçlar */}
        <Route path="/araclar" element={<TumAraclar />} />

        {/* Tarih seç → Uygun Araçlar */}
        <Route path="/uygun-araclar" element={<Araclar />} />

        {/* Araç Detay */}
        <Route path="/arac/:id" element={<AracDetay />} />

        {/* Rezervasyon / Kiralama */}
        <Route path="/rezervasyon" element={<Rezervasyon />} />

        <Route path="/odeme" element={<Odeme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
