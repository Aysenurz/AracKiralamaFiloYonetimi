import { useLocation, useNavigate } from "react-router-dom";

export default function FaturaSonuc() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { fatura, kiralama } = state || {};

  if (!fatura || !kiralama) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
        <p className="text-3xl font-semibold mb-6 text-gray-700">
          🧾 Fatura bulunamadı
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  // ✅ Fatura Bilgileri
  const faturaId = fatura.faturaId || fatura.FaturaId;
  const kiralamaId = fatura.kiralamaId || fatura.KiralamaId;
  const tutar = fatura.tutar || fatura.Tutar;
 const rawFaturaTarihi =
  fatura?.faturaTarihi || fatura?.FaturaTarihi;

const faturaTarihi = rawFaturaTarihi
  ? new Date(rawFaturaTarihi).toLocaleString("tr-TR")
  : "-";

  // ✅ Tarihleri Türkiye saatine sabitleyen fonksiyon
  const formatLocalDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    // UTC farkını düzelt
    const yerel = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return yerel.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ✅ Araç Bilgileri
  const aracMarka = kiralama.marka || kiralama.Marka || "-";
  const aracModel = kiralama.model || kiralama.Model || "-";
  const aracYil = kiralama.yil || kiralama.Yil || "-";
  const aracSegment = kiralama.segment || kiralama.Segment || "-";
  const yakit = kiralama.yakitTipi || kiralama.YakitTipi || "-";
  const vites = kiralama.vitesTipi || kiralama.VitesTipi || "-";
  const gunlukUcret = kiralama.gunlukUcret || kiralama.GunlukUcret || "-";
  const gunSayisi = kiralama.gunSayisi || kiralama.GunSayisi || "-";

  // ✅ Tarihleri formatla (doğru şekilde)
  const alis = formatLocalDate(kiralama.alisTarihi);
  const donus = formatLocalDate(kiralama.tahminiTeslimTarihi);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-8 py-16">
      <div className="bg-white shadow-2xl rounded-3xl p-12 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700 flex items-center justify-center gap-3">
          <span>✅</span> Ödeme Başarılı!
        </h1>

        {/* 🧾 Fatura Bilgileri */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
            🧾 Fatura Bilgileri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-lg text-gray-700">
            <p><strong>Fatura ID:</strong> {faturaId}</p>
            <p><strong>Kiralama ID:</strong> {kiralamaId}</p>
            <p><strong>Fatura Tarihi:</strong> {faturaTarihi}</p>
            <p>
              <strong>Tutar:</strong>{" "}
              <span className="text-green-600 font-bold">{tutar} TL</span>
            </p>
          </div>
        </div>

        {/* 🚘 Araç Bilgileri */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
            🚘 Araç Bilgileri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-lg text-gray-700">
            <p><strong>Marka:</strong> {aracMarka}</p>
            <p><strong>Model:</strong> {aracModel}</p>
            <p><strong>Yıl:</strong> {aracYil}</p>
            <p><strong>Segment:</strong> {aracSegment}</p>
            <p><strong>Yakıt Tipi:</strong> {yakit}</p>
            <p><strong>Vites:</strong> {vites}</p>
            <p><strong>Günlük Ücret:</strong> {gunlukUcret} ₺</p>
            <p><strong>Toplam Gün:</strong> {gunSayisi}</p>
          </div>
        </div>

        {/* 📅 Kiralama Tarihleri */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
            📅 Kiralama Tarihleri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-lg text-gray-700">
            <p><strong>Alış Tarihi:</strong> {alis}</p>
            <p><strong>Teslim Tarihi:</strong> {donus}</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md transition"
          >
            Ana Sayfaya Dön
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold shadow-md transition"
          >
            🖨️ Yazdır
          </button>
        </div>
      </div>
    </div>
  );
}
