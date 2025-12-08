using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusterilerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MusterilerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Musterilers.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Musterilers.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Musteriler model)
        {
            _context.Musterilers.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Musteriler model)
        {
            if (id != model.MusteriId) return BadRequest();

            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Musterilers.FindAsync(id);
            if (item == null) return NotFound();

            _context.Musterilers.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Silindi");
        }
 // ✅ Üye Ol (Register)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Musteriler model)
        {
            // Aynı e-posta veya TC kayıtlı mı kontrol et
            var existing = await _context.Musterilers
                .FirstOrDefaultAsync(x => x.Email == model.Email || x.TcNo == model.TcNo);

            if (existing != null)
                return BadRequest("Bu e-posta veya TC numarası zaten kayıtlı!");

            _context.Musterilers.Add(model);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Üyelik başarıyla oluşturuldu!", model });
        }

        [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] Musteriler login)
{
    var musteri = await _context.Musterilers
        .FirstOrDefaultAsync(x => x.Email == login.Email && x.TcNo == login.TcNo);

    if (musteri == null)
        return Unauthorized("Email veya TC No hatalı!");

    return Ok(musteri);
}



    }
}
