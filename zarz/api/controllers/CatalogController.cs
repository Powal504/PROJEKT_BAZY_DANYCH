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
namespace api.Controllers
{
    [Route("api/catalogs")]
    [Authorize]
    public class CatalogController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly ApplicationDBContext _context;

        public CatalogController(UserManager<Users> userManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserCatalogs()
        {

            var username = User.GetUsername();


            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("Nie znaleziono użytkownika.");
            }


            var userCatalogs = await _context.Movie_Catalog
                .Where(c => c.User_id == appUser.Id)
                .Select(c=>new 
                {
                    c.Catalog_name,
                }).ToListAsync();

            return Ok(userCatalogs);
        }
        [Authorize]
        [HttpPost("CreateCatalog")]
        public async Task<IActionResult> CreateUserCatalog([FromBody] Movie_CatalogDto newCatalogDto)
        {
            var username = User.GetUsername();
            


            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("Nie znaleziono użytkownika.");
            }

            
            
            var catalog = CatalogMapper.ToEntity(newCatalogDto);

            //var lastCatalog = _context.Movie_Catalog.
            catalog.Movie_catalog_id = 3; //lastCatalog.Movie_catalog_id + 1;
            catalog.User_id = "6e5bfc61-e18a-4d43-8b86-723ff77064a2"; //appUser.Id;
            catalog.User = appUser;
            //_context.Movie_Catalog.Add(catalog);
            //_context.SaveChanges();
            return Ok(_context.Movie_Catalog);
            

        
        }
        
        [Authorize]
        [HttpPost("AddToCatalog")]
        
        public async Task<IActionResult> AddToCatalog([FromBody] AddToCatalogDto addToCatalogDto){

            var added = AddToCatalogMapper.ToEntity(addToCatalogDto);
            added.Movie = _context.Movies.FirstOrDefault(c => c.Movie_id == addToCatalogDto.Movie_id);
            
            added.Movie_Catalog = _context.Movie_Catalog.FirstOrDefault(c => c.Movie_catalog_id == addToCatalogDto.Movie_Catalog_id);
            return Ok("XD");
            
            await _context.Movie_Movie_Catalog.AddAsync(added);
            await _context.SaveChangesAsync();
            return Ok(3);
        }
        
    }
}
