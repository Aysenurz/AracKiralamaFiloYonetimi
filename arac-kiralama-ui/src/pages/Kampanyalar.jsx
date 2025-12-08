import React from "react";
import { useNavigate } from "react-router-dom";

// Görselleri import et
import yaz from "../assets/campaigns/yaz.jpeg";
import haftasonu from "../assets/campaigns/haftasonu.jpeg";
import erken from "../assets/campaigns/erken.jpeg";

// Kampanya verileri
const kampanyalar = [
  {
    id: 1,
    baslik: "Yaz İndirimi – SUV’larda %20",
    aciklama:
      "Yaz aylarına özel SUV araç kiralamalarında %20 indirim. Plaj tatili için mükemmel fırsat!",
    resim: yaz,
    link: "/araclar?segment=SUV",
    kupon: "SUV20",
    indirimTipi: "yuzde", // yüzde bazlı indirim
    indirimDegeri: 20,
  },
  {
    id: 2,
    baslik: "Hafta Sonu Fırsatı – Sedan 1000 TL / gün",
    aciklama:
      "Cuma–Pazar arası kiralayın, avantajlı fiyatla tatil keyfi yaşayın.",
    resim: haftasonu,
    link: "/araclar?segment=Sedan",
    kupon: "SEDAN1000",
    indirimTipi: "tutar", // sabit TL indirimi
    indirimDegeri: 1000,
  },
  {
    id: 3,
    baslik: "Erken Rezervasyon – %15 İndirim",
    aciklama:
      "Üç günden uzun kiralamalarda erken rezervasyon avantajı.",
    resim: erken,
    link: "/araclar",
    kupon: "ERKEN15",
    indirimTipi: "yuzde",
    indirimDegeri: 15,
  },
];

export default function Kampanyalar() {
  const navigate = useNavigate();

  // Kupon kodunu kopyalama fonksiyonu
  const kuponKopyala = (kod) => {
    navigator.clipboard.writeText(kod);
    alert(`Kupon kodu kopyalandı: ${kod}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
        Kampanyalarımız
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {kampanyalar.map((k) => (
          <div
            key={k.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={k.resim}
              alt={k.baslik}
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-blue-600">
                  {k.baslik}
                </h2>
                <p className="text-gray-700 mb-4">{k.aciklama}</p>

                {/* Kupon kutusu */}
                <div className="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 mb-4">
                  <span className="font-mono text-blue-700">{k.kupon}</span>
                  <button
                    onClick={() => kuponKopyala(k.kupon)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Kopyala
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate(k.link)}
                className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                İncele / Kirala
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
