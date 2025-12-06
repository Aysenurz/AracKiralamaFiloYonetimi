using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DevController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DevController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/dev/seed
        [HttpGet("seed")]
        public async Task<IActionResult> Seed()
        {
            var result = await SeedData.SeedAsync(_context);
            return Ok(result);
        }
    }
}
