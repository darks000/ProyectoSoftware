using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ProyectoSoftware.Models
{
    public class Servicio
    {
        [Key]
        public string TipoServicio { get; set; }
        public string ImagenServicio { get; set; }
        [Required]
        public string Categoria { get; set; }
        [Required]
        public double Valor { get; set; }
    }
}
