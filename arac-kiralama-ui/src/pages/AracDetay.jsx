import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AracDetay() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const alis = params.get("alis");
  const donus = params.get("donus");
  const subeId = params.get("subeId");

  const [arac, setArac] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Araç detayını çek
  useEffect(() => {
    const getirArac = async () => {
      try {
        const { data } = await api.get(`/Araclar/detail/${id}`);
        setArac(data);

        const base = data?.resimUrl || "/car.png";
        setThumbs([base, base, base, base]);
        setActiveImg(base);
      } catch (err) {
        console.error("Araç detayı alınamadı:", err);
      }
    };

    getirArac();
  }, [id]);

  // 🚗 ÖDEME SAYFASINA GİT (KİRALAMA AKIŞI)
  const handleKiralamaYap = () => {
    if (!arac) return;

    const kullanici = JSON.parse(localStorage.getItem("kullanici"));
    if (!kullanici) {
      alert("Lütfen önce giriş yapınız!");
      navigate("/login");
      return;
    }

    // 🔴 KRİTİK KONTROL
    if (!arac.aracId || arac.aracId <= 0) {
      alert("Araç bilgisi bulunamadı. Lütfen tekrar deneyin.");
      return;
    }

    // 🔹 Ödeme sayfasına GEREKLİ TÜM VERİLERİ gönderiyoruz
    navigate("/odeme", {
      state: {
        aracId: arac.aracId,          // ✅ EN KRİTİK SATIR
        marka: arac.marka,
        model: arac.model,
        resim: arac.resimUrl,
        segment: arac.segment,
        gunSayisi: alis && donus
          ? Math.max(
              1,
              Math.ceil(
                (new Date(donus) - new Date(alis)) / (1000 * 60 * 60 * 24)
              )
            )
          : 1,
        toplam: arac.gunlukFiyat *
          (alis && donus
            ? Math.max(
                1,
                Math.ceil(
                  (new Date(donus) - new Date(alis)) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : 1),
        alis,
        donus,
        subeId
      }
    });
  };

  if (!arac) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Yükleniyor…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Araçlar / {arac.marka} /{" "}
            <span className="text-gray-800">{arac.model}</span>
          </p>
          <h1 className="text-4xl font-bold mt-2">
            {arac.marka} {arac.model}
          </h1>
          <p className="text-gray-600 mt-1">
            {arac.segment} • {arac.vitesTipi} • {arac.yakitTipi} • {arac.yil}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sol */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <img
                src={activeImg}
                alt={arac.model}
                className="w-full h-[420px] object-contain rounded-xl"
              />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {thumbs.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(t)}
                    className={`h-24 rounded-xl border ${
                      activeImg === t
                        ? "border-blue-500"
                        : "border-gray-200"
                    } bg-white overflow-hidden`}
                  >
                    <img
                      src={t}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Günlük Fiyat</span>
                  <span className="font-semibold">
                    {arac.gunlukFiyat} TL
                  </span>
                </div>

                <button
                  onClick={handleKiralamaYap}
                  disabled={loading}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
                >
                  Ödemeye Geç
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  * Ödeme adımında kiralama ve fatura oluşturulur.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
