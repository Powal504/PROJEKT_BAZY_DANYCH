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
    [Route("api/Login")]
    [ApiController]
    public class LoginPageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;


        public LoginPageController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpPost("LoginPost")]
        public IActionResult Create([FromBody] LoginDto loginModel)
        {
            
            var existingCandidate = _context.Users.FirstOrDefault(c =>c.Username == loginModel.Username);
            if (existingCandidate == null)return BadRequest("Niepoprowany login lub hasło");
            if (existingCandidate.Password != loginModel.Password)return BadRequest("Niepoprowany login lub hasło");

            return Ok(existingCandidate);
        }
    }
}