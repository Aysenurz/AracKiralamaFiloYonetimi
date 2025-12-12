import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Araclar() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const subeId = params.get("subeId");
  const alis = params.get("alis");
  const donus = params.get("donus");

  const [araclar, setAraclar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("none"); // 🔹 artan, azalan, yok

  useEffect(() => {
    if (!subeId || !alis || !donus) return;
    setLoading(true);

    api
      .get(`/Araclar/GetByFilter?subeId=${subeId}&alis=${alis}&donus=${donus}`)
      .then((res) => setAraclar(res.data))
      .catch(() => console.log("Araçlar alınamadı"))
      .finally(() => setLoading(false));
  }, [subeId, alis, donus]);

  // 🔹 Sıralama işlemi
  const sortedAraclar = [...araclar].sort((a, b) => {
    if (sortType === "asc") return a.gunlukFiyat - b.gunlukFiyat;
    if (sortType === "desc") return b.gunlukFiyat - a.gunlukFiyat;
    return 0;
  });

  // 🔹 Sıralama butonuna tıklama
  const handleSort = (type) => {
    setSortType(type);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      {/* 🔹 Sayfa Başlığı */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        🚗 Uygun Araçlar
      </h1>

      {/* 🔹 Sıralama Butonları */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <button
          onClick={() => handleSort("asc")}
          className={`px-5 py-2 rounded-lg font-semibold transition shadow-sm ${
            sortType === "asc"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          🔼 Fiyat Artan
        </button>

        <button
          onClick={() => handleSort("desc")}
          className={`px-5 py-2 rounded-lg font-semibold transition shadow-sm ${
            sortType === "desc"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          🔽 Fiyat Azalan
        </button>

        <button
          onClick={() => handleSort("none")}
          className={`px-5 py-2 rounded-lg font-semibold transition shadow-sm ${
            sortType === "none"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          🔁 Sıralamayı Sıfırla
        </button>
      </div>

      {/* 🔄 Yükleniyor */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Araçlar yükleniyor, lütfen bekleyin...
        </p>
      ) : sortedAraclar.length === 0 ? (
        // ⚠️ Hiç araç bulunamadıysa
        <div className="text-center mt-20">
          <p className="text-gray-700 text-xl font-semibold mb-2">
            Bu tarihlerde seçtiğiniz şubede müsait araç bulunamadı 😔
          </p>
          <p className="text-gray-500">
            Lütfen farklı bir tarih veya şube seçmeyi deneyin.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition"
          >
            🔙 Geri Dön
          </button>
        </div>
      ) : (
        // ✅ Araç listesi
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedAraclar.map((arac) => {
            const gunSayisi = Math.max(
              1,
              Math.ceil(
                (new Date(donus) - new Date(alis)) / (1000 * 60 * 60 * 24)
              )
            );
            const resim = encodeURIComponent(arac.resimUrl || "/car.png");

            return (
              <div
                key={arac.modelId}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(
                    `/rezervasyon?id=${arac.modelId}&marka=${encodeURIComponent(
                      arac.marka
                    )}&model=${encodeURIComponent(
                      arac.model
                    )}&segment=${encodeURIComponent(
                      arac.segment
                    )}&alis=${alis}&donus=${donus}&fiyat=${
                      arac.gunlukFiyat
                    }&resim=${resim}`
                  )
                }
                className="bg-white rounded-xl shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={arac.resimUrl || "/car.png"}
                  alt={arac.model}
                  className="rounded-lg w-full h-48 object-cover"
                />
                <h2 className="text-xl font-bold mt-4">
                  {arac.marka} {arac.model}
                </h2>
                <p className="text-gray-600">🚘 {arac.segment}</p>
                <p className="text-gray-600">⚙️ {arac.vitesTipi}</p>
                <p className="text-gray-600">⛽ {arac.yakitTipi}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Günlük {arac.gunlukFiyat} TL
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
