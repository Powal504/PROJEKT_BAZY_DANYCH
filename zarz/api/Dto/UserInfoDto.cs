using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class UserInfoDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Birth_date { get; set; }
        public string PhoneNumber { get; set; }
        public string Id {get; set;}
    }
}