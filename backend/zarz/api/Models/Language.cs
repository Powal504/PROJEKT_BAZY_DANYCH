using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Language
    {
        [Key]
        public int Language_id { get; set; }
        public string Language_name { get; set; }
    }
}