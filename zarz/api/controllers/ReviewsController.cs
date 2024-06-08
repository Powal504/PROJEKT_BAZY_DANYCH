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
            var username = User.GetUsername();

            if (username == null)
            {
                return Unauthorized("Brak autoryzacji.");
            }

            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return Unauthorized("Użytkownik nie został znaleziony.");
            }

            var movieExists = _context.Movies.FirstOrDefault(m => m.Movie_id == reviewDto.Movie_id);
            if (movieExists == null)
            {
                return BadRequest("Film o podanym ID nie istnieje.");
            }

            var review = ReviewMapper.ToEntity(reviewDto);
            review.User_id = user.Id;
            review.Review_date = DateTime.UtcNow; 

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok("Dodano recenzję");
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewDto>> GetReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound("Recenzja nie została znaleziona.");
            }

            var reviewDto = ReviewMapper.ToDto(review);
            return Ok(reviewDto);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(int id)
        {
            var username = User.GetUsername();

            if (username == null)
            {
                return Unauthorized("Brak autoryzacji.");
            }

            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return Unauthorized("Użytkownik nie został znaleziony.");
            }

            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound("Recenzja nie została znaleziona.");
            }

            if (review.User_id != user.Id)
            {
                return Forbid("Nie masz uprawnień do usunięcia tej recenzji.");
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok("Recenzja została usunięta.");
        }
    }
}
