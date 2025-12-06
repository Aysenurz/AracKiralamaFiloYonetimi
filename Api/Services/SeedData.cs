using System;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Bogus;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public static class SeedData
    {
        public static async Task<object> SeedAsync(AppDbContext db)
        {
            // Zaten araç varsa, tekrar doldurma
            if (await db.Araclars.AnyAsync())
            {
                return new { Message = "Veritabanı zaten dolu, seed atlanıyor." };
            }

            // ---------- 1) Şubeler ----------
            const int subeCount = 15;
            var subeFaker = new Faker<Subeler>("tr")
                .RuleFor(s => s.SubeAdi, (f, s) => $"{f.Address.City()} Şubesi")
                .RuleFor(s => s.Il,      (f, s) => f.Address.City())
                .RuleFor(s => s.Ilce,    (f, s) => f.Address.CitySuffix())
                .RuleFor(s => s.Adres,   (f, s) => f.Address.FullAddress());

            var subeList = subeFaker.Generate(subeCount);
            db.Subelers.AddRange(subeList);
            await db.SaveChangesAsync();

            // ---------- 2) Araç Modelleri ----------
            const int modelCount = 40;
            var segmentler = new[] { "Sedan", "SUV", "Hatchback", "Pick-up" };
            var yakitlar   = new[] { "Benzin", "Dizel", "Elektrik", "Hybrid" };
            var vitesler   = new[] { "Manuel", "Otomatik" };

            var modelFaker = new Faker<AracModelBilgileri>("tr")
                .RuleFor(m => m.Marka,     (f, m) => f.Vehicle.Manufacturer())
                .RuleFor(m => m.Model,     (f, m) => f.Vehicle.Model())
                .RuleFor(m => m.Yil,       (f, m) => f.Random.Int(2010, 2024))
                .RuleFor(m => m.Segment,   (f, m) => f.PickRandom(segmentler))
                .RuleFor(m => m.YakitTipi, (f, m) => f.PickRandom(yakitlar))
                .RuleFor(m => m.VitesTipi, (f, m) => f.PickRandom(vitesler));

            var modelList = modelFaker.Generate(modelCount);
            db.AracModelBilgileris.AddRange(modelList);
            await db.SaveChangesAsync();

            // ---------- 3) Müşteriler ----------
            const int musteriCount = 10000;
            var musteriFaker = new Faker<Musteriler>("tr")
                .RuleFor(m => m.AdSoyad,   (f, m) => f.Name.FullName())
                .RuleFor(m => m.TcNo,      (f, m) => f.Random.ReplaceNumbers("###########"))
                .RuleFor(m => m.Telefon,   (f, m) => f.Phone.PhoneNumber("+90##########"))
                .RuleFor(m => m.Email,     (f, m) => f.Internet.Email(m.AdSoyad))
                .RuleFor(m => m.Adres,     (f, m) => f.Address.FullAddress())
                .RuleFor(m => m.EhliyetNo, (f, m) => f.Random.Replace("TR########"));
            // EhliyetTarihi'ni set etmiyoruz, default kalsın (nullable ise sorun yok)

            var musteriList = musteriFaker.Generate(musteriCount);
            db.Musterilers.AddRange(musteriList);
            await db.SaveChangesAsync();

            // ---------- 4) Araçlar ----------
            const int aracCount = 5000;
            var renkler  = new[] { "Beyaz", "Siyah", "Gri", "Kırmızı", "Mavi" };
            var durumlar = new[] { "Müsait", "Kirada", "Serviste" };

            var modelIds = modelList.Select(m => m.ModelId).ToList();
            var subeIds  = subeList.Select(s => s.SubeId).ToList();

            var aracFaker = new Faker<Araclar>("tr")
                .RuleFor(a => a.ModelId,      (f, a) => f.PickRandom(modelIds))
                .RuleFor(a => a.Plaka,        (f, a) => $"34 {f.Random.AlphaNumeric(3).ToUpper()} {f.Random.Number(10, 99)}")
                .RuleFor(a => a.SasiNo,       (f, a) => f.Vehicle.Vin())
                .RuleFor(a => a.Km,           (f, a) => f.Random.Int(0, 250_000))
                .RuleFor(a => a.Renk,         (f, a) => f.PickRandom(renkler))
                .RuleFor(a => a.Durum,        (f, a) => f.PickRandom(durumlar))
                .RuleFor(a => a.AlisTarihi,   (f, a) => f.Date.Past(5))
                .RuleFor(a => a.GuncelSubeId, (f, a) => f.PickRandom(subeIds));

            var aracList = aracFaker.Generate(aracCount);
            db.Araclars.AddRange(aracList);
            await db.SaveChangesAsync();

            // ---------- 5) Bakımlar ----------
            const int bakimCount = 20000;
            var bakimTipleri = new[] { "Periyodik", "Yağ Değişimi", "Lastik", "Fren", "Genel Bakım" };
            var aracIds = aracList.Select(a => a.AracId).ToList();

            var bakimFaker = new Faker<Bakimlar>("tr")
                .RuleFor(b => b.AracId,      (f, b) => f.PickRandom(aracIds))
                .RuleFor(b => b.BakimTarihi, (f, b) => f.Date.Past(3))
                .RuleFor(b => b.BakimTipi,   (f, b) => f.PickRandom(bakimTipleri))
                .RuleFor(b => b.Aciklama,    (f, b) => f.Lorem.Sentence())
                .RuleFor(b => b.Tutar,       (f, b) => f.Random.Decimal(500, 15000));

            var bakimList = bakimFaker.Generate(bakimCount);
            db.Bakimlars.AddRange(bakimList);
            await db.SaveChangesAsync();

            // ---------- 6) Kiralamalar ----------
            const int kiralamaCount = 30000;
            var musteriIds = musteriList.Select(m => m.MusteriId).ToList();

            var kiralamaFaker = new Faker<Kiralamalar>("tr")
                .RuleFor(k => k.MusteriId,  (f, k) => f.PickRandom(musteriIds))
                .RuleFor(k => k.AracId,     (f, k) => f.PickRandom(aracIds))
                .RuleFor(k => k.AlisSubeId, (f, k) => f.PickRandom(subeIds))
                .RuleFor(k => k.TeslimSubeId,(f, k) => f.PickRandom(subeIds))
                .RuleFor(k => k.AlisTarihi, (f, k) => f.Date.Past(2))
                .RuleFor(k => k.TahminiTeslimTarihi, (f, k) => f.Date.Past(1))
                .RuleFor(k => k.GercekTeslimTarihi, (f, k) =>
                {
                    // %70 tamamlandı, %30 devam ediyor
                    var done = f.Random.Int(0, 99) < 70;
                    if (!done)
                        return (DateTime?)null;

                    return f.Date.Recent(30);
                })
                .RuleFor(k => k.GunlukUcret, (f, k) => f.Random.Decimal(600, 2500))
                .RuleFor(k => k.Durum,       (f, k) => k.GercekTeslimTarihi == null ? "Devam Ediyor" : "Tamamlandı");

            var kiralamaList = kiralamaFaker.Generate(kiralamaCount);
            db.Kiralamalars.AddRange(kiralamaList);
            await db.SaveChangesAsync();

            // ---------- 7) Faturalar ----------
            var kiralamaIds = kiralamaList.Select(k => k.KiralamaId).ToList();

            var faturaFaker = new Faker<Faturalar>("tr")
                .RuleFor(fa => fa.KiralamaId,   (f, fa) => f.PickRandom(kiralamaIds))
                .RuleFor(fa => fa.Tutar,        (f, fa) => f.Random.Decimal(500, 20000))
                .RuleFor(fa => fa.FaturaTarihi, (f, fa) => f.Date.Past(1));

            var faturaList = faturaFaker.Generate(kiralamaCount);
            db.Faturalars.AddRange(faturaList);
            await db.SaveChangesAsync();

            // ---------- 8) Kullanıcılar ----------
            const int kullaniciCount = 30;
            var roller = new[] { "Admin", "Personel" };

            var kullaniciFaker = new Faker<Kullanicilar>("tr")
                .RuleFor(k => k.AdSoyad,   (f, k) => f.Name.FullName())
                .RuleFor(k => k.Email,     (f, k) => f.Internet.Email(k.AdSoyad))
                .RuleFor(k => k.SifreHash, (f, k) => "123456") // demo şifre
                .RuleFor(k => k.Rol,       (f, k) => f.PickRandom(roller));

            var kullaniciList = kullaniciFaker.Generate(kullaniciCount);
            db.Kullanicilars.AddRange(kullaniciList);
            await db.SaveChangesAsync();

            return new { Message = "Seed tamamlandı ve veriler eklendi." };
        }
    }
}
