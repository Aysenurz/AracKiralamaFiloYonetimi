import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profil() {
  const navigate = useNavigate();

  // 🔹 LocalStorage'dan kullanıcı bilgilerini al
  const kullanici = JSON.parse(localStorage.getItem("kullanici"));

  if (!kullanici) {
    // Eğer giriş yapılmamışsa
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("kullanici");
    alert("Çıkış yapıldı!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          👤 Hesabım
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div>
            <p><b>Ad Soyad:</b> {kullanici.adSoyad}</p>
            <p><b>T.C. Kimlik No:</b> {kullanici.tcNo}</p>
            <p><b>E-posta:</b> {kullanici.email}</p>
          </div>

          <div>
            <p><b>Telefon:</b> {kullanici.telefon}</p>
            <p><b>Adres:</b> {kullanici.adres}</p>
            <p><b>Ehliyet No:</b> {kullanici.ehliyetNo}</p>
            <p><b>Ehliyet Tarihi:</b> {kullanici.ehliyetTarihi || "Belirtilmemiş"}</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
