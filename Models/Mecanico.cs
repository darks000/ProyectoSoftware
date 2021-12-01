using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class Mecanico
    {
        [Key]
        public string Identificacion { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Apellido { get; set; }
        [Required]
        public string ExperienciaLaboral { get; set; }
        [Required]
        public string Especialidad { get; set; }
 
    }
}
