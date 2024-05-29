using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;

namespace api.Mappers
{
    public static class RegistrationMapper
    {
        public static Users ToUserFromDto (this RegistrationDto userModel)
        {
            return new Users
            {
                UserName = userModel.UserName,
                PhoneNumber=userModel.Phone_number,
                Email = userModel.Email,
                Birth_date = userModel.Birth_date
            };
        }
    }
}