using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Users
    {
        [Key]
        public int User_id { get; set; }
        public int RoleId { get; set; }
        public Role Role{get;set;}
        public string? Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? State_of_user { get; set; }
        public string? Phone_number { get; set; }
        public DateTime? Birth_date { get; set; }
    }
}