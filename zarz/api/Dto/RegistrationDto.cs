using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Dto
{
    public class RegistrationDto
    {
        public string Username { get; set; } = string.Empty;
        public int Roleid {get; set; } = 0;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string RepeatPassowrd { get; set; } = string.Empty;
        public string Phone_number { get; set; } = string.Empty;
        public DateTime Birth_date { get; set; } = DateTime.MinValue;
    }
}