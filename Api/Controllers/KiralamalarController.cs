using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Models.Dto;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KiralamalarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public KiralamalarController(AppDbContext context)
        {
            _context = context;
        }

        // ----------------------------------------------------------------
        // GET (Pagination)
        // ----------------------------------------------------------------
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 50)
        {
            var query = _context.Kiralamalars.AsNoTracking();

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.KiralamaId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new KiralamaDto
                {
                    KiralamaId = x.KiralamaId,
                    AracId = x.AracId,
                    MusteriId = x.MusteriId,
                    AlisSubeId = x.AlisSubeId,
                    TeslimSubeId = x.TeslimSubeId,
                    AlisTarihi = x.AlisTarihi,
                    TahminiTeslimTarihi = x.TahminiTeslimTarihi,
                    GercekTeslimTarihi = x.GercekTeslimTarihi,
                    GunlukUcret = x.GunlukUcret,
                    Durum = x.Durum
                })
                .ToListAsync();

            return Ok(new
            {
                page,
                pageSize,
                totalCount,
                totalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                items
            });
        }

        // ----------------------------------------------------------------
        // GET /api/Kiralamalar/{id}
        // ----------------------------------------------------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var x = await _context.Kiralamalars
                .Where(k => k.KiralamaId == id)
                .Select(k => new KiralamaDto
                {
                    KiralamaId = k.KiralamaId,
                    AracId = k.AracId,
                    MusteriId = k.MusteriId,
                    AlisSubeId = k.AlisSubeId,
                    TeslimSubeId = k.TeslimSubeId,
                    AlisTarihi = k.AlisTarihi,
                    TahminiTeslimTarihi = k.TahminiTeslimTarihi,
                    GercekTeslimTarihi = k.GercekTeslimTarihi,
                    GunlukUcret = k.GunlukUcret,
                    Durum = k.Durum
                })
                .FirstOrDefaultAsync();

            if (x == null) return NotFound();
            return Ok(x);
        }

        // ----------------------------------------------------------------
        // POST (Create)
        // ----------------------------------------------------------------
       [HttpPost]
public async Task<IActionResult> Create([FromBody] KiralamaCreateDto dto)
{
    try
    {
        if (dto == null)
            return BadRequest("Kiralama verisi boş.");

        if (dto.MusteriId <= 0)
            return BadRequest("Geçersiz müşteri.");

        if (dto.AracId <= 0)
            return BadRequest("Geçersiz araç.");

        if (dto.AlisSubeId <= 0 || dto.TeslimSubeId <= 0)
            return BadRequest("Şube bilgisi geçersiz.");

        if (dto.AlisTarihi == default || dto.TahminiTeslimTarihi == default)
            return BadRequest("Tarih bilgileri geçersiz.");

        var entity = new Kiralamalar
        {
            MusteriId = dto.MusteriId,
            AracId = dto.AracId,
            AlisSubeId = dto.AlisSubeId,
            TeslimSubeId = dto.TeslimSubeId,
            AlisTarihi = dto.AlisTarihi,
            TahminiTeslimTarihi = dto.TahminiTeslimTarihi,
            GunlukUcret = dto.GunlukUcret,
            Durum = "Devam Ediyor"
        };

        _context.Kiralamalars.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(entity);
    }
    catch (Exception ex)
    {
        // 🔥 ARTIK GERÇEK HATAYI GÖRECEĞİZ
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}


        // ----------------------------------------------------------------
        // PUT (Update)
        // ----------------------------------------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, KiralamaDto dto)
        {
            var entity = await _context.Kiralamalars.FindAsync(id);
            if (entity == null) return NotFound();

            entity.AracId = dto.AracId;
            entity.MusteriId = dto.MusteriId;
            entity.AlisSubeId = dto.AlisSubeId;
            entity.TeslimSubeId = dto.TeslimSubeId;
            entity.AlisTarihi = dto.AlisTarihi;
            entity.TahminiTeslimTarihi = dto.TahminiTeslimTarihi;
            entity.GercekTeslimTarihi = dto.GercekTeslimTarihi;
            entity.GunlukUcret = dto.GunlukUcret;
            entity.Durum = dto.Durum;

            await _context.SaveChangesAsync();
            return Ok(dto);
        }

        // ----------------------------------------------------------------
        // DELETE
        // ----------------------------------------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Kiralamalars.FindAsync(id);
            if (item == null) return NotFound();

            _context.Kiralamalars.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Silindi");
        }
    }
}
