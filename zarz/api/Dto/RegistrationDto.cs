using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class RegistrationDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string RepeatPassowrd { get; set; } = string.Empty;
        public string Phone_number { get; set; } = string.Empty;
        public int Role_id { get; set; }
        public string Birth_date { get; set; } = string.Empty;
    }
}