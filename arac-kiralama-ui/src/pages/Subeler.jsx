import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Subeler() {
  const navigate = useNavigate();
  const [selectedSube, setSelectedSube] = useState(null);

  const subeler = [
    { id: 1, ad: "Kayseri Şubesi", il: "Kayseri", ilce: "Melikgazi", adres: "Sivas Caddesi No:45 Melikgazi / Kayseri", telefon: "0352 222 11 22" },
    { id: 2, ad: "Ankara Şubesi", il: "Ankara", ilce: "Çankaya", adres: "Tunalı Hilmi Caddesi No:22 Çankaya / Ankara", telefon: "0312 333 22 33" },
    { id: 3, ad: "İstanbul Şubesi", il: "İstanbul", ilce: "Kadıköy", adres: "Bahariye Caddesi No:18 Kadıköy / İstanbul", telefon: "0216 444 33 44" },
    { id: 4, ad: "İzmir Şubesi", il: "İzmir", ilce: "Konak", adres: "Kıbrıs Şehitleri Caddesi No:55 Konak / İzmir", telefon: "0232 555 44 55" },
    { id: 5, ad: "Adana Şubesi", il: "Adana", ilce: "Seyhan", adres: "Atatürk Caddesi No:30 Seyhan / Adana", telefon: "0322 666 55 66" },
    { id: 6, ad: "Nevşehir Şubesi", il: "Nevşehir", ilce: "Merkez", adres: "Atatürk Bulvarı No:10 Merkez / Nevşehir", telefon: "0384 777 66 77" },
    { id: 7, ad: "Bursa Şubesi", il: "Bursa", ilce: "Osmangazi", adres: "Fevzi Çakmak Caddesi No:40 Osmangazi / Bursa", telefon: "0224 888 77 88" },
    { id: 8, ad: "Malatya Şubesi", il: "Malatya", ilce: "Battalgazi", adres: "Kanlıbayır Caddesi No:15 Battalgazi / Malatya", telefon: "0422 999 88 99" },
    { id: 9, ad: "Konya Şubesi", il: "Konya", ilce: "Selçuklu", adres: "Yeni İstanbul Caddesi No:60 Selçuklu / Konya", telefon: "0332 123 45 67" },
    { id: 10, ad: "Artvin Şubesi", il: "Artvin", ilce: "Merkez", adres: "Kazım Karabekir Caddesi Merkez / Artvin", telefon: "0466 234 56 78" },
    { id: 11, ad: "Eskişehir Şubesi", il: "Eskişehir", ilce: "Odunpazarı", adres: "Afîye Mahallesi Odunpazarı / Eskişehir", telefon: "0222 345 67 89" },
    { id: 12, ad: "Antalya Şubesi", il: "Antalya", ilce: "Muratpaşa", adres: "Işıklar Caddesi No:25 Muratpaşa / Antalya", telefon: "0242 456 78 90" },
    { id: 13, ad: "Mersin Şubesi", il: "Mersin", ilce: "Yenişehir", adres: "Gazi Mustafa Kemal Bulvarı Yenişehir / Mersin", telefon: "0324 567 89 01" },
    { id: 14, ad: "Hatay Şubesi", il: "Hatay", ilce: "Antakya", adres: "Harbiye Caddesi Antakya / Hatay", telefon: "0326 678 90 12" },
    { id: 15, ad: "Bolu Şubesi", il: "Bolu", ilce: "Merkez", adres: "İzzet Baysal Caddesi Merkez / Bolu", telefon: "0374 789 01 23" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#0f172a]">
        🚗 Kiralama Noktalarımız
      </h1>

      {/* Şube kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {subeler.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-2">{s.ad}</h2>
              <p className="text-gray-700 text-sm mb-1">🏙️ {s.il} / {s.ilce}</p>
              <p className="text-gray-600 text-sm mb-1">📍 {s.adres}</p>
              <p className="text-gray-600 text-sm mb-1">📞 {s.telefon}</p>
            </div>

            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              onClick={() => setSelectedSube(s)}
            >
              Şube Detay
            </button>
          </div>
        ))}
      </div>

      {/* Şube detay modalı */}
      {selectedSube && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setSelectedSube(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{selectedSube.ad}</h2>
            <p className="text-gray-700 mb-2">🏙️ {selectedSube.il} / {selectedSube.ilce}</p>
            <p className="text-gray-700 mb-2">📍 {selectedSube.adres}</p>
            <p className="text-gray-700 mb-2">📞 {selectedSube.telefon}</p>
            <p className="text-gray-500 text-sm mt-2">
              Bu şubede araç teslimi ve iadesi 7/24 yapılmaktadır.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => navigate("/araclar")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                🚘 Şubedeki Araç Modellerini Gör
              </button>
              <button
                onClick={() => setSelectedSube(null)}
                className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-lg font-medium transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
