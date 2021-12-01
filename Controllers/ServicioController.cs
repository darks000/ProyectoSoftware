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
    public class ServicioController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public ServicioController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Servicio> Get()
        {
            return _context.Servicios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Servicio>> GetServicioItem(string id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
            {
                return NotFound();
            }
            return servicio;
        }

        [HttpPost]
        public async Task<ActionResult<Servicio>> PostServicio(Servicio servicio)
        {
            var item = await _context.Servicios.FindAsync(servicio.TipoServicio);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Servicios.Add(servicio);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetServicioItem), new { id = servicio.TipoServicio }, servicio);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutServicioItem(string id, Servicio item)
        {
            if (id != item.TipoServicio)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicioItem(string id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
            {
                return NotFound();
            }

            _context.Servicios.Remove(servicio);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}