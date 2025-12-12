import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // 🆕 Footer eklendi

import Home from "./pages/Home";
import Araclar from "./pages/Araclar";        // Uygun araçlar
import TumAraclar from "./pages/TumAraclar";  // Tüm araçlar
import AracDetay from "./pages/AracDetay";
import Rezervasyon from "./pages/Rezervasyon";
import Odeme from "./pages/Odeme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subeler from "./pages/Subeler";
import Kampanyalar from "./pages/Kampanyalar";
import Yardim from "./pages/Yardim";
import Profil from "./pages/Profil";
import Faturalar from "./pages/Faturalar";
import FaturaSonuc from "./pages/FaturaSonuc";

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

        {/* Ödeme */}
        <Route path="/odeme" element={<Odeme />} />

        {/* Giriş / Kayıt */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Şubeler, Kampanyalar, Yardım */}
        <Route path="/subeler" element={<Subeler />} /> 
        <Route path="/kampanyalar" element={<Kampanyalar />} />
        <Route path="/yardim" element={<Yardim />} />

        {/* Profil / Faturalar */}
        <Route path="/profil" element={<Profil />} />
        <Route path="/faturalar" element={<Faturalar />} />
        <Route path="/fatura-sonuc" element={<FaturaSonuc />} />
      </Routes>

      {/* Footer her sayfada en altta görünsün */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
