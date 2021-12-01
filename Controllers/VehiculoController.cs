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
    public class VehiculoController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public VehiculoController(ProyectoContext context)
        {   
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Vehiculo> Get()
        {
            return _context.Vehiculos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehiculo>> GetVehiculoItem(string id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
            {
                return NotFound();
            }
            return vehiculo;
        }

        [HttpPost]
        public async Task<ActionResult<Vehiculo>> PostVehiculo(Vehiculo vehiculo)
        {
            var item = await _context.Vehiculos.FindAsync(vehiculo.Placa);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Vehiculos.Add(vehiculo);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetVehiculoItem), new { id = vehiculo.Placa }, vehiculo);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehiculoItem(string id, Vehiculo item)
        {
            if (id != item.Placa)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehiculoItem(string id)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(id);
            if (vehiculo == null)
            {
                return NotFound();
            }

            _context.Vehiculos.Remove(vehiculo);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}