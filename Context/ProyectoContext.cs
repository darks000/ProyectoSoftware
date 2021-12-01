using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ProyectoSoftware.Models;

namespace ProyectoSoftware.Context
{
    public class ProyectoContext : IdentityDbContext
    {
        public ProyectoContext(DbContextOptions<ProyectoContext> options) :
        base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Mecanico> Mecanicos { get; set; }
        public DbSet<Cotizacion> Cotizaciones { get; set; }
        public DbSet<DetalleCotizacion> DetalleCotizaciones { get; set; }
        public DbSet<Vehiculo> Vehiculos { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Repuesto> Repuestos { get; set; }
    }
}