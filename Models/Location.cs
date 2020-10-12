using System.ComponentModel.DataAnnotations;

namespace capstoneProject.Models
{
    public class Location
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string Address { get; set; }
        public string Telephone { get; set; }
    }
}