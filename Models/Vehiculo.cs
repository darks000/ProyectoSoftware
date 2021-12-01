using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class Vehiculo
    {
        [Key]
        public string Placa { get; set; }
        [Required]
        public string Modelo { get; set; }
        [Required]
        public string Year { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string Cilindraje { get; set; }
        [Required]
        public string Propietario { get; set; }
    }
}
