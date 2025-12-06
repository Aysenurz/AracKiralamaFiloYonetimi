export default function AracKart({ arac }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-200">

      {/* Araç Görseli */}
      <div className="relative">
        <img
          src={arac.resimUrl || "/car.png"}
          alt={arac.model}
          className="w-full h-52 object-cover rounded-t-2xl"
        />

        {/* Fiyat etiketi */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg font-semibold text-sm">
          Günlük {arac.gunlukFiyat} TL
        </div>
      </div>

      {/* Araç Bilgileri */}
      <div className="p-5">

        <h2 className="text-xl font-bold">
          {arac.marka} {arac.model}
        </h2>

        {/* Özellik Satırı */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <span className="text-blue-600 text-lg">🚘</span>
            <span>{arac.segment}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-blue-600 text-lg">⚙️</span>
            <span>{arac.vitesTipi}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-blue-600 text-lg">⛽</span>
            <span>{arac.yakitTipi}</span>
          </div>
        </div>

        {/* Buton */}
        <button className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition">
          Aracı İncele
        </button>

      </div>
    </div>
  );
}
