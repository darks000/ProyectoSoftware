using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class DetalleCotizacion
    {
        [Key]
        public int CodigoDetalle { get; set; }
        [Required]
        public string CodigoCotizacion { get; set; }
        [Required]
        public string CodigoServicio { get; set; }
        [Required]
        public string Descripcion{ get; set; }
        [Required]
        public double ValorServicio { get; set; }
    }
}
