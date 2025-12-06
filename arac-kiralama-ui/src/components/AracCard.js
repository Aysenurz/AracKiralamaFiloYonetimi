import React from "react";

export default function AracCard({ arac }) {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
      {/* Araç Fotoğrafı */}
      <img
        src={arac.resimUrl}
        alt={arac.marka + " " + arac.model}
        className="w-full h-48 object-cover"
      />

      {/* Araç Bilgileri */}
      <div className="p-5">
        <h2 className="text-xl font-bold">{arac.marka} {arac.model}</h2>

        <p className="text-gray-700 mt-1">
          {arac.yakitTipi} • {arac.vitesTipi}
        </p>

        <p className="text-lg font-semibold text-blue-600 mt-3">
          {arac.gunlukFiyat} TL / gün
        </p>

        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Hemen Kirala
        </button>
      </div>
    </div>
  );
}
