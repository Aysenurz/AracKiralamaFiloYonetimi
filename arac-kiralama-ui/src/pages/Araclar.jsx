import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

export default function Araclar() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const subeId = params.get("subeId");
  const alis = params.get("alis");
  const donus = params.get("donus");

  const [araclar, setAraclar] = useState([]);

  
  useEffect(() => {
    console.log("location.search → ", location.search);
    console.log("subeId →", subeId);
    console.log("alis →", alis);
    console.log("donus →", donus);

    if (!subeId || !alis || !donus) return;

console.log("İstek atılan URL:", `/Araclar/GetByFilter?subeId=${subeId}&alis=${alis}&donus=${donus}`);

    api
      .get(`/Araclar/GetByFilter?subeId=${subeId}&alis=${alis}&donus=${donus}`)
      .then((res) => {
        console.log("API’den gelen araçlar:", res.data);
         console.log("API’den gelen araçlar:", res.data);  // ⭐ BURAYA YAZILACAK
        setAraclar(res.data);
      })
      .catch((err) => console.log("Araçlar alınamadı:", err));
  }, [subeId, alis, donus]);

  // 🔥 Aynı modeli sadece bir kez gösteren liste
  const uniqAraclar = [];
  araclar.forEach((a) => {
    if (!uniqAraclar.some((x) => x.modelId === a.modelId)) {
      uniqAraclar.push(a);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Uygun Araçlar</h1>

      <div className="bg-white p-5 rounded-xl shadow mb-10 max-w-3xl mx-auto">
        <p>
          <strong>Kiralama Noktası:</strong> {subeId}
        </p>
        <p>
          <strong>Alış Tarihi:</strong> {alis}
        </p>
        <p>
          <strong>Dönüş Tarihi:</strong> {donus}
        </p>
      </div>

      {/* ARAÇ KARTLARI */}
      {uniqAraclar.length === 0 ? (
        <p className="text-center text-gray-600">
          Bu kriterlere uygun araç bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {uniqAraclar.map((arac) => (
            <div
              key={arac.modelId} // aynı model 1 kez gösterildiği için modelId ile key
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-4"
            >
              {/* Araç görseli */}
              <img
                src={arac.resimUrl || "/car.png"}
                className="rounded-lg w-full h-48 object-cover"
                alt={arac.model}
              />

              <h2 className="text-xl font-bold mt-4">
                {arac.marka} {arac.model}
              </h2>

              <p className="text-gray-600 mt-2">
                🚘 Segment: {arac.segment}
              </p>

              <p className="text-gray-600">⚙️ Vites: {arac.vitesTipi}</p>

              <p className="text-gray-600">⛽ Yakıt: {arac.yakitTipi}</p>

              <p className="text-lg font-bold text-blue-600 mt-3">
                Günlük {arac.gunlukFiyat} TL
              </p>

              <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                Hemen Kirala
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
