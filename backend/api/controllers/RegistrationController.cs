using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Dto;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;

namespace api.controllers
{
    [Route("api/Registration")]
    [ApiController]
    public class RegistrationPageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;


        public RegistrationPageController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpPost("RegistrationPOST")]
        public IActionResult Create([FromBody] RegistrationDto registrationModel)
        {
            var existingCandidate = _context.Users.FirstOrDefault(c =>c.Email == registrationModel.Email);
            if(existingCandidate!=null)return BadRequest("Konto o podanym adresie email juz istnieje");

            if(registrationModel.Password.Length<8) return BadRequest("Za slabe haslo (min 8 znakow)");

            if(registrationModel.Password!=registrationModel.RepeatPassowrd) return BadRequest("Hasla nie sa identyczne");

            
        if (!IsValidEmail(registrationModel.Email)) return BadRequest("Nie poprawny email.");
            
        if (!IsValidPhoneNumber(registrationModel.Phone_number)) return BadRequest("Nie poprawny numer telefonu.");
          

            var userModel =registrationModel.ToUserFromDto();
            _context.Users.Add(userModel);
            _context.SaveChanges();

            return Ok("Zarejestrowano");
        }

        
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                    RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        
        public static bool IsValidPhoneNumber(string phoneNumber)
        {

            if(phoneNumber.Length > 15)
            {
                return false;
            }
            foreach(char c in phoneNumber)
            {
                if(c < '0' || c > '9')
                {
                    return false;
                }
            }
            return true;
        }


    }
}