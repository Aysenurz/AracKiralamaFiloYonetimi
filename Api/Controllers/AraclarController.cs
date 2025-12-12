using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Models.Dto;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AraclarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AraclarController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ NAVBAR -> ARAÇLAR (MODEL KATALOĞU)
        [HttpGet("GetAllModels")]
        public async Task<IActionResult> GetAllModels()
        {
            var liste = await _context.AracModelBilgileris
                .Select(m => new AracDto
                {
                    ModelId = m.ModelId,
                    Marka = m.Marka,
                    Model = m.Model,
                    Segment = m.Segment,
                    YakitTipi = m.YakitTipi,
                    VitesTipi = m.VitesTipi,
                    GunlukFiyat = m.GunlukFiyat,
                    ResimUrl = m.ResimUrl
                })
                .ToListAsync();

            return Ok(liste);
        }

      // ✅ TARİH + ŞUBE → UYGUN ARAÇLAR
[HttpGet("GetByFilter")]
public async Task<IActionResult> GetByFilter(int subeId, string alis, string donus)
{
    if (!DateTime.TryParse(alis, out DateTime alisTarihi))
        return BadRequest("Alış tarihi hatalı");

    if (!DateTime.TryParse(donus, out DateTime donusTarihi))
        return BadRequest("Dönüş tarihi hatalı");

    // 🔹 Seçilen şubedeki araçları getir ama çakışan kiralamaları hariç tut
    var uygunAraclar = await _context.Araclars
        .Where(a => a.GuncelSubeId == subeId) // Sadece o şubedeki araçlar
        .Where(a => !_context.Kiralamalars.Any(k =>
            k.AracId == a.AracId &&
            // Tarih aralığı çakışıyorsa hariç tut
            alisTarihi < k.TahminiTeslimTarihi &&
            donusTarihi > k.AlisTarihi &&
            k.Durum == "Devam Ediyor" // Sadece aktif kiralamaları dikkate al
        ))
        .Join(
            _context.AracModelBilgileris,
            a => a.ModelId,
            m => m.ModelId,
            (a, m) => new AracDto
            {
                AracId = a.AracId,
                ModelId = m.ModelId,
                Marka = m.Marka,
                Model = m.Model,
                Segment = m.Segment,
                YakitTipi = m.YakitTipi,
                VitesTipi = m.VitesTipi,
                GunlukFiyat = m.GunlukFiyat,
                ResimUrl = m.ResimUrl
            }
        )
        // Aynı modelden sadece birini göster (liste sade kalır)
        .GroupBy(x => x.ModelId)
        .Select(g => g.First())
        .ToListAsync();

    return Ok(uygunAraclar);
}


        // ✅ MODEL → 1 ADET FİZİKSEL ARAÇ (DETAYA GİTMEK İÇİN)
        [HttpGet("GetOneByModel/{modelId}")]
        public async Task<IActionResult> GetOneByModel(int modelId)
        {
            var arac = await _context.Araclars
                .Where(a => a.ModelId == modelId)
                .Join(
                    _context.AracModelBilgileris,
                    a => a.ModelId,
                    m => m.ModelId,
                    (a, m) => new
                    {
                        a.AracId,
                        m.ModelId,
                        m.Marka,
                        m.Model,
                        m.GunlukFiyat,
                        m.ResimUrl,
                        m.Segment,
                        m.VitesTipi,
                        m.YakitTipi,
                        m.Yil
                    }
                )
                .FirstOrDefaultAsync();

            if (arac == null) return NotFound();
            return Ok(arac);
        }

        // ✅ DETAY SAYFASI (GERÇEK ARAÇ)
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetAracDetay(int id)
        {
            var arac = await _context.Araclars
                .Where(a => a.AracId == id)
                .Join(
                    _context.AracModelBilgileris,
                    a => a.ModelId,
                    m => m.ModelId,
                    (a, m) => new
                    {
                        a.AracId,
                        a.GuncelSubeId,
                        m.Marka,
                        m.Model,
                        m.Yil,
                        m.GunlukFiyat,
                        m.ResimUrl,
                        m.Segment,
                        m.VitesTipi,
                        m.YakitTipi
                    }
                )
                .FirstOrDefaultAsync();

            if (arac == null) return NotFound();
            return Ok(arac);
        }
    }
}
