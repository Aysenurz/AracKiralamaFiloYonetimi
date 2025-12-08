import React from "react";

export default function Yardim() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ===== HERO / BAŞLIK ===== */}
        <div className="text-center mb-28">
          <span className="inline-block mb-6 px-5 py-2 rounded-full 
                           bg-blue-50 text-blue-600 text-base font-medium">
            Destek & Bilgilendirme
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
            Yardım ve Destek Merkezi
          </h1>

          <p className="mt-8 text-gray-600 max-w-3xl mx-auto 
                        text-xl md:text-2xl leading-relaxed">
            FiloRent araç kiralama süreciniz boyunca ihtiyaç duyabileceğiniz
            tüm bilgilere ve destek kanallarına buradan kolayca ulaşabilirsiniz.
          </p>
        </div>

        {/* ===== YARDIM KARTLARI ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-36">
          {[
            {
              title: "Kiralama Koşulları",
              desc: "Yaş, ehliyet ve sözleşme şartları hakkında detaylı bilgiler",
            },
            {
              title: "Sıkça Sorulan Sorular",
              desc: "Müşterilerimizin en çok merak ettiği konular",
            },
            {
              title: "Yardım Merkezi",
              desc: "Rezervasyon, ödeme ve teslim süreçleri",
            },
            {
              title: "İletişim Bilgileri",
              desc: "Destek ekibimize ait resmi iletişim kanalları",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-3xl p-8 
                         transition transform hover:-translate-y-1
                         hover:border-blue-500 hover:shadow-xl"
            >
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-6 h-1.5 w-12 bg-blue-500 rounded-full 
                              opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </section>

        {/* ===== SSS ===== */}
        <section className="max-w-4xl mx-auto mb-36">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-14 text-center">
            Sıkça Sorulan Sorular
          </h2>

          {[
            [
              "Araç kiralamak için minimum yaş kaçtır?",
              "Minimum sürücü yaşı 21’dir ve ehliyet yaşı en az 2 yıl olmalıdır.",
            ],
            [
              "Kiralama süresi minimum kaç gündür?",
              "Minimum kiralama süresi 1 gündür.",
            ],
            [
              "Kredi kartı kullanımı zorunlu mudur?",
              "Depozito işlemleri için kredi kartı gereklidir.",
            ],
            [
              "Rezervasyonu iptal edebilir miyim?",
              "Teslim tarihinden 24 saat öncesine kadar ücretsiz iptal edebilirsiniz.",
            ],
          ].map(([soru, cevap], i) => (
            <div
              key={i}
              className="group border-b border-gray-200 py-8 px-5 
                         hover:bg-gray-50 transition rounded-xl"
            >
              <p className="font-medium text-gray-900 text-lg md:text-xl mb-2">
                {soru}
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {cevap}
              </p>
            </div>
          ))}
        </section>

        {/* ===== İLETİŞİM ===== */}
        <section className="bg-white border border-gray-200 py-24 px-6 rounded-3xl shadow-sm">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              İletişim Bilgileri
            </h2>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Destek ekibimiz, kiralama öncesi ve sonrası tüm sorularınız için
              size yardımcı olmaktan memnuniyet duyar.
            </p>

            <div className="pt-8 space-y-4 text-gray-800 text-lg md:text-xl">
              <p>
                <span className="font-medium text-gray-900">Adres:</span>{" "}
                 Sahabiye Mahallesi, Sivas Caddesi, No:12, Kocasinan / Kayseri, Türkiye
              </p>
              <p>
                <span className="font-medium text-gray-900">Telefon:</span>{" "}
                0850 000 00 00
              </p>
              <p>
                <span className="font-medium text-gray-900">E-posta:</span>{" "}
                destek@filorent.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}