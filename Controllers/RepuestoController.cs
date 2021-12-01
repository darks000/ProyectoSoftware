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
    public class RepuestoController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public RepuestoController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Repuesto> Get()
        {
            return _context.Repuestos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Repuesto>> GetRepuestoItem(string id)
        {
            var repuesto = await _context.Repuestos.FindAsync(id);
            if (repuesto == null)
            {
                return NotFound();
            }
            return repuesto;
        }

        [HttpPost]
        public async Task<ActionResult<Repuesto>> PostRepuesto(Repuesto repuesto)
        {
            var item = await _context.Repuestos.FindAsync(repuesto.CodigoRepuesto);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Repuestos.Add(repuesto);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRepuestoItem), new { id = repuesto.CodigoRepuesto }, repuesto);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRepuestoItem(string id, Repuesto item)
        {
            if (id != item.CodigoRepuesto)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepuestoItem(string id)
        {
            var repuesto = await _context.Repuestos.FindAsync(id);
            if (repuesto == null)
            {
                return NotFound();
            }

            _context.Repuestos.Remove(repuesto);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}