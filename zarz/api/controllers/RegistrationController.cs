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
using Microsoft.AspNetCore.Identity;
using api.Interfaces;
using System.Text.Encodings.Web;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity.UI.Services;
using Humanizer;
using System.Security.Policy;
using NuGet.Common;

namespace api.controllers
{
    [Route("api/Registration")]
    [ApiController]
    public class RegistrationPageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<Users> _userManager;
        private readonly ITokenService _tokenService;

        public RegistrationPageController(ApplicationDBContext context,UserManager<Users> userManager,ITokenService tokenService)
        {
            _context = context;
            _userManager = userManager;
            _tokenService=tokenService;
        }
        [HttpPost("RegistrationPOST")]
       public async Task<IActionResult> CreateAsync([FromBody] RegistrationDto registrationModel)
{
    var existingCandidate = _context.Users.FirstOrDefault(c => c.Email == registrationModel.Email);
    if (existingCandidate != null) return BadRequest("Konto o podanym adresie email juz istnieje");

    if (registrationModel.Password.Length < 8) return BadRequest("Za slabe haslo (min 8 znakow)");

    if (registrationModel.Password != registrationModel.RepeatPassowrd) return BadRequest("Hasla nie sa identyczne");

    if (!IsValidEmail(registrationModel.Email)) return BadRequest("Niepoprawny email.");

    if (!IsValidPhoneNumber(registrationModel.Phone_number)) return BadRequest("Niepoprawny numer telefonu.");

    if (!IsValidDateOfBirth(registrationModel.Birth_date)) return BadRequest("Niepoprawna albo nieistniejaca data urodzenia. Poprawny format: DD.MM.YYYY");

    var userModel = registrationModel.ToUserFromDto();

    var result = await _userManager.CreateAsync(userModel, registrationModel.Password);

    if (!result.Succeeded)
    {
        if (result.Errors.Any(error => error.Code == "DuplicateUserName"))
        {
            return Conflict("Użytkownik o tej nazwie już istnieje");
        }
        else { return BadRequest("cos zle"); }
    }

    var code = await _userManager.GenerateEmailConfirmationTokenAsync(userModel);
    var callbackUrl = Url.Action(nameof(ConfirmEmail), "RegistrationPage", new
    {
        userId = userModel.Id,
        code = WebUtility.UrlEncode(code)
    }, protocol: HttpContext.Request.Scheme);

    await SendEmailAsync(userModel.Email, "Confirm your email",
        $"Please confirm your account by clicking here: '{callbackUrl}'");

    return Ok("Registration successful. Please check your email to confirm your account.");
}

[HttpGet("ConfirmEmail")]
public async Task<IActionResult> ConfirmEmail(string userId, string code)
{
    if (userId == null || code == null)
    {
        return BadRequest("Error confirming your email.");
    }

    var user = await _userManager.FindByIdAsync(userId);
    if (user == null)
    {
        return NotFound($"Unable to load user with ID '{userId}'.");
    }

    var result = await _userManager.ConfirmEmailAsync(user, WebUtility.UrlDecode(code));
if (result.Succeeded)
{
    var localhostUrl = "http://localhost:5173/login"; // Replace with your actual localhost URL
    return Ok($"Thank you for confirming your email. You can now copy "{localhostUrl}".");
}
    else
    {
        return BadRequest("Error confirming your email.");
    }
}


        ///////////////////////////////////////////////////////////////////////////////////////////////

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

     public static Task SendEmailAsync(string to, string subject, string htmlMessage)
        {
            string fromMail = "mihaylobs@gmail.com";
            string fromPassword = "pvppewlueiilugnr";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = subject;
            message.To.Add(new MailAddress(to));

            message.Body = htmlMessage;
            //message.IsBodyHtml = true;
            
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);

            return Task.CompletedTask;
        }

    }
}
