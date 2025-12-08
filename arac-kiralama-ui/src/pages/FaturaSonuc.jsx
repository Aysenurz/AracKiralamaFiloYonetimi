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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-8 py-16">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
          ✅ Ödeme Başarılı!
        </h1>

        <div className="space-y-6 text-lg text-gray-700">
          <p>
            <strong>Fatura ID:</strong> {fatura.faturaId || fatura.FaturaID}
          </p>
          <p>
            <strong>Kiralama ID:</strong> {fatura.kiralamaId || fatura.KiralamaID}
          </p>
          <p>
            <strong>Fatura Tarihi:</strong>{" "}
            {new Date(fatura.faturaTarihi || fatura.FaturaTarihi).toLocaleString(
              "tr-TR"
            )}
          </p>
          <p>
            <strong>Tutar:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {fatura.tutar || fatura.Tutar} TL
            </span>
          </p>
        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-semibold mb-4">Araç Bilgileri</h2>
        <p>
          <strong>Araç:</strong> {kiralama.marka || "-"} {kiralama.model || "-"}
        </p>
        <p>
          <strong>Alış Tarihi:</strong>{" "}
          {new Date(kiralama.alisTarihi || kiralama.AlisTarihi).toLocaleDateString(
            "tr-TR"
          )}
        </p>
        <p>
          <strong>Teslim Tarihi:</strong>{" "}
          {new Date(
            kiralama.tahminiTeslimTarihi || kiralama.TahminiTeslimTarihi
          ).toLocaleDateString("tr-TR")}
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
          >
            Ana Sayfaya Dön
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-xl text-lg font-semibold"
          >
            Yazdır 🖨️
          </button>
        </div>
      </div>
    </div>
  );
}
