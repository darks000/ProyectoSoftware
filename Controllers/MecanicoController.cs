using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using ProyectoSoftware.Models;
using ProyectoSoftware.Context;
using System;
using System.Collections;


namespace ProyectoSoftware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MecanicoController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public MecanicoController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Mecanico> Get()
        {
            return _context.Mecanicos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Mecanico>> GetMecanicoItem(string id)
        {
            var mecanico = await _context.Mecanicos.FindAsync(id);
            if (mecanico == null)
            {
                return NotFound();
            }
            return mecanico;
        }

        [HttpPost]
        public async Task<ActionResult<Mecanico>> PostCotizacion(Mecanico mecanico)
        {
            var item = await _context.Mecanicos.FindAsync(mecanico.Identificacion);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Mecanicos.Add(mecanico);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMecanicoItem), new { id = mecanico.Identificacion }, mecanico);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMecanicoItem(string id, Mecanico item)
        {
            if (id != item.Identificacion)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMecanicoItem(string id)
        {
            var mecanico = await _context.Mecanicos.FindAsync(id);
            if (mecanico == null)
            {
                return NotFound();
            }

            _context.Mecanicos.Remove(mecanico);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}