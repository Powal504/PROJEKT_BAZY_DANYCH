using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Users :IdentityUser
    {
        public bool? State_of_user { get; set; }
        public string? Birth_date { get; set; }
    }
}