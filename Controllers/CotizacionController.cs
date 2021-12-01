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
    public class CotizacionController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public CotizacionController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Cotizacion> Get()
        {
            return _context.Cotizaciones;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cotizacion>> GetCotizacionItem(string id)
        {
            var cotizacion = await _context.Cotizaciones.FindAsync(id);
            if (cotizacion == null)
            {
                return NotFound();
            }
            return cotizacion;
        }

        [HttpPost]
        public async Task<ActionResult<Cotizacion>> PostCotizacion(Cotizacion cotizacion)
        {
            var item = await _context.Cotizaciones.FindAsync(cotizacion.CodigoCotizacion);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Cotizaciones.Add(cotizacion);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCotizacionItem), new { id = cotizacion.CodigoCotizacion }, cotizacion);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCotizacionItem(string id, Cotizacion item)
        {
            if (id != item.CodigoCotizacion)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCotizacionItem(string id)
        {
            var cotizacion = await _context.Cotizaciones.FindAsync(id);
            if (cotizacion == null)
            {
                return NotFound();
            }

            _context.Cotizaciones.Remove(cotizacion);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}