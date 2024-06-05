using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Directors
    {
        [Key]
        public int Director_id { get; set; }
        public string? Director_name { get; set; }
        public string? Director_surname { get; set; }
        public ICollection<Directors_Movies> DirectorsMovies { get; set; } = new List<Directors_Movies>();
    }
}