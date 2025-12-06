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

  const [arac, setArac] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/Araclar/detail/${id}`);
        setArac(data);
        // küçük bir galeri efekti (tek görselin varyasyonları)
        const base = data?.resimUrl || "/car.png";
        setThumbs([base, base, base, base]);
        setActiveImg(base);
      } catch {
        console.log("Araç detayı alınamadı");
      }
    })();
  }, [id]);

  if (!arac) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Yükleniyor…</div>
      </div>
    );
  }

  // 👇 Gün sayısı ve toplam fiyat hesaplaması
  const gunSayisi =
    alis && donus
      ? Math.max(1, Math.ceil((new Date(donus) - new Date(alis)) / 86400000))
      : 1;

  const toplamFiyat = (arac.gunlukFiyat || 0) * gunSayisi;
  // 👆 toplamFiyat'ı navigate içinde kullanacağız

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Başlık / breadcrumb hissi */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Araçlar / {arac.marka} / <span className="text-gray-800">{arac.model}</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">
            {arac.marka} {arac.model}
          </h1>
          <p className="text-gray-600 mt-1">
            {arac.segment} • {arac.vitesTipi} • {arac.yakitTipi} • {arac.yil}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sol: Galeri */}
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
                      activeImg === t ? "border-blue-500" : "border-gray-200"
                    } bg-white overflow-hidden`}
                  >
                    <img src={t} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Özellikler */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["👤 5 Kişi", ""],
                ["🚪 4 Kapı", ""],
                ["🧳 2 Büyük Bavul", ""],
                ["❄️ Klima", ""],
                ["🛡️ Kasko Dahil", ""],
                ["⛽ Yakıt Tasarruflu", ""],
              ].map(([t], idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-gray-700"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Avantajlar */}
            <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-semibold text-green-900 mb-3">
                Neden bu araç?
              </h3>
              <ul className="text-green-800 space-y-2">
                <li>✔ Şehir içi ve uzun yol için ideal</li>
                <li>✔ Bakımlı ve temiz araç garantisi</li>
                <li>✔ Sürpriz ücret yok</li>
                <li>✔ İptal ve değişiklik kolaylığı</li>
              </ul>
            </div>
          </div>

          {/* Sağ: Sticky fiyat/rezervasyon */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Günlük Fiyat</span>
                    <span className="font-semibold">{arac.gunlukFiyat} TL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Gün Sayısı</span>
                    <span className="font-semibold">{gunSayisi}</span>
                  </div>
                  {alis && donus && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Alış</span>
                        <span className="font-medium">{alis}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Dönüş</span>
                        <span className="font-medium">{donus}</span>
                      </div>
                    </>
                  )}
                  <hr className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Toplam</span>
                    <span className="text-xl font-extrabold text-blue-600">
                      {toplamFiyat} TL
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const resim = encodeURIComponent(arac.resimUrl || "/car.png");
                    // 👇 Burada 'toplam' yerine doğru değişken olan 'toplamFiyat' kullanıldı.
                    navigate(
                      `/rezervasyon?marka=${encodeURIComponent(arac.marka)}&model=${encodeURIComponent(arac.model)}&alis=${alis}&donus=${donus}&toplam=${toplamFiyat}&resim=${resim}`
                    );
                  }}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
                >
                  Kiralamayı Onayla
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  * Temel güvence dahildir. Teslimde ehliyet ve kredi kartı ibrazı gerekir.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}