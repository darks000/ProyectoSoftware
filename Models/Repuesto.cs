using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class Repuesto
    {
        [Key]
        public string CodigoRepuesto { get; set; }
        [Required]
        public string NombrRepuesto { get; set; }
        [Required]
        public string DescripcionRepuesto { get; set; }
        [Required]
        public double ValorRepuesto { get; set; }
    }
}
