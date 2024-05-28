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
            var existingCandidate = _context.Users.FirstOrDefault(c => c.Email == registrationModel.Email);
            if (existingCandidate != null) return BadRequest("Konto o podanym adresie email juz istnieje");

            if (registrationModel.Password.Length < 8) return BadRequest("Za slabe haslo (min 8 znakow)");

            if (registrationModel.Password != registrationModel.RepeatPassowrd) return BadRequest("Hasla nie sa identyczne");

<<<<<<< HEAD:zarz/api/controllers/RegistrationController.cs
=======
            
        if (!IsValidEmail(registrationModel.Email)) return BadRequest("Nie poprawny email.");
            
        if (!IsValidPhoneNumber(registrationModel.Phone_number)) return BadRequest("Nie poprawny numer telefonu.");
          
>>>>>>> back:backend/api/controllers/RegistrationController.cs

            if (!IsValidEmail(registrationModel.Email)) return BadRequest("Niepoprawny email.");

            if (!IsValidPhoneNumber(registrationModel.Phone_number)) return BadRequest("Niepoprawny numer telefonu.");

            if (!IsValidDateOfBirth(registrationModel.Birth_date)) return BadRequest("Niepoprawna albo nieistniejaca data urodzenia. Poprawny format: DD.MM.YYYY");



            var userModel = registrationModel.ToUserFromDto();
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

            if (phoneNumber.Length > 15)
            {
                return false;
            }
            foreach (char c in phoneNumber)
            {
                if (c < '0' || c > '9')
                {
                    return false;
                }
            }
            return true;
        }

        public static bool IsValidDateOfBirth(string date)
        {
            if (string.IsNullOrWhiteSpace(date) || date.Length != 10)
                return false;

            if (date[2] != '.' || date[5] != '.')
                return false;

            for (int i = 0; i < date.Length; i++)
            {
                if (i == 2 || i == 5) continue;
                if (date[i] < '0' || date[i] > '9') return false;
            }
            int year = (date[6] - '0') * 1000 + (date[7] - '0') * 100 + (date[8] - '0') * 10 + date[9] - '0';
            int month = (date[3] - '0') * 10 + date[4] - '0';
            int day = (date[0] - '0') * 10 + date[1] - '0';
            if (month == 0 || month > 12) return false;

            int[] NumberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (month == 2 && (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))) NumberOfDays[1] = 29;
            if (day > NumberOfDays[month - 1] || day == 0) return false;

            return true;
        }


    }
}