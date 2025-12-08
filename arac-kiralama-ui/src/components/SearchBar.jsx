import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SearchBar() {
  const navigate = useNavigate();

  const [subeler, setSubeler] = useState([]);
  const [subeId, setSubeId] = useState("");
  const [alis, setAlis] = useState("");
  const [donus, setDonus] = useState("");
  const [error, setError] = useState(""); // ✅ Hata state

  // ✅ ŞUBELERİ GETİR
  useEffect(() => {
    api
      .get("/Subeler")
      .then((res) => setSubeler(res.data))
      .catch((err) => console.error("Şubeler alınamadı:", err));
  }, []);

  // ✅ ARAÇLARI GÖSTER BUTONU
  const araclariGoster = () => {
    if (!subeId || !alis || !donus) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (new Date(donus) <= new Date(alis)) {
      setError("Dönüş tarihi, alış tarihinden sonra olmalıdır.");
      return;
    }

    setError(""); // hata yoksa temizle

    navigate(
      `/uygun-araclar?subeId=${subeId}&alis=${alis}&donus=${donus}`
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-5xl">
      <div className="flex gap-3 flex-wrap">

        {/* ŞUBE */}
        <select
          className="w-full md:w-1/4 bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          value={subeId}
          onChange={(e) => setSubeId(e.target.value)}
        >
          <option value="">Kiralama Noktası Seçin</option>
          {subeler.map((s) => (
            <option key={s.subeId} value={s.subeId}>
              {s.subeAdi}
            </option>
          ))}
        </select>

        {/* ALIŞ */}
        <input
          type="date"
          value={alis}
          min={new Date().toISOString().split("T")[0]} // ✅ bugünden önce seçilemez
          onChange={(e) => setAlis(e.target.value)}
          className="w-full md:w-1/4 bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm"
        />

        {/* DÖNÜŞ */}
        <input
          type="date"
          value={donus}
          min={alis} // ✅ alıştan önce seçilemez
          onChange={(e) => setDonus(e.target.value)}
          className="w-full md:w-1/4 bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm"
        />

        {/* BUTON */}
        <button
          onClick={araclariGoster}
          className="w-full md:w-auto bg-blue-600 text-white px-6 rounded-md font-semibold 
          hover:bg-blue-700 transition"
        >
          Araçları Göster
        </button>
      </div>

      {/* ✅ HATA MESAJI */}
      {error && (
        <p className="text-red-600 text-sm mt-3 font-medium">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}