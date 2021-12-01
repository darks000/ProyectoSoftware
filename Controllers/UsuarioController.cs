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
    public class UsuarioController : ControllerBase
    {

        private readonly ProyectoContext _context;
        public UsuarioController(ProyectoContext context)
        {   
            _context = context;
            
            if (_context.Usuarios.Count() == 0)
            {
                _context.Usuarios.Add(new Usuario { Identificacion = "1003243556", Email= "AMATISTA@SHOP.COM", Nombre = "AMATISTA",Apellido="ARIZA",Telefono="3154987434",Sexo="FEMENINO",Direccion="CALLE 51 # 28-73",Rol="ADMINISTRADOR",Password="12345"});
                _context.SaveChanges();
            }
        }


        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            return _context.Usuarios;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarioItem(string id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            return usuario;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            var item = await _context.Usuarios.FindAsync(usuario.Identificacion);
            if (item != null)
            {
                return BadRequest();
            }
            else
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUsuarioItem), new { id = usuario.Identificacion }, usuario);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioItem(string id, Usuario item)
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
        public async Task<IActionResult> DeleteClienteItem(string id)
        {
            var cliente = await _context.Usuarios.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(cliente);
            await _context.SaveChangesAsync();
            return NoContent();

        }



    }


}