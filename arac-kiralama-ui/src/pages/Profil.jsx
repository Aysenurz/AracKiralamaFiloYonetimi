import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profil() {
  const navigate = useNavigate();
  const [faturalar, setFaturalar] = useState([]);
  const [kiralamalar, setKiralamalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kullanici, setKullanici] = useState(null);
  const [seciliFatura, setSeciliFatura] = useState(null);
  const printRef = useRef();

  // 🔹 Kullanıcıyı localStorage'dan al
  useEffect(() => {
    const veri = localStorage.getItem("kullanici");
    if (veri) {
      setKullanici(JSON.parse(veri));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔹 Faturaları getir
  useEffect(() => {
    const getirFaturalar = async () => {
      if (!kullanici) return;
      try {
        const res = await api.get("/Faturalar");
        const tumFaturalar = res.data.items || res.data;
        const benimFaturalarim = tumFaturalar.filter(
          (f) => f.kiralamaId === kullanici.id || f.KiralamaId === kullanici.id
        );
        setFaturalar(benimFaturalarim);
      } catch (err) {
        console.error("❌ Faturalar alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    getirFaturalar();
  }, [kullanici]);

  // 🔹 Kiralamaları getir
  useEffect(() => {
  if (!kullanici) return;

  const musteriId = kullanici.musteriId || kullanici.id;
  console.log("📦 Profil sayfasındaki müşteri ID:", musteriId);

  const getirKiralamalar = async () => {
    try {
      const res = await api.get("/Kiralamalar");

      // ⬇️ BACKEND pagination döndüğü için items kullanıyoruz
      const tumKiralamalar = res.data.items || res.data;

      // ⬇️ FRONTEND filtreleme
      const benimKiralamalarim = tumKiralamalar.filter(
        (k) => k.musteriId === musteriId
      );

      console.log("📊 Filtrelenmiş kiralamalar:", benimKiralamalarim);
      setKiralamalar(benimKiralamalarim);
    } catch (err) {
      console.error("❌ Kiralamalar alınamadı:", err);
    }
  };

  getirKiralamalar();
}, [kullanici]);


  const handleLogout = () => {
    localStorage.removeItem("kullanici");
    alert("Çıkış yapıldı!");
    navigate("/");
  };

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open("", "", "width=900,height=600");
    printWindow.document.write(`
      <html><head><title>Faturalarım - ${kullanici?.adSoyad}</title></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!kullanici)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Yükleniyor...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 pt-28">
      {/* 🔹 Kullanıcı Bilgileri */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl mb-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          👤 Hesabım
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div>
            <p><b>Ad Soyad:</b> {kullanici.adSoyad}</p>
            <p><b>T.C. Kimlik No:</b> {kullanici.tcNo}</p>
            <p><b>E-posta:</b> {kullanici.email}</p>
          </div>
          <div>
            <p><b>Telefon:</b> {kullanici.telefon}</p>
            <p><b>Adres:</b> {kullanici.adres}</p>
            <p><b>Ehliyet No:</b> {kullanici.ehliyetNo}</p>
            <p><b>Ehliyet Tarihi:</b> {kullanici.ehliyetTarihi}</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* 💰 Faturalarım */}
      <div ref={printRef} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          💰 Faturalarım
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Yükleniyor...</p>
        ) : faturalar.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Henüz oluşturulmuş bir faturanız bulunmamaktadır.
          </p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-lg">
                <th className="py-3 px-6 text-left rounded-tl-xl">Fatura ID</th>
                <th className="py-3 px-6 text-left">Kiralama ID</th>
                <th className="py-3 px-6 text-left">Tutar (₺)</th>
                <th className="py-3 px-6 text-left">Tarih</th>
                <th className="py-3 px-6 text-left rounded-tr-xl">Detay</th>
              </tr>
            </thead>
            <tbody>
              {faturalar.map((fatura) => (
                <tr key={fatura.FaturaId || fatura.faturaId} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 font-semibold text-gray-800">
                    {fatura.FaturaId || fatura.faturaId}
                  </td>
                  <td className="py-3 px-6">{fatura.KiralamaId || fatura.kiralamaId}</td>
                  <td className="py-3 px-6 text-green-600 font-semibold">
                    {Number(fatura.Tutar || fatura.tutar).toFixed(2)} ₺
                  </td>
                  <td className="py-3 px-6">
                    {new Date(fatura.FaturaTarihi || fatura.faturaTarihi).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => setSeciliFatura(fatura)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
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

     {/* 🚗 Kiralamalarım */}
<div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    🚗 Kiralamalarım
  </h2>

  {kiralamalar.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">
      Henüz bir kiralama geçmişiniz bulunmamaktadır.
    </p>
  ) : (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-600 text-white text-lg">
          <th className="border p-3">Araç</th>
          <th className="border p-3">Alış Tarihi</th>
          <th className="border p-3">Teslim Tarihi</th>
          <th className="border p-3">Durum</th>
        </tr>
      </thead>
      <tbody>
        {kiralamalar.map((k) => (
          <tr key={k.kiralamaId} className="hover:bg-gray-50">
            <td className="border p-3">
              {k.marka} {k.model} ({k.arac})
            </td>
            <td className="border p-3">
              {k.alisTarihi ? k.alisTarihi.split("T")[0] : "-"}
            </td>
            <td className="border p-3">
              {k.gercekTeslimTarihi
                ? k.gercekTeslimTarihi.split("T")[0]
                : k.tahminiTeslimTarihi
                ? k.tahminiTeslimTarihi.split("T")[0]
                : "-"}
            </td>
            <td
              className={`border p-3 font-semibold ${
                k.durum === "Kirada"
                  ? "text-yellow-600"
                  : k.durum === "Aktif"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {k.durum}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


      {/* 🖨️ Yazdır Butonu */}
      {faturalar.length > 0 && (
        <button
          onClick={handlePrint}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg transition"
        >
          🖨️ Yazdır / PDF Al
        </button>
      )}

      {/* 💎 Fatura Detayı MODAL */}
      {seciliFatura && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[450px] p-8 text-center relative">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              📄 Fatura Detayı
            </h2>
            <p className="text-lg mb-2">
              <b>Fatura ID:</b> {seciliFatura.FaturaId || seciliFatura.faturaId}
            </p>
            <p className="text-lg mb-2">
              <b>Kiralama ID:</b> {seciliFatura.KiralamaId || seciliFatura.kiralamaId}
            </p>
            <p className="text-lg mb-2">
              <b>Tutar:</b>{" "}
              <span className="text-green-600 font-semibold">
                {Number(seciliFatura.Tutar || seciliFatura.tutar).toFixed(2)} ₺
              </span>
            </p>
            <p className="text-lg mb-4">
              <b>Tarih:</b>{" "}
              {new Date(
                seciliFatura.FaturaTarihi || seciliFatura.faturaTarihi
              ).toLocaleString("tr-TR")}
            </p>

            <button
              onClick={() => setSeciliFatura(null)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
