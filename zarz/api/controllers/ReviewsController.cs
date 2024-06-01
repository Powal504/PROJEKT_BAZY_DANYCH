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

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly ApplicationDBContext _context;

        public ReviewsController(UserManager<Users> userManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ReviewDto>> PostReview(ReviewDto reviewDto)
        {
            // Pobranie nazwy użytkownika zalogowanego użytkownika
            var username = User.GetUsername();

            if (username == null)
            {
                return Unauthorized("Brak autoryzacji.");
            }

            // Pobranie ID użytkownika na podstawie nazwy użytkownika
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return Unauthorized("Użytkownik nie został znaleziony.");
            }

            // Sprawdzenie, czy film o podanym ID istnieje
            var movieExists = _context.Movies.FirstOrDefault(m => m.Movie_id == reviewDto.Movie_id);
            if (movieExists == null)
            {
                return BadRequest("Film o podanym ID nie istnieje.");
            }

            // Utworzenie obiektu recenzji na podstawie DTO przy użyciu mappera
            var review = ReviewMapper.ToEntity(reviewDto);

            // Przypisanie UserId
            review.User_id = user.Id;

            // Dodanie recenzji do kontekstu bazy danych i zapisanie zmian
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok("Dodano recenzję");
        }
    }
}
