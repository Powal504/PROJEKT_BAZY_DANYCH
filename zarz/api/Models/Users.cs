using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Users
    {
        [Key]
        public int User_id { get; set; }
        public int Role_id { get; set; }
        [ForeignKey("Role_id")]
        public Role Role{get;set;}
        public string? Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? State_of_user { get; set; }
        public string? Phone_number { get; set; }
        public DateTime? Birth_date { get; set; }
    }
}