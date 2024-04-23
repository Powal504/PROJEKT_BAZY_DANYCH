using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Actor
    {
        [Key]
        public int Actor_id { get; set; }
        public string Actor_name { get; set; }
    }
}