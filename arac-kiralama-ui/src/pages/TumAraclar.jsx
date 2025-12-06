import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TumAraclar() {
  const [araclar, setAraclar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TUM ARACLAR SAYFASI ✅");

    api
      .get("/Araclar/GetAllModels")
      .then((res) => {
        console.log("Tüm araç modelleri:", res.data);
        setAraclar(res.data);
      })
      .catch((err) => console.log("Araçlar alınamadı:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tüm Araçlar
      </h1>

      {araclar.length === 0 ? (
        <p className="text-center text-gray-600">
          Araç bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {araclar.map((arac) => (
            <div
              key={arac.modelId}
              onClick={() => navigate(`/arac/${arac.modelId}`)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition p-4"
            >
              <img
                src={arac.resimUrl || "/car.png"}
                className="rounded-lg w-full h-48 object-cover"
                alt={arac.model}
              />

              <h2 className="text-xl font-bold mt-4">
                {arac.marka} {arac.model}
              </h2>

              <p className="text-gray-600 mt-1">
                {arac.segment} • {arac.vitesTipi}
              </p>

              <p className="text-blue-600 font-bold mt-2">
                Günlük {arac.gunlukFiyat} TL
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
