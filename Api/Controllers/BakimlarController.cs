using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Models.Dto;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BakimlarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BakimlarController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/Bakimlar?page=1&pageSize=50
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 50)
        {
            var data = await _context.Bakimlars
                .OrderBy(x => x.BakimId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new BakimDto
                {
                    BakimId = x.BakimId,
                    AracId = x.AracId,
                    BakimTipi = x.BakimTipi,
                    Tutar = x.Tutar,
                    BakimTarihi = x.BakimTarihi,
                    Aciklama = x.Aciklama
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Bakimlars
                .Where(x => x.BakimId == id)
                .Select(x => new BakimDto
                {
                    BakimId = x.BakimId,
                    AracId = x.AracId,
                    BakimTipi = x.BakimTipi,
                    Tutar = x.Tutar,
                    BakimTarihi = x.BakimTarihi,
                    Aciklama = x.Aciklama
                })
                .FirstOrDefaultAsync();

            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(BakimDto dto)
        {
            var entity = new Bakimlar
            {
                AracId = dto.AracId,
                BakimTipi = dto.BakimTipi,
                Tutar = dto.Tutar,
                BakimTarihi = dto.BakimTarihi,
                Aciklama = dto.Aciklama
            };

            _context.Bakimlars.Add(entity);
            await _context.SaveChangesAsync();

            dto.BakimId = entity.BakimId;
            return Ok(dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BakimDto dto)
        {
            var entity = await _context.Bakimlars.FindAsync(id);
            if (entity == null) return NotFound();

            entity.AracId = dto.AracId;
            entity.BakimTipi = dto.BakimTipi;
            entity.Tutar = dto.Tutar;
            entity.BakimTarihi = dto.BakimTarihi;
            entity.Aciklama = dto.Aciklama;

            await _context.SaveChangesAsync();
            return Ok(dto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Bakimlars.FindAsync(id);
            if (item == null) return NotFound();

            _context.Bakimlars.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Silindi");
        }
    }
}
