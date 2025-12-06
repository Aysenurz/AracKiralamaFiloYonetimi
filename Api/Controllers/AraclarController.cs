using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Models.Dto;   // ⭐ BUNU EKLEDİK — DTO burada!

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

        // GET: api/araclar
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Araclars.ToListAsync());
        }

        // GET: api/araclar/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Araclars.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/araclar
        [HttpPost]
        public async Task<IActionResult> Create(AracCreateDto dto)
        {
            var entity = new Araclar
            {
                Plaka = dto.Plaka,
                Renk = dto.Renk,
                Durum = dto.Durum,
                ModelId = dto.ModelId,
                GuncelSubeId = dto.GuncelSubeId,
                AlisTarihi = DateTime.Now
            };

            _context.Araclars.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        // PUT: api/araclar/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AracCreateDto dto)
        {
            var entity = await _context.Araclars.FindAsync(id);
            if (entity == null) return NotFound();

            entity.Plaka = dto.Plaka;
            entity.Renk = dto.Renk;
            entity.Durum = dto.Durum;
            entity.ModelId = dto.ModelId;
            entity.GuncelSubeId = dto.GuncelSubeId;

            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        // DELETE: api/araclar/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Araclars.FindAsync(id);
            if (item == null) return NotFound();

            _context.Araclars.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Araç silindi");
        }
        // GET: api/araclar/GetByFilter?subeId=1&alis=2024-12-10&donus=2024-12-15
[HttpGet("GetByFilter")]
public async Task<IActionResult> GetByFilter(int subeId, string alis, string donus)
{
    // Tarihleri parse et
    if (!DateTime.TryParse(alis, out DateTime alisTarihi))
        return BadRequest("Alış tarihi hatalı!");

    if (!DateTime.TryParse(donus, out DateTime donusTarihi))
        return BadRequest("Dönüş tarihi hatalı!");

    var liste = await _context.Araclars
        .Where(a => a.GuncelSubeId == subeId)
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
        .ToListAsync();

    return Ok(liste);
}


    }
}
