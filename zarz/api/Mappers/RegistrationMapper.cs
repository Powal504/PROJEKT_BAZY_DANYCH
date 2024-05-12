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
                Username = userModel.Username,
                Email = userModel.Email,
                Password = userModel.Password,
                Phone_number = userModel.Phone_number,
                Birth_date = userModel.Birth_date
            };
        }
    }
}