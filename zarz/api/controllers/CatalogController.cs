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
        public async Task<IActionResult> CreateUserCatalog([FromBody] CreateMovie_CatalogDto newCatalogDto)
        {
            var username = User.GetUsername();
            


            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null)
            {
                return NotFound("Nie znaleziono użytkownika.");
            }

            Movie_CatalogDto create = new Movie_CatalogDto();
            create.Catalog_name = newCatalogDto.Catalog_name;
            
            var catalog = CatalogMapper.ToEntity(create);


            var test =_context.Movie_Catalog
                .Where(c => c.Catalog_name == create.Catalog_name);

            if (!test.IsNullOrEmpty()) return BadRequest("Istnieje taki katalog");
            

            int id = 1;
            var maxCatalog = _context.Movie_Catalog
                            .OrderByDescending(c => c.Movie_catalog_id)
                            .FirstOrDefault();

            if (maxCatalog != null) id = maxCatalog.Movie_catalog_id + 1;
            
            catalog.Movie_catalog_id = id;
            catalog.MovieMovieCatalogs = new List<Movie_Movie_Catalog>();
            catalog.User_id = appUser.Id;
            catalog.User = appUser;
            _context.Movie_Catalog.Add(catalog);

            for(int i = 0; i < newCatalogDto.AddMovies.Count(); i++){
                var movi = _context.Movies.FirstOrDefault(c => c.Title == newCatalogDto.AddMovies.ElementAt(i));
                if (movi == null) continue;

                var added = new Movie_Movie_Catalog();
                added.Movie = _context.Movies.FirstOrDefault(c => c.Movie_id == movi.Movie_id);
                added.Movie_id = movi.Movie_id;
                added.Movie_Catalog = _context.Movie_Catalog.FirstOrDefault(c => c.Movie_catalog_id == id);
                added.Movie_Catalog_id = id;

                await _context.Movie_Movie_Catalog.AddAsync(added);
            }


            _context.SaveChanges();
            return Ok("Utworzono katalog");
            

        
        }
        
        [Authorize]
        [HttpPost("AddToCatalog")]
        
        public async Task<IActionResult> AddToCatalog([FromBody] AddToCatalogDto addToCatalogDto){

            var movi = _context.Movies.FirstOrDefault(c => c.Title == addToCatalogDto.Title);
            var cata = _context.Movie_Catalog.FirstOrDefault ( c => c.Catalog_name == addToCatalogDto.Catalog_name);
            var test =_context.Movie_Movie_Catalog
                .Where(c => c.Movie == movi && c.Movie_Catalog_id == cata.Movie_catalog_id);
            if (!test.IsNullOrEmpty()) return BadRequest("Film jest na liscie");

            var added = new Movie_Movie_Catalog();
            added.Movie = _context.Movies.FirstOrDefault(c => c.Movie_id == movi.Movie_id);
            added.Movie_id = movi.Movie_id;
            added.Movie_Catalog = _context.Movie_Catalog.FirstOrDefault(c => c.Movie_catalog_id == cata.Movie_catalog_id);
            added.Movie_Catalog_id = cata.Movie_catalog_id;
            
            await _context.Movie_Movie_Catalog.AddAsync(added);

            _context.Movie_Catalog
                .FirstOrDefault(c => c.Movie_catalog_id == cata.Movie_catalog_id)
                .MovieMovieCatalogs.Append(added);
            await _context.SaveChangesAsync();
            return Ok("Dodano");
        }
        
        [Authorize]
        [HttpDelete("RemoveCatalog")]
        
        public async Task<IActionResult> RemoveCatalog([FromBody] RemoveCatalogDto removeCatalogDto){
            
            var cata = _context.Movie_Catalog.FirstOrDefault ( c => c.Catalog_name == removeCatalogDto.Catalog_name);

            var test =_context.Movie_Catalog
                .Where(c => c.Catalog_name == removeCatalogDto.Catalog_name && c.Movie_catalog_id == cata.Movie_catalog_id);
            if (test.IsNullOrEmpty()) return BadRequest ("Katalog nie istnieje");
            Movie_Catalog catalog = await _context.Movie_Catalog.FirstOrDefaultAsync(c => c.Movie_catalog_id == cata.Movie_catalog_id);
            _context.Movie_Catalog.Remove(catalog);
            var listToDelete = _context.Movie_Movie_Catalog
                .Where(c => c.Movie_Catalog_id == cata.Movie_catalog_id)
                .ToList();
            _context.Movie_Movie_Catalog.RemoveRange(listToDelete);
            _context.SaveChangesAsync();
            return Ok("Usunięto");

        }

        [Authorize]
        [HttpDelete("RemoveFromCatalog")]
        
        public async Task<IActionResult> RemoveFromCatalog([FromBody] RemoveFromCatalogDto removeFromCatalogDto){

            var movi = _context.Movies.FirstOrDefault(c => c.Title == removeFromCatalogDto.Title);
            var cata = _context.Movie_Catalog.FirstOrDefault ( c => c.Catalog_name == removeFromCatalogDto.Catalog_name);
            if (cata == null) return BadRequest("Nie znaleziono katalogu");


            var testMovie =_context.Movie_Movie_Catalog
                .Where(c => c.Movie == movi && c.Movie_Catalog_id == cata.Movie_catalog_id);
            if (testMovie.IsNullOrEmpty()) return BadRequest("Film nie jest na liscie");

            var testCatalog = _context.Movie_Movie_Catalog
                .Where(c => c.Movie_Catalog_id == cata.Movie_catalog_id);
            if (testMovie.IsNullOrEmpty()) return BadRequest("Błąd katalogu");

            Movie_Movie_Catalog movieMovieCatalog = await _context.Movie_Movie_Catalog.FirstOrDefaultAsync(c => c.Movie_Catalog_id == cata.Movie_catalog_id && c.Movie == movi);
            
            _context.Movie_Movie_Catalog.Remove(movieMovieCatalog);
            await _context.SaveChangesAsync(); 
            return Ok("Usunięto");
        }   
    }


}
