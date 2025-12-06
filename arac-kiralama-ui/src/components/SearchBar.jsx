import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SearchBar() {
  const navigate = useNavigate();

  const [subeler, setSubeler] = useState([]);
  const [subeId, setSubeId] = useState("");
  const [alis, setAlis] = useState("");
  const [donus, setDonus] = useState("");

  // ŞUBELERİ GETİR
  useEffect(() => {
    api
      .get("/Subeler")
      .then((res) => setSubeler(res.data))
      .catch((err) => console.error("Şubeler alınamadı:", err));
  }, []);

  const araclariGoster = () => {
    if (!subeId || !alis || !donus) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    // ✅ DOĞRU SAYFA
    navigate(
      `/uygun-araclar?subeId=${subeId}&alis=${alis}&donus=${donus}`
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl flex gap-3 shadow-lg w-full max-w-5xl">

      {/* ŞUBE */}
      <select
        className="w-full bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm 
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
        onChange={(e) => setAlis(e.target.value)}
        className="bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm"
      />

      {/* DÖNÜŞ */}
      <input
        type="date"
        value={donus}
        onChange={(e) => setDonus(e.target.value)}
        className="bg-white text-black p-3 rounded-md border border-gray-300 shadow-sm"
      />

      {/* BUTON */}
      <button
        onClick={araclariGoster}
        className="bg-blue-600 text-white px-6 rounded-md font-semibold 
        hover:bg-blue-700 transition"
      >
        Araçları Göster
      </button>
    </div>
  );
}
