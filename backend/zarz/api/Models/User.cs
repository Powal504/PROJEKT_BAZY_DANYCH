using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class User
    {
        [Key]
        public int User_id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [DataType(DataType.Password)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}