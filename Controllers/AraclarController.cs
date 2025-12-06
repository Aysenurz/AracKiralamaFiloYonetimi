using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

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
        public async Task<IActionResult> Create(Araclar model)
        {
            _context.Araclars.Add(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }

        // PUT: api/araclar/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Araclar model)
        {
            if (id != model.AracId) return BadRequest();

            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(model);
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
    }
}
