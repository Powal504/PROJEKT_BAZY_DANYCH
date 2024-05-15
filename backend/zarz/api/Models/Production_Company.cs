using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Production_Company
    {
        [Key]
        public int Company_id { get; set; }
        public string Company_name { get; set; }
    }
}