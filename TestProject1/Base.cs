using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Testing;
using ProyectoSoftware.Context;

namespace TestProject1
{
    public class CustomWebApplicationFactory<TStartup>: WebApplicationFactory<TStartup> where TStartup : class
    {
        private readonly string _connectionString = @"Data Source=C:\sqlite\bancoDataBaseTest.db";
        public ProyectoContext  CreateContext()
        {
            var builder = new DbContextOptionsBuilder<ProyectoContext>().UseSqlite(_connectionString);
            return new ProyectoContext(builder.Options);
        }
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                #region Reemplazar la inyección del Contexto de Datos de EF Core
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<ProyectoContext>));

                services.Remove(descriptor);

                services.AddDbContext<ProyectoContext>(options =>
                {
                    options.UseSqlite(_connectionString);
                });
                #endregion

                #region Eliminar y Crear nueva base de datos. 
                var sp = services.BuildServiceProvider();
                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<ProyectoContext>();
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();
                    //invocar clase que inicilice los datos semillas. 
                }
                #endregion 
            });
        }
    }
}
