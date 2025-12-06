import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Odeme() {
  const { state } = useLocation();
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Ödeme başarılı! Rezervasyonunuz onaylandı.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-8 py-16">
      {/* 🔥 Beyaz ana kart — daha büyük ve ekranın ortasında */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[90rem] p-16">
        {/* Başlık */}
        <h1 className="text-5xl font-bold text-center mb-14 text-gray-800 tracking-tight">
          💳 Ödeme Sayfası
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {/* Sol kısım: Araç özeti */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-8">
              <img
                src={state?.resim}
                alt={`${state?.marka} ${state?.model}`}
                className="w-60 h-40 object-cover rounded-2xl shadow-md"
              />
              <div>
                <p className="font-semibold text-3xl text-gray-800">
                  {state?.marka} {state?.model}
                </p>
                <p className="text-gray-600 mt-3 text-2xl">
                  Tutar:{" "}
                  <span className="text-blue-600 font-bold">
                    {state?.toplam} TL
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-2xl text-gray-700 mb-4">
                Avantajlar
              </h3>
              <ul className="text-gray-600 space-y-3 text-lg">
                <li>✔ Ücretsiz iptal ve değişiklik hakkı</li>
                <li>✔ Kasko & sigorta koruması</li>
                <li>✔ Online güvenli ödeme sistemi</li>
                <li>✔ 7/24 müşteri desteği</li>
              </ul>
            </div>
          </div>

          {/* Sağ kısım: Kart bilgileri formu */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-700 mb-3 font-medium text-xl">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                name="name"
                value={cardInfo.name}
                onChange={handleChange}
                placeholder="Örnek: Ayşenur Zontul"
                required
                className="input text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-3 font-medium text-xl">
                Kart Numarası
              </label>
              <input
                type="text"
                name="number"
                value={cardInfo.number}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                maxLength="19"
                className="input text-lg tracking-widest"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-3 font-medium text-xl">
                  Son Kullanma (AA/YY)
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardInfo.expiry}
                  onChange={handleChange}
                  placeholder="12/27"
                  required
                  maxLength="5"
                  className="input text-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-3 font-medium text-xl">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={cardInfo.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  required
                  maxLength="3"
                  className="input text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-semibold text-2xl shadow-md transition"
            >
              Ödemeyi Tamamla
            </button>

            <p className="text-base text-gray-500 mt-5 text-center">
              * 3D Secure desteği bulunmaktadır. Bilgileriniz şifrelenerek
              güvenli şekilde işlenir.
            </p>
          </form>
        </div>

        {/* Yardımcı input stili */}
        <style>{`
          .input {
            @apply w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
          }
        `}</style>
      </div>
    </div>
  );
}
