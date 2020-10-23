using System.Collections.Generic;
using capstoneProject.Models;

namespace CapstoneProject.Models
{
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Year { get; set; }
        public string Poster { get; set; }

        public List<Location> locations { get; set; }

    }
}