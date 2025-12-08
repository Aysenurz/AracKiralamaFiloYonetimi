import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Faturalar() {
  const [faturalar, setFaturalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const getirFaturalar = async () => {
      try {
        const res = await api.get("/Faturalar");
        // ✅ Gerçek fatura listesi res.data.items içinde
        const data = res.data.items || res.data;
        setFaturalar(data);
      } catch (err) {
        console.error("❌ Faturalar alınamadı:", err);
        setHata("Faturalar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    getirFaturalar();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold text-gray-600 animate-pulse">
          Faturalar yükleniyor...
        </p>
      </div>
    );

  if (hata)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-xl">{hata}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-10">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold mb-10 text-gray-800 text-center">
          💰 Faturalar
        </h1>

        {faturalar.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            Henüz oluşturulmuş bir fatura bulunmamaktadır.
          </p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-xl">
                <th className="py-4 px-6 text-left rounded-tl-2xl">Fatura ID</th>
                <th className="py-4 px-6 text-left">Kiralama ID</th>
                <th className="py-4 px-6 text-left">Tutar (₺)</th>
                <th className="py-4 px-6 text-left">Fatura Tarihi</th>
                <th className="py-4 px-6 text-left rounded-tr-2xl">
                  Detaylar
                </th>
              </tr>
            </thead>
            <tbody>
              {faturalar.map((fatura, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {fatura.faturaId || fatura.FaturaId}
                  </td>
                  <td className="py-4 px-6">
                    {fatura.kiralamaId || fatura.KiralamaId}
                  </td>
                  <td className="py-4 px-6 text-green-700 font-semibold">
                    {Number(fatura.tutar || fatura.Tutar).toFixed(2)} ₺
                  </td>
                  <td className="py-4 px-6">
                    {fatura.faturaTarihi || fatura.FaturaTarihi
                      ? new Date(
                          fatura.faturaTarihi || fatura.FaturaTarihi
                        ).toLocaleString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
                      onClick={() =>
                        alert(
                          `📜 Fatura Detayı:\n\nFatura ID: ${
                            fatura.FaturaId || fatura.faturaId
                          }\nKiralama ID: ${
                            fatura.KiralamaId || fatura.kiralamaId
                          }\nTutar: ${Number(
                            fatura.Tutar || fatura.tutar
                          ).toFixed(2)} ₺\nTarih: ${new Date(
                            fatura.FaturaTarihi || fatura.faturaTarihi
                          ).toLocaleString("tr-TR")}`
                        )
                      }
                    >
                      Görüntüle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
