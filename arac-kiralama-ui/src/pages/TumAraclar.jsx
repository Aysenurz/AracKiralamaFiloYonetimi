import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Araclar() {
  const [araclar, setAraclar] = useState([]);
  const [filtre, setFiltre] = useState("Tümü");

  useEffect(() => {
    api
      .get("/Araclar/GetAllModels")
      .then((res) => setAraclar(res.data))
      .catch(() => console.log("Araçlar alınamadı"));
  }, []);

  const kategoriler = [
    "Tümü",
    "SUV",
    "Sedan",
    "Hatchback",
    "Premium",
    "Ekonomik"
  ];

  // 🧠 Dinamik filtreleme (veritabanı sütunu olmadan)
  const filtreliAraclar =
    filtre === "Tümü"
      ? araclar
      : araclar.filter((a) => {
          const segment = a.segment?.toLowerCase();
          const fiyat = a.gunlukFiyat;

          if (filtre === "SUV") return segment === "suv";
          if (filtre === "Sedan") return segment === "sedan";
          if (filtre === "Hatchback") return segment === "hatchback";
          if (filtre === "Premium") return fiyat >= 2500; // 💎 Lüks araçlar
          if (filtre === "Ekonomik") return fiyat < 1500; // 💸 Uygun fiyatlılar
          return false;
        });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">
      {/* Başlık ve açıklama */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 tracking-tight">
          FiloRent Araç Filosu
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          FiloRent olarak her ihtiyaca uygun geniş araç yelpazemizle hizmetinizdeyiz.  
          Ekonomik sınıftan lüks segmente, SUV’lardan sedan modellere kadar tüm 
          araçlarımızı keşfedin. Her aracımız periyodik bakımları yapılmış, sigortalı 
          ve güvenli sürüş garantilidir.
        </p>
      </div>

      {/* Kategori sekmeleri */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {kategoriler.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setFiltre(kategori)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              filtre === kategori
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Araç kartları */}
      {filtreliAraclar.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Bu kategoriye ait araç bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filtreliAraclar.map((arac) => (
            <div
              key={arac.modelId}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-5"
            >
              <img
                src={arac.resimUrl || "/car.png"}
                alt={arac.model}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              {/* Araç Bilgileri */}
              <h2 className="text-lg font-bold text-gray-800">
                {arac.marka} {arac.model}
              </h2>
              <p className="text-gray-500 text-sm mb-3">
                {arac.segment} • {arac.vitesTipi} • {arac.yakitTipi} • {arac.yil}
              </p>

              {/* Özellikler */}
              <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm mb-3">
                <div className="flex items-center gap-2">
                  <span>👤</span> <span>5 Kişi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚪</span> <span>4 Kapı</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🧳</span> <span>2 Bavul</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>❄️</span> <span>Klima</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span> <span>Kasko Dahil</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⛽</span> <span>{arac.yakitTipi}</span>
                </div>
              </div>

              {/* Fiyat */}
              <p className="text-blue-600 font-semibold">
                Günlük {arac.gunlukFiyat} TL
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
