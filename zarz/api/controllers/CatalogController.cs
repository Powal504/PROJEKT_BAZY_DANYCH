using System.Threading.Tasks;
using api.Data;
using api.Extensions;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                .ToListAsync();

            return Ok(userCatalogs);
        }
    }
}
