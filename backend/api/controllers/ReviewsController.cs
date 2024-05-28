using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Dto;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ReviewsController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ReviewDto>> PostReview(ReviewDto reviewDto)
        {
            var movieExists = _context.Movies.FirstOrDefault(m => m.Movie_id == reviewDto.Movie_id);
            if (movieExists==null)
            {
                return BadRequest("Film o podanym ID nie istnieje.");
            }

            var review = ReviewMapper.ToEntity(reviewDto);

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok("Dodano recenzje");
        }
    }
}