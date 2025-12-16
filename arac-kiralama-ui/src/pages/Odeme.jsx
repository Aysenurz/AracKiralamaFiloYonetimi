import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Odeme() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    marka,
    model,
    resim,
    toplam: orijinalTutar = 0,
    segment,
    gunSayisi = 1,
    alis,
    donus,
    aracId,
    subeId
  } = state || {};

  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const [kuponKodu, setKuponKodu] = useState("");
  const [uygulananKupon, setUygulananKupon] = useState(null);
  const [indirim, setIndirim] = useState(0);
  const [yeniToplam, setYeniToplam] = useState(orijinalTutar);

  const kampanyalar = [
    {
      kod: "SUV20",
      segment: "SUV",
      tip: "yuzde",
      deger: 20,
      baslik: "Yaz İndirimi – SUV’larda %20",
      aciklama: "Yaz aylarına özel SUV kiralamalarında %20 indirim.",
    },
    {
      kod: "SEDAN1000",
      segment: "Sedan",
      tip: "tutar",
      deger: 1000,
      baslik: "Hafta Sonu Fırsatı – Sedan 1000 TL İndirim",
      aciklama: "Cuma–Pazar arası kiralamalarda 1000 TL indirim.",
    },
    {
      kod: "ERKEN15",
      segment: "Hepsi",
      tip: "yuzde",
      deger: 15,
      baslik: "Erken Rezervasyon – %15 İndirim",
      aciklama: "3 günden uzun kiralamalarda %15 erken rezervasyon avantajı.",
    },
  ];

  useEffect(() => {
    const uygun = kampanyalar.find((k) =>
      gunSayisi > 3
        ? k.kod === "ERKEN15"
        : segment?.toLowerCase() === k.segment.toLowerCase()
    );
    if (uygun) setKuponKodu(uygun.kod);
  }, [segment, gunSayisi]);

  const uygulaKupon = (kod) => {
    const kampanya = kampanyalar.find((k) => k.kod === kod);
    if (!kampanya) return alert("❌ Geçersiz kupon kodu.");

    if (
      kampanya.segment.toLowerCase() !== "hepsi" &&
      kampanya.segment.toLowerCase() !== segment?.toLowerCase()
    ) {
      return alert(`❌ Bu kupon yalnızca ${kampanya.segment} segmentinde geçerli.`);
    }

    const indirimTutari =
      kampanya.tip === "yuzde"
        ? (orijinalTutar * kampanya.deger) / 100
        : kampanya.deger;

    setIndirim(indirimTutari);
    setYeniToplam(orijinalTutar - indirimTutari);
    setUygulananKupon(kampanya);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "expiry") {
      newValue = value.replace(/[^\d]/g, "");
      if (newValue.length > 2)
        newValue = newValue.slice(0, 2) + "/" + newValue.slice(2, 4);
    }

    setCardInfo((prev) => ({ ...prev, [name]: newValue }));
  };

  const formatDate = (val) => {
    if (!val) return new Date().toISOString();
    const d = new Date(val);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  };

  console.log("🏢 SUBE ID:", subeId);

  // ✅ ASIL HATA BURADAYDI → ŞİMDİ DÜZGÜN
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const kullaniciData = localStorage.getItem("kullanici");
    if (!kullaniciData) {
      alert("Lütfen giriş yapınız");
      return;
    }

    const kullanici = JSON.parse(kullaniciData);
    const musteriId = kullanici.musteriId || kullanici.id;

    // 1️⃣ Kiralama oluştur
    const kiralama = {
      MusteriId: Number(musteriId),
      AracId: Number(aracId),
      AlisSubeId: Number(subeId),
      TeslimSubeId: Number(subeId),
      AlisTarihi: formatDate(alis),
      TahminiTeslimTarihi: formatDate(donus),
      GunlukUcret: Number((yeniToplam / gunSayisi).toFixed(2)),
    };

    const kiralamaRes = await api.post("/Kiralamalar", kiralama);
    const yeniKiralama = kiralamaRes.data;

    // 2️⃣ Fatura oluştur
const faturaRes = await api.post("/Faturalar", {
  KiralamaId: yeniKiralama.kiralamaId || yeniKiralama.KiralamaId,
  Tutar: yeniToplam,
});

const yeniFaturaDuzenli = faturaRes.data; // 🔥 BU SATIR EKSİKTİ


    // 3️⃣ STATE’LER
    const kiralamaState = {
      ...yeniKiralama,
      marka,
      model,
      yil: new Date(alis).getFullYear(),
      segment,
      yakitTipi: segment === "SUV" ? "Dizel" : "Benzin",
      vitesTipi: "Otomatik",
      gunlukUcret: Number((yeniToplam / gunSayisi).toFixed(2)),
      gunSayisi,
      alisTarihi: formatDate(alis),
      tahminiTeslimTarihi: formatDate(donus),
    };

   const faturaState = {
  faturaId:
    yeniFaturaDuzenli.faturaId ??
    yeniFaturaDuzenli.FaturaId,

  kiralamaId:
    yeniFaturaDuzenli.kiralamaId ??
    yeniFaturaDuzenli.KiralamaId ??
    yeniKiralama.kiralamaId ??
    yeniKiralama.KiralamaId,

  tutar:
    yeniFaturaDuzenli.tutar ??
    yeniFaturaDuzenli.Tutar ??
    yeniToplam,

  faturaTarihi:
    yeniFaturaDuzenli.faturaTarihi ??
    yeniFaturaDuzenli.FaturaTarihi ??
    new Date().toISOString(),
};


    // 4️⃣ Yönlendir
    navigate("/fatura-sonuc", {
      state: {
        kiralama: kiralamaState,
        fatura: faturaState,
      },
    });

  } catch (err) {
    console.error("❌ Ödeme hatası:", err);
    alert("Ödeme sırasında hata oluştu");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-8 py-16">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[90rem] p-16">
        <h1 className="text-5xl font-bold text-center mb-14 text-gray-800 tracking-tight">
          💳 Ödeme Sayfası
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {/* Sol Kısım */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 shadow-sm flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
            <div className="flex items-center gap-8">
              <img
                src={resim}
                alt={`${marka} ${model}`}
                className="w-60 h-40 object-cover rounded-2xl shadow-md"
              />
              <div>
                <p className="font-semibold text-3xl text-gray-800">
                  {marka} {model}
                </p>
                <p className="text-gray-600 text-xl mt-2">
                  Segment: <b>{segment || "Belirtilmemiş"}</b>
                </p>
                <p className="text-gray-600 text-xl">
                  Süre: <b>{gunSayisi}</b> gün
                </p>
                <p className="text-gray-600 text-2xl mt-2">
                  Araç Ücreti:{" "}
                  <span className="text-blue-600 font-bold">
                    {orijinalTutar} TL
                  </span>
                </p>
                {uygulananKupon && (
                  <p className="mt-2 text-green-600 text-xl font-semibold">
                    {uygulananKupon.kod} kuponu uygulandı (−{indirim} TL)
                  </p>
                )}
                <p className="text-gray-800 text-2xl font-bold mt-2">
                  Genel Toplam:{" "}
                  <span className="text-blue-700">
                    {yeniToplam.toFixed(2)} TL
                  </span>
                </p>
              </div>
            </div>

            {/* Kampanyalar */}
            <div>
              <h3 className="font-semibold text-2xl text-gray-700 mb-4">
                Kampanyalar
              </h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {kampanyalar.map((k) => (
                  <div
                    key={k.kod}
                    className={`min-w-[280px] bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition transform hover:scale-105 ${
                      k.kod === kuponKodu
                        ? "border-green-500 ring-2 ring-green-300"
                        : "border-gray-200"
                    }`}
                    onClick={() => setKuponKodu(k.kod)}
                  >
                    <h4 className="text-lg font-semibold text-blue-600 mb-2">
                      {k.baslik}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{k.aciklama}</p>
                    <p className="text-sm font-bold text-green-600">
                      Kupon Kodu: {k.kod}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <input
                  type="text"
                  value={kuponKodu}
                  onChange={(e) => setKuponKodu(e.target.value.toUpperCase())}
                  placeholder="Kupon kodu giriniz"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => uygulaKupon(kuponKodu)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Uygula
                </button>
              </div>
            </div>
          </div>

          {/* Sağ Kısım */}
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
          </form>
        </div>

        <style>{`
          .input {
            @apply w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
          }
        `}</style>
      </div>
    </div>
  );
}
