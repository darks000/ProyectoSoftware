using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class Cotizacion
    {
        [Key]
        public string CodigoCotizacion { get; set; }
        [Required]
        public string CodigoPropietario { get; set; }
        [Required]
        public string PlacaVehiculo { get; set; }
        [Required]
        public double ValorAproximado { get; set; }
        [Required]
        public double ValorFinal { get; set; }
        [Required]
        public string IdMecanico { get; set; }
        [Required]
        public string Comentario { get; set; }
        [Required]
        public string Estado  { get; set; }
    }
}
