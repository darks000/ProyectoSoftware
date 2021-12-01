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
    public class DetalleCotizacionController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public DetalleCotizacionController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<DetalleCotizacion> Get()
        {
            return _context.DetalleCotizaciones;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleCotizacion>> GetDetalleCotizacionItem(int id)
        {
            var detalleCotizacion = await _context.DetalleCotizaciones.FindAsync(id);
            if (detalleCotizacion == null)
            {
                return NotFound();
            }
            return detalleCotizacion;
        }



        [HttpPost]
        public async Task<ActionResult<DetalleCotizacion>> PostDetalleCotizacion(DetalleCotizacion detalleCotizacion)
        {
            var item = await _context.DetalleCotizaciones.FindAsync(detalleCotizacion.CodigoDetalle);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.DetalleCotizaciones.Add(detalleCotizacion);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetDetalleCotizacionItem), new { id = detalleCotizacion.CodigoDetalle }, detalleCotizacion);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleCotizacionItem(int id, DetalleCotizacion item)
        {
            if (id != item.CodigoDetalle)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleCotizacionItem(int id)
        {
            var detalleCotizacion = await _context.DetalleCotizaciones.FindAsync(id);
            if (detalleCotizacion == null)
            {
                return NotFound();
            }

            _context.DetalleCotizaciones.Remove(detalleCotizacion);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}