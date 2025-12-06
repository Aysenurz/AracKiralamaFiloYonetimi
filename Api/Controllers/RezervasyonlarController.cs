using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RezervasyonlarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RezervasyonlarController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Rezervasyonlars.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Rezervasyonlars.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Rezervasyonlar model)
        {
            _context.Rezervasyonlars.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Rezervasyonlar model)
        {
            if (id != model.RezervasyonId) return BadRequest();

            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Rezervasyonlars.FindAsync(id);
            if (item == null) return NotFound();

            _context.Rezervasyonlars.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Silindi");
        }
    }
}
