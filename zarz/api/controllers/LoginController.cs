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
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginPageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<Users> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<Users> _signInManager;

        public LoginPageController(ApplicationDBContext context, UserManager<Users> userManager, ITokenService tokenService, SignInManager<Users> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("LoginPost")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingCandidate = await _userManager.Users.FirstOrDefaultAsync(c => c.UserName == loginModel.UserName);

            if (existingCandidate == null)
                return Unauthorized("Niepoprawny login");

            // Check if email is confirmed
            if (!await _userManager.IsEmailConfirmedAsync(existingCandidate))
                return BadRequest("Email not confirmed. Please check your email to confirm your account.");

            var result = await _signInManager.CheckPasswordSignInAsync(existingCandidate, loginModel.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Konto nieznalezione");

            return Ok(
                new newUserDto
                {
                    UserName = existingCandidate.UserName,
                    Email = existingCandidate.Email,
                    Token = _tokenService.CreateToken(existingCandidate)
                }
            );
        }
    }
}