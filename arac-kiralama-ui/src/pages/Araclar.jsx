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

  useEffect(() => {
    if (!subeId || !alis || !donus) return;
    api
      .get(`/Araclar/GetByFilter?subeId=${subeId}&alis=${alis}&donus=${donus}`)
      .then((res) => setAraclar(res.data))
      .catch(() => console.log("Araçlar alınamadı"));
  }, [subeId, alis, donus]);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Uygun Araçlar</h1>

      {araclar.length === 0 ? (
        <p className="text-center text-gray-600">
          Bu kriterlere uygun araç bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {araclar.map((arac) => {
            const gunSayisi = Math.max(
              1,
              Math.ceil(
                (new Date(donus) - new Date(alis)) / (1000 * 60 * 60 * 24)
              )
            );
            const toplam = gunSayisi * arac.gunlukFiyat;
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
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
                    );
                  }
                }}
                className="bg-white rounded-xl shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={arac.resimUrl || "/car.png"}
                  alt={arac.model}
                  className="rounded-lg w-full h-48 object-cover pointer-events-none"
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
