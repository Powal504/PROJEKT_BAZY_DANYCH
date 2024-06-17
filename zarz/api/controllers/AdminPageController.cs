using System;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Dto;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using api.Extensions;
using Microsoft.AspNetCore.Identity;
using api.Mappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using System.Text.RegularExpressions;
using api.Interfaces;
using System.Text.Encodings.Web;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity.UI.Services;
using Humanizer;
using System.Security.Policy;
using NuGet.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using api.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Dto;
using api.Mappers;
using api.Services;

namespace api.Controllers;

    [Authorize]
    [Route("api/admin")]

    public class AdminPageController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly ApplicationDBContext _context;
        private readonly IMovieRepository<Movies> _movieRepository;

        public AdminPageController(UserManager<Users> userManager, ApplicationDBContext context, IMovieRepository<Movies> movieRepository)
        {
            _userManager = userManager;
            _context = context;
            _movieRepository = movieRepository;
        }
    
        [Authorize]
        [HttpDelete("DeleteMovie")]

        public async Task<IActionResult> DeleteMovie([FromBody] DeleteMovieDto deleteMovieDto)
        {
            var moviTest = await _movieRepository.GetByTitle(deleteMovieDto.Title);
            if (moviTest.IsNullOrEmpty()) return BadRequest("Film nie istnieje");


            //_context.Movie_Movie_Catalog.Remove(movieMovieCatalog);
            bool fin = await _movieRepository.DeleteMovie(moviTest.ElementAt(0).Movie_id);
            if (fin == false) return BadRequest("Błąd usuwania");

            return Ok("Usunięto");

            
        }

        [Authorize]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto deleteUserDto)
        {
            var deleteUser = await _userManager.FindByNameAsync(deleteUserDto.Username);
            if (deleteUser == null) return BadRequest("Użytkownik nie istnieje");

            await _userManager.DeleteAsync(deleteUser);



            return Ok("Usunięto");


        }

    }