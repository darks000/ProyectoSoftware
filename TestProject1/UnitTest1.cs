using Newtonsoft.Json;
using ProyectoSoftware;
using ProyectoSoftware.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using System.Globalization;
using System.Linq;
using FluentAssertions;
namespace TestProject1
{
    public class UnitTest1 : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;
        public UnitTest1(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }
        [Fact]
        public async Task PuedeCrearVehiculoTestAsync()
        {
            var request = new Vehiculo()
            {
                Placa ="x2wewe",
                Modelo ="porceh",
                Year ="20",
                Color ="amari",
                Cilindraje ="5",
                Propietario ="yo"

            };
           
            var jsonObject = JsonConvert.SerializeObject(request);
            var content = new StringContent(jsonObject, Encoding.UTF8, "application/json");
            var httpClient = _factory.CreateClient();
            var responseHttp = await httpClient.PostAsync("api/Vehiculo", content);
            object algo = responseHttp.StatusCode.Should().Be(HttpStatusCode.Created);
            var respuesta = await responseHttp.Content.ReadAsStringAsync();
          //  respuesta.Should().Be(jsonObject.ToLower());
           respuesta.Should().Be("fjidsfj");

            var context = _factory.CreateContext();
            var vehiculox2x = context.Vehiculos.FirstOrDefault(t => t.Placa == "x2wewe");
            vehiculox2x.Should().NotBeNull();
        }

        
    }
    }
