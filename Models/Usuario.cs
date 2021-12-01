using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
namespace ProyectoSoftware.Models
{
    public class Usuario
    {
        [Key]
        public string Identificacion { get; set; }
        [Required][EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Apellido { get; set; }
        [Required]
        public string Telefono { get; set; }
        [Required]
        public string Sexo { get; set; }
        [Required]
        public string Direccion { get; set; }
        [Required]
        public string Rol { get; set;}
        [Required]
        public string Password { get; set; }
    }
}
