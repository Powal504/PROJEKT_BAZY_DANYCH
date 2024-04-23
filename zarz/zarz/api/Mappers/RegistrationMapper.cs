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
        public static User ToUserFromDto (this RegistrationDto userModel)
        {
            return new User
            {
                Username = userModel.Username,
                Email = userModel.Email,
                Password = userModel.Password,
                PhoneNumber = userModel.PhoneNumber,
                DateOfBirth = userModel.DateOfBirth
            };
        }
    }
}