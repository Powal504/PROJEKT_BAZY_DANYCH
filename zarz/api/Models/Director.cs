using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Director
    {
        [Key]
        public int Director_id { get; set; }
        public string Director_name { get; set; }
    }
}