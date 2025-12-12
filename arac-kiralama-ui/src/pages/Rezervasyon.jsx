import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Rezervasyon() {
  const params = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  // 🔐 Giriş kontrolü
  useEffect(() => {
    const user =
      localStorage.getItem("user") || localStorage.getItem("kullanici");
    if (!user) {
      alert("Lütfen araç kiralamadan önce giriş yapınız.");
      navigate("/giris");
    }
  }, [navigate]);

  // ✅ Araç bilgileri URL'den alınıyor
  const aracId = params.get("aracId");
  const marka = params.get("marka");
  const model = params.get("model");
  const fiyat = Number(params.get("fiyat")) || 0;
  const resim = decodeURIComponent(params.get("resim") || "/car.png");
  const segment = params.get("segment") || "Belirtilmedi";

  // ✅ Ana sayfadan gelen tarihleri al
  const alisQuery = params.get("alis");
  const donusQuery = params.get("donus");

  // ✅ Tarihler otomatik dolu gelsin ama değiştirilebilir olsun
  const [alis, setAlis] = useState(alisQuery || "");
  const [donus, setDonus] = useState(donusQuery || "");

  // ✅ Ekstra hizmetler
  const [extras, setExtras] = useState({
    childSeat: false,
    extraDriver: false,
    fullInsurance: false,
  });

  const extraPrices = {
    childSeat: 120,
    extraDriver: 180,
    fullInsurance: 350,
  };

  // ✅ Kiralama süresi hesaplama
  const gunSayisi = useMemo(() => {
    if (!alis || !donus) return 0;
    const start = new Date(alis);
    const end = new Date(donus);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [alis, donus]);

  // ✅ Ekstra ücretleri hesaplama
  const extrasTotal = useMemo(() => {
    return Object.entries(extras).reduce(
      (acc, [k, v]) => (v ? acc + extraPrices[k] : acc),
      0
    );
  }, [extras]);

  // ✅ Genel toplam
  const grandTotal = gunSayisi * fiyat + extrasTotal;

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Rezervasyon</h1>
        <p className="text-gray-600 mb-8">
          Seçtiğin aracı aşağıdaki bilgilerle rezerve et.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sol taraf */}
          <div className="lg:col-span-7 space-y-8">
            {/* 🚘 Araç Özeti */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <img
                  src={resim}
                  alt={`${marka} ${model}`}
                  className="w-28 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {marka} {model}
                  </h2>
                  <p className="text-gray-600">
                    Günlük Fiyat:{" "}
                    <b className="text-blue-600">{fiyat} TL</b>
                  </p>
                  <p className="text-sm text-gray-500">
                    Segment: <b>{segment}</b>
                  </p>
                </div>
              </div>

              {/* 📅 Tarih seçimi */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Alış Tarihi
                  </label>
                  <input
                    type="date"
                    value={alis}
                    onChange={(e) => setAlis(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Dönüş Tarihi
                  </label>
                  <input
                    type="date"
                    value={donus}
                    onChange={(e) => setDonus(e.target.value)}
                    className="input"
                    min={alis}
                  />
                </div>
              </div>

              {gunSayisi > 0 && (
                <p className="mt-3 text-gray-600">
                  Kiralama süresi: <b>{gunSayisi}</b> gün
                </p>
              )}
            </div>

            {/* 👤 Sürücü Bilgileri */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-lg mb-4">Sürücü Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input" placeholder="Ad" />
                <input className="input" placeholder="Soyad" />
                <input className="input" placeholder="E-posta" type="email" />
                <input className="input" placeholder="Telefon" />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Ehliyet yaşı en az 2 yıl olmalıdır.
              </p>
            </div>

            {/* 🧾 Ekstralar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-lg mb-4">
                Ekstralar (Opsiyonel)
              </h3>
              <div className="space-y-3">
                {[
                  ["childSeat", "Çocuk Koltuğu", extraPrices.childSeat],
                  ["extraDriver", "Ek Sürücü", extraPrices.extraDriver],
                  ["fullInsurance", "Full Sigorta", extraPrices.fullInsurance],
                ].map(([key, label, price]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between border border-gray-200 rounded-xl p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={extras[key]}
                        onChange={(e) =>
                          setExtras((s) => ({ ...s, [key]: e.target.checked }))
                        }
                        className="h-4 w-4"
                      />
                      <span>{label}</span>
                    </div>
                    <span className="font-medium">{price} TL</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 💳 Sağ taraf: Ödeme özeti */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="font-semibold text-lg mb-4">Ödeme Özeti</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Araç ücreti</span>
                    <span className="font-medium">
                      {gunSayisi > 0 ? `${gunSayisi * fiyat} TL` : "0 TL"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ekstralar</span>
                    <span className="font-medium">{extrasTotal} TL</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Genel Toplam</span>
                    <span className="font-extrabold text-blue-600">
                      {grandTotal} TL
                    </span>
                  </div>
                </div>

                {/* 🟢 Ödeme butonu */}
                <button
                  disabled={!alis || !donus || gunSayisi === 0}
                  onClick={() =>
                    navigate("/odeme", {
                      state: {
                        marka,
                        model,
                        resim,
                        toplam: grandTotal,
                        segment,
                        gunSayisi,
                        aracId,
                        alis,
                        donus,
                      },
                    })
                  }
                  className={`mt-6 w-full ${
                    alis && donus && gunSayisi > 0
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  } text-white py-3.5 rounded-xl font-semibold transition`}
                >
                  Ödemeye Geç
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  * Tarih seçimini yaptıktan sonra ödeme sayfasına geçebilirsiniz.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .input {
          @apply w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
        }
      `}</style>
    </div>
  );
}
