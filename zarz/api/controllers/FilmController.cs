using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dto;
using api.Models;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/films")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public FilmsController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddFilmDTO>>> GetFilms()
        {
            var films = await _context.Movies.ToListAsync();
            var filmDTOs = new List<AddFilmDTO>();

            foreach (var film in films)
            {
                var genres = await _context.Genres_Movies
                    .Where(gm => gm.Movie_id == film.Movie_id)
                    .Select(gm => gm.Genre.Genre_name)
                    .ToListAsync();

                var filmDTO = film.ToDto();
                filmDTO.Genres = genres;
                filmDTOs.Add(filmDTO);
            }

            return Ok(filmDTOs);
        }

        [HttpPost]
        public async Task<ActionResult<AddFilmDTO>> AddFilm([FromBody] AddFilmDTO addFilmDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingFilm = await _context.Movies.FirstOrDefaultAsync(m => m.Title == addFilmDTO.Title);
            if (existingFilm != null)
            {
                return Conflict($"Film with title '{addFilmDTO.Title}' already exists.");
            }

            var film = await addFilmDTO.ToFilmAsync(_context);

            _context.Movies.Add(film);
            await _context.SaveChangesAsync();

            var filmDTO = film.ToDto();

            return CreatedAtAction(nameof(GetFilmById), new { id = film.Movie_id }, filmDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AddFilmDTO>> GetFilmById(int id)
        {
            var film = await _context.Movies.FindAsync(id);

            if (film == null)
            {
                return NotFound();
            }

            var filmDTO = film.ToDto();

            var genres = await _context.Genres_Movies
                .Where(gm => gm.Movie_id == id)
                .Select(gm => gm.Genre.Genre_name)
                .ToListAsync();

            filmDTO.Genres = genres;

            return Ok(filmDTO);
        }
        [HttpGet("AllGenres")]
        public async Task<ActionResult<IEnumerable<GenresDTO>>> GetGenres()
        {
            var genres = await _context.Genres.ToListAsync();
            var genresDTOs = genres.Select(genre => new GenresDTO
            {
                Genre_id = genre.Genre_id,
                Genre_name = genre.Genre_name
            }).ToList();

            return Ok(genresDTOs);
        }
    }
}