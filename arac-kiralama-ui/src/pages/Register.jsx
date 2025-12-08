import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // 🔹 API bağlantısı (baseURL: http://localhost:5015/api olmalı)

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    adSoyad: "",
    tcNo: "",
    telefon: "",
    email: "",
    adres: "",
    ehliyetNo: "",
    ehliyetTarihi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 Artık kayıt isteği doğru endpoint'e gider
      const res = await api.post("/Musteriler/register", form);

      alert(`🎉 Üyelik başarıyla oluşturuldu: ${res.data.model.adSoyad}`);
      navigate("/login"); // Kayıt sonrası giriş sayfasına yönlendir
    } catch (err) {
      console.error("❌ Hata:", err);
      if (err.response?.data) {
        alert(`⚠️ ${err.response.data}`);
      } else {
        alert("❌ Üyelik oluşturulurken bir hata oluştu!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Üye Ol
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="adSoyad" placeholder="Ad Soyad" value={form.adSoyad} onChange={handleChange} required className="input" />
          <input name="tcNo" placeholder="T.C. Kimlik No" maxLength={11} value={form.tcNo} onChange={handleChange} required className="input" />
          <input name="telefon" placeholder="Telefon" value={form.telefon} onChange={handleChange} className="input" />
          <input name="email" placeholder="E-posta" type="email" value={form.email} onChange={handleChange} required className="input" />
          <input name="adres" placeholder="Adres" value={form.adres} onChange={handleChange} className="input" />
          <input name="ehliyetNo" placeholder="Ehliyet No" value={form.ehliyetNo} onChange={handleChange} className="input" />
          <input name="ehliyetTarihi" type="date" value={form.ehliyetTarihi} onChange={handleChange} className="input" />

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Zaten hesabın var mı?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline">
            Giriş Yap
          </button>
        </p>
      </div>

      <style>{`
        .input {
          @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
        }
      `}</style>
    </div>
  );
}
