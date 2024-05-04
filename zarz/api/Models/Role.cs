using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Role
    {
        [Key]
        public int Role_id { get; set; }
        public string? Role_name { get; set; }
    }
}