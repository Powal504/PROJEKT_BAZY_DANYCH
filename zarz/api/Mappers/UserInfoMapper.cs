using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;
using System.Globalization;

namespace api.Mappers
{
    public static class UserMapper
    {
        public static UserInfoDto ToDto(this Users user)
        {
            return new UserInfoDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Birth_date = user.Birth_date,
                PhoneNumber = user.PhoneNumber,
                Id = user.Id
            };
        }
    }
}
