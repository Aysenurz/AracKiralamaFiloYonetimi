import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Base URL: http://localhost:5015/api

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", tcNo: "" }); // 🔹 Şifre yerine TC kullanıyoruz

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/Musteriler/login", form);

      alert(`🎉 Hoş geldin ${res.data.adSoyad || res.data.musteri?.adSoyad || "Kullanıcı"}!`);

      // 💎 GÜNCELLENEN KISIM: musteriId düzeltmesi
      localStorage.setItem(
        "kullanici",
        JSON.stringify({
          ...res.data,
          musteriId: res.data.musteriId || res.data.id || 1, // fallback ekledik
        })
      );

      navigate("/"); // Ana sayfaya yönlendir
    } catch (err) {
      console.error("❌ Giriş hatası:", err);
      if (err.response?.data) {
        alert(`⚠️ ${err.response.data}`);
      } else {
        alert("❌ E-posta veya TC No hatalı!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Giriş Yap
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="tcNo"
            placeholder="T.C. Kimlik No"
            value={form.tcNo}
            onChange={handleChange}
            required
            maxLength={11}
            className="input"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Hesabın yok mu?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Üye Ol
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
