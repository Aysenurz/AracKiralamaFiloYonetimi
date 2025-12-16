using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Models.Dto;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaturalarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FaturalarController(AppDbContext context)
        {
            _context = context;
        }

        // ---------------------------------------------------------
        // GET - Pagination (ÖNERİLEN)
        // ---------------------------------------------------------
        [HttpGet]
        public async Task<IActionResult> GetPaged(int page = 1, int pageSize = 50)
        {
            var query = _context.Faturalars.AsNoTracking();

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.FaturaId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new FaturaDto
                {
                    FaturaId = x.FaturaId,
                    KiralamaId = x.KiralamaId,
                    Tutar = x.Tutar,
                    FaturaTarihi = x.FaturaTarihi
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

        // ---------------------------------------------------------
        // GET BY ID
        // ---------------------------------------------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Faturalars
                .AsNoTracking()
                .Where(x => x.FaturaId == id)
                .Select(x => new FaturaDto
                {
                    FaturaId = x.FaturaId,
                    KiralamaId = x.KiralamaId,
                    Tutar = x.Tutar,
                    FaturaTarihi = x.FaturaTarihi
                })
                .FirstOrDefaultAsync();

            if (item == null) 
                return NotFound();

            return Ok(item);
        }

        // ---------------------------------------------------------
        // POST - Create
        // ---------------------------------------------------------
        [HttpPost]
public async Task<IActionResult> Create(FaturaCreateDto dto)
{
    var entity = new Faturalar
    {
        
        KiralamaId = dto.KiralamaId,
        Tutar = dto.Tutar,
        FaturaTarihi = DateTime.Now
    };

    _context.Faturalars.Add(entity);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        FaturaId = entity.FaturaId,
        KiralamaId = entity.KiralamaId,
        Tutar = entity.Tutar,
        FaturaTarihi = entity.FaturaTarihi
    });
}


        // ---------------------------------------------------------
        // PUT - Update
        // ---------------------------------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FaturaCreateDto dto)
        {
            var entity = await _context.Faturalars.FindAsync(id);
            if (entity == null) 
                return NotFound();

            entity.KiralamaId = dto.KiralamaId;
            entity.Tutar = dto.Tutar;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Fatura güncellendi.",
                entity
            });
        }

        // ---------------------------------------------------------
        // DELETE
        // ---------------------------------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Faturalars.FindAsync(id);
            if (item == null) 
                return NotFound();

            _context.Faturalars.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Silindi" });

            
        }

        [HttpGet("musteri/{musteriId}")]
public async Task<IActionResult> GetFaturalarByMusteri(int musteriId)
{
    var faturalar = await _context.Faturalars
        .Include(f => f.Kiralama)
        .Where(f => f.Kiralama.MusteriId == musteriId)
        .Select(f => new
        {
            f.FaturaId,
            f.KiralamaId,
            f.Tutar,
            f.FaturaTarihi
        })
        .ToListAsync();

    return Ok(faturalar);
}

    }
}
