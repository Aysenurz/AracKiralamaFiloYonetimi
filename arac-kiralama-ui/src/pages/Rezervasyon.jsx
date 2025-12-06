import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Rezervasyon() {
  const params = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const marka = params.get("marka");
  const model = params.get("model");
  const alis = params.get("alis");
  const donus = params.get("donus");
  const toplam = Number(params.get("toplam") || 0);
  const resim = decodeURIComponent(params.get("resim") || "/car.png");

  // Ekstra hizmetler
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

  const extrasTotal = useMemo(() => {
    return Object.entries(extras).reduce(
      (acc, [k, v]) => (v ? acc + extraPrices[k] : acc),
      0
    );
  }, [extras]);

  const grandTotal = toplam + extrasTotal;

  return (
    <div className="min-h-screen bg-gray-50 px-10 pt-36 pb-16">
      <div className="max-w-[90rem] mx-auto">
        {/* Başlık */}
        <h1 className="text-5xl font-bold mb-4">Rezervasyon</h1>
        <p className="text-gray-600 text-lg mb-12">
          Seçtiğin aracı aşağıdaki bilgilerle rezerve et.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
          {/* Sol taraf: Form & Ekstralar */}
          <div className="xl:col-span-8 space-y-10">
            {/* Araç Özeti */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10">
              <div className="flex items-center gap-8">
                <img
                  src={resim}
                  alt={`${marka} ${model}`}
                  className="w-52 h-36 object-cover rounded-2xl"
                />
                <div>
                  <h2 className="text-3xl font-semibold">
                    {marka} {model}
                  </h2>
                  <p className="text-gray-600 text-xl mt-2">
                    Alış: <b>{alis || "-"}</b> • Dönüş: <b>{donus || "-"}</b>
                  </p>
                </div>
              </div>
            </div>

            {/* Sürücü Bilgileri */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10">
              <h3 className="font-semibold text-2xl mb-6">Sürücü Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input className="input" placeholder="Ad" />
                <input className="input" placeholder="Soyad" />
                <input className="input" placeholder="E-posta" type="email" />
                <input className="input" placeholder="Telefon" />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Ehliyet yaşı en az 2 yıl olmalıdır.
              </p>
            </div>

            {/* Ekstralar */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10">
              <h3 className="font-semibold text-2xl mb-6">
                Ekstralar (Opsiyonel)
              </h3>
              <div className="space-y-4">
                {[
                  ["childSeat", "Çocuk Koltuğu", extraPrices.childSeat],
                  ["extraDriver", "Ek Sürücü", extraPrices.extraDriver],
                  ["fullInsurance", "Full Sigorta", extraPrices.fullInsurance],
                ].map(([key, label, price]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4 text-lg">
                      <input
                        type="checkbox"
                        checked={extras[key]}
                        onChange={(e) =>
                          setExtras((s) => ({ ...s, [key]: e.target.checked }))
                        }
                        className="h-5 w-5"
                      />
                      <span>{label}</span>
                    </div>
                    <span className="font-medium text-lg">{price} TL</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf: Ödeme Özeti */}
          <aside className="xl:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 sticky top-10">
              <h3 className="font-semibold text-2xl mb-8">Ödeme Özeti</h3>

              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span>Araç ücreti</span>
                  <span className="font-medium">{toplam} TL</span>
                </div>
                <div className="flex justify-between">
                  <span>Ekstralar</span>
                  <span className="font-medium">{extrasTotal} TL</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl">
                  <span className="font-semibold">Genel Toplam</span>
                  <span className="font-extrabold text-blue-600">
                    {grandTotal} TL
                  </span>
                </div>
              </div>

              {/* ✅ Ödemeye yönlendirme */}
              <button
                onClick={() =>
                  navigate("/odeme", {
                    state: {
                      marka,
                      model,
                      alis,
                      donus,
                      toplam: grandTotal,
                      resim,
                    },
                  })
                }
                className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-semibold text-xl transition"
              >
                Ödemeye Geç
              </button>

              <p className="text-sm text-gray-500 mt-5 text-center">
                * Ödeme sayfasında 3D Secure desteklenir. İptal/iadeler koşullara tabidir.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Tailwind yardımcı input stili */}
      <style>{`
        .input {
          @apply w-full rounded-xl border border-gray-300 px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
        }
      `}</style>
    </div>
  );
}
