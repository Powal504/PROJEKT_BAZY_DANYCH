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
                    c.Movie_catalog_id,
                    c.MovieMovieCatalogs,
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

            

            int id = 1;
            var maxCatalog = _context.Movie_Catalog
                            .OrderByDescending(c => c.Movie_catalog_id)
                            .FirstOrDefault();

            if (maxCatalog != null) id = maxCatalog.Movie_catalog_id + 1;
            
            catalog.Movie_catalog_id = id;//lastCatalog.Movie_catalog_id + 1;
            catalog.MovieMovieCatalogs = new List<Movie_Movie_Catalog>();
            catalog.User_id = appUser.Id;
            catalog.User = appUser;
            _context.Movie_Catalog.Add(catalog);
            _context.SaveChanges();
            return Ok("Utworzono katalog");
            

        
        }
        
        [Authorize]
        [HttpPost("AddToCatalog")]
        
        public async Task<IActionResult> AddToCatalog([FromBody] AddToCatalogDto addToCatalogDto){

            var test =_context.Movie_Movie_Catalog
                .Where(c => c.Movie_id == addToCatalogDto.Movie_id && c.Movie_Catalog_id == addToCatalogDto.Movie_Catalog_id);
            if (!test.IsNullOrEmpty()) return BadRequest("Film jest na liscie");

            var added = AddToCatalogMapper.ToEntity(addToCatalogDto);
            added.Movie = _context.Movies.FirstOrDefault(c => c.Movie_id == addToCatalogDto.Movie_id);
            added.Movie_Catalog = _context.Movie_Catalog.FirstOrDefault(c => c.Movie_catalog_id == addToCatalogDto.Movie_Catalog_id);
            
            await _context.Movie_Movie_Catalog.AddAsync(added);

            _context.Movie_Catalog
                .FirstOrDefault(c => c.Movie_catalog_id == addToCatalogDto.Movie_Catalog_id)
                .MovieMovieCatalogs.Append(added);
            await _context.SaveChangesAsync();
            return Ok("Dodano");
        }
        
        [Authorize]
        [HttpDelete("RemoveCatalog")]
        
        public async Task<IActionResult> RemoveCatalog([FromBody] RemoveCatalogDto removeCatalogDto){
            
            var test =_context.Movie_Catalog
                .Where(c => c.Catalog_name == removeCatalogDto.Catalog_name && c.Movie_catalog_id == removeCatalogDto.Movie_Catalog_id);
            if (test.IsNullOrEmpty()) return BadRequest ("Katalog nie istnieje");
            Movie_Catalog catalog = await _context.Movie_Catalog.FirstOrDefaultAsync(c => c.Movie_catalog_id == removeCatalogDto.Movie_Catalog_id);
            _context.Movie_Catalog.Remove(catalog);
            var listToDelete = _context.Movie_Movie_Catalog
                .Where(c => c.Movie_Catalog_id == removeCatalogDto.Movie_Catalog_id)
                .ToList();
            _context.Movie_Movie_Catalog.RemoveRange(listToDelete);
            _context.SaveChangesAsync();
            return Ok("Usunięto");

        }
        [Authorize]
        [HttpGet("UserCatalogNames")]
        public async Task<IActionResult> GetUserCatalogNames()
        {
            var username = User.GetUsername();

            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("Nie znaleziono użytkownika.");
            }

            var userCatalogNames = await _context.Movie_Catalog
                .Where(c => c.User_id == appUser.Id)
                .Select(c => c.Catalog_name)
                .ToListAsync();

            return Ok(userCatalogNames);
        }
        [Authorize]
        [HttpDelete("RemoveFromCatalog")]
        
        public async Task<IActionResult> RemoveFromCatalog([FromBody] RemoveFromCatalogDto removeFromCatalogDto){

            var test =_context.Movie_Movie_Catalog
                .Where(c => c.Movie_id == removeFromCatalogDto.Movie_id && c.Movie_Catalog_id == removeFromCatalogDto.Movie_Catalog_id);
            if (test.IsNullOrEmpty()) return BadRequest("Film nie jest na liscie");
            Movie_Movie_Catalog movieCatalog = await _context.Movie_Movie_Catalog.FirstOrDefaultAsync(c => c.Movie_Catalog_id == removeFromCatalogDto.Movie_Catalog_id && c.Movie_id == removeFromCatalogDto.Movie_id);
            _context.Movie_Movie_Catalog.Remove(movieCatalog);
            await _context.SaveChangesAsync(); 
            return Ok("Usunięto");
        }   
    }


}
