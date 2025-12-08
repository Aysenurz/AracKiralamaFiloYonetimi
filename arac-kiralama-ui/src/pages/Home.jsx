import React from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#0E1A2B] text-white">

      {/* ABSTRACT BACKGROUND SHAPES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-700 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-10 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 text-center">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">Uygun Fiyatlarla Araç Kiralayın</h1>
        <p className="text-gray-300 mb-10 text-lg">
          FiloRent ile hızlı, kolay ve güvenilir araç kiralama.
        </p>

        {/* ⭐ SEARCH BAR */}
        <div className="flex justify-center">
          <SearchBar />
        </div>

  {/* --- SENİN MEVCUT YENİDEN TANIMLAMA VE DEVAMI --- */}
        <div className="bg-white text-black mt-20 px-8 py-20 rounded-2xl shadow-lg max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            FiloRent ile Araç Kiralama Deneyimini Yeniden Tanımlayın
          </h2>
          <p className="text-gray-900 leading-relaxed text-lg text-center">
            FiloRent; hızlı, güvenilir ve esnek araç kiralama çözümleri sunan modern bir araç kiralama platformudur.
          </p>
          <p className="mt-4 text-gray-900 leading-relaxed text-lg text-center">
            Türkiye’nin birçok noktasında bulunan şubelerimiz sayesinde dilediğiniz aracı kolayca kiralayabilir,
            teslim ve iade işlemlerinizi zahmetsizce tamamlayabilirsiniz. Temiz, bakımlı ve güvenli araçlarımızla
            keyifli yolculuklar sizi bekliyor.
          </p>
        </div>

     </div>
 {/* --- NEDEN FİLORENT --- */}
<section className="mt-24 text-white">
  <h2 className="text-3xl font-bold mb-10 text-center">
    Neden <span className="text-blue-400">FiloRent</span> Araç Kiralama?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
    {[
      {
        title: "Satın Alma Maliyeti Yok",
        desc: "Peşinat, finansman ya da amortisman yok. Bakım, lastik, MTV gibi giderlerle uğraşmadan aracını kullan.",
        icon: "🚗",
      },
      {
        title: "İptal Cezası Yok",
        desc: "Aboneliğini istediğin zaman iptal et, hiçbir ek ücret ödeme. 3 ay içinde yeniden abone ol, avantajlarını koru.",
        icon: "❌",
      },
      {
        title: "Tamamen Özelleştirilebilir",
        desc: "Sürüş alışkanlıklarına uygun planı kendin belirle. Ek güvence ve ekipman seçenekleriyle kiralamanı kişiselleştir.",
        icon: "⚙️",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white/10 hover:bg-white/20 transition p-5 rounded-xl shadow text-center border border-white/10"
      >
        <div className="text-3xl mb-3">{item.icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-blue-300">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* --- SİSTEM NASIL ÇALIŞIR --- */}
<section className="py-16 mt-20 text-white">
  <h2 className="text-3xl font-bold text-center mb-12">
    Sistem Nasıl Çalışır?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto px-6">
    {[
      {
        title: "Aboneliğini Başlat",
        desc: "Üye ol, aracını seç, teslim tarihini belirle ve ödemeni yaparak kiralamayı başlat.",
        icon: "📝",
      },
      {
        title: "Aracını Al",
        desc: "Seçtiğin FiloRent şubesinden aracını teslim al, yola çık!",
        icon: "🚘",
      },
      {
        title: "İhtiyacına Göre Güncelle",
        desc: "Aboneliğini kolayca güncelle. Aracını değiştir veya ek paketler ekle.",
        icon: "🔁",
      },
      {
        title: "İstediğin Zaman İptal Et",
        desc: "Aboneliğini istediğin zaman sonlandır, hiçbir iptal ücreti ödeme.",
        icon: "🕒",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white/10 hover:bg-white/20 transition p-5 rounded-xl shadow text-center border border-white/10"
      >
        <div className="text-3xl mb-3">{item.icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-blue-300">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      
        {/* --- AVANTAJLAR --- */}
<div className="max-w-6xl mx-auto mt-20 px-6">
  
  <h2 className="text-4xl font-bold text-white mb-10 text-center">FiloRent’in Sunduğu Avantajlar</h2>

  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      🚗 <span className="font-semibold text-xl">Geniş Araç Filosu</span>
      <p className="opacity-80 mt-2 text-base">Ekonomik, orta ve üst segment araç seçenekleri.</p>
    </li>

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      ⚡ <span className="font-semibold text-xl">Hızlı Rezervasyon</span>
      <p className="opacity-80 mt-2 text-base">Sadece birkaç adımda araç kiralayın.</p>
    </li>

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      🧼 <span className="font-semibold text-xl">Bakımlı & Temiz Araçlar</span>
      <p className="opacity-80 mt-2 text-base">Periyodik bakımları yapılmış güvenli araçlar.</p>
    </li>

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      🎯 <span className="font-semibold text-xl">Esnek Kiralama</span>
      <p className="opacity-80 mt-2 text-base">Günlük, haftalık ve aylık seçenekler.</p>
    </li>

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      📍 <span className="font-semibold text-xl">Yaygın Şube Ağı</span>
      <p className="opacity-80 mt-2 text-base">Türkiye’nin birçok noktasında teslim.</p>
    </li>

    <li className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow border border-white/10 text-lg">
      💳 <span className="font-semibold text-xl">Güvenli Ödeme</span>
      <p className="opacity-80 mt-2 text-base">Modern ve şeffaf ödeme süreci.</p>
    </li>

  </ul>
</div>
{/* ARAÇ SEGMENTLERİ */}
<div className="text-center mt-20">
  <h2 className="text-3xl font-bold text-white mb-10">
    Araç Segmentlerimizi Keşfedin
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

    <div className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-6 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-2">
        Ekonomik Araçlar
      </h3>
      <p className="text-gray-300 text-sm">
        Uygun fiyatlı, yakıt tasarruflu modeller.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-6 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-2">
        SUV Araçlar
      </h3>
      <p className="text-gray-300 text-sm">
        Geniş iç hacim ve konforlu sürüş.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-6 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-2">
        Lüks Araçlar
      </h3>
      <p className="text-gray-300 text-sm">
        Premium deneyim için üst segment.
      </p>
    </div>

  </div>
</div>


{/* --- FİLORENT REHBERİ (GRID DIŞINDA, DOĞRU KONUM) --- */}
<div className="w-full flex justify-center mt-32 px-6">
  <div className="max-w-5xl w-full text-left text-white">

    <h2 className="text-5xl font-bold mb-14">
      FiloRent Rent A Car Rehberi
    </h2>

    <h3 className="text-2xl font-semibold mb-3">Araç Teslim Alma & Etme</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      FiloRent ile aracınızı online olarak veya şubelerimizi ziyaret ederek kolayca kiralayabilirsiniz.
      Rezervasyon sonrası seçtiğiniz lokasyondan aracınızı hızlıca teslim alabilirsiniz.
    </p>

    <h3 className="text-2xl font-semibold mb-3">Araç Kiralama Şartları</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      Ekonomik araçlar için 21, orta segment için 25, üst segment için 27 ve lüks segment için 30 yaş sınırı bulunur.
      Kiralama için kredi kartı zorunludur.
    </p>

    <h3 className="text-2xl font-semibold mb-3">Sürücü Belgesi Gereklilikleri</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      Ekonomik grup için minimum 2 yıl, orta grup için 3 yıl, lüks grup içinse 5 yıllık ehliyet gerekmektedir.
    </p>

    <h3 className="text-2xl font-semibold mb-3">Ödeme Seçenekleri</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      Ön ödemeli ve şubede ödeme olarak iki farklı yöntem sunulur.
    </p>

    <h3 className="text-2xl font-semibold mb-3">Sigorta Bilgileri</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      Tüm kiralamalarda temel güvence dahildir. İsteğe bağlı ek sigorta paketleri sunulur.
    </p>

    <h3 className="text-2xl font-semibold mb-3">İade ve İptal Politikası</h3>
    <p className="mb-10 text-lg text-gray-300 leading-relaxed">
      Ön ödemeli rezervasyonlarda araç alımından 24 saat öncesine kadar iptal yapılabilir.
    </p>

  </div>
</div>


  </div>
  );
}
