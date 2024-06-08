using AutoMapper;
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

namespace api.controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository<Movies> _movieRepository;
    
        //private readonly IMapper _mapper;


        public MoviesController(IMovieRepository<Movies> movieRepository)
        {
            _movieRepository = movieRepository;
            //_mapper = mapper;
        }

        

        // GET: api/Movies
    
        [HttpGet("searchTitle/{movieTitle}")]
        public async Task<ActionResult<IEnumerable<Movies>>> GetMovieByTitle(string movieTitle)
        {
            var movie = await _movieRepository.GetByTitle(movieTitle);
            var results = movie.ToList<Movies>();
        if (movie == null || !movie.Any())
            {
                Console.WriteLine($"Movie with title '{movieTitle}' not found.");
                return NotFound();
            }

            return Ok(results);
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movies>>> GetMovie()
        {
            var movie = await _movieRepository.GetAll();
            var results = movie.ToList<Movies>();
            return Ok(results);
        }
        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movies>> GetMovie(int id)
        {
            var movie = await _movieRepository.GetById(id);

            if (movie == null)
            {
                return NotFound();
            }

            //var results = _mapper.Map<MoviesDTO>(movie);

            return Ok(movie);
        }

        //POST: api/Movies
        [HttpPost]
public async Task<ActionResult<Movies>> PostMovie(Movies movieDto)
{
    if (movieDto == null)
    {
        return BadRequest();
    }

    // Manually map properties from movieDto to a new Movies entity
    var movie = new Movies
    {
        Movie_id = movieDto.Movie_id,
        Title = movieDto.Title,
        Release_date = movieDto.Release_date?.ToUniversalTime(),
        Description = movieDto.Description,
        Avatar = movieDto.Avatar,
        GenresMovies = movieDto.GenresMovies.Select(gm => new Genres_Movies
            {
                Genre_id = gm.Genre_id,
                Movie_id = movieDto.Movie_id
            }).ToList(),
        DirectorsMovies = movieDto.DirectorsMovies.Select(gm => new Directors_Movies
            {
                Director_id = gm.Director_id,
                Movie_id = movieDto.Movie_id
            }).ToList(),
        MovieProductionCompanies = movieDto.MovieProductionCompanies.Select(gm => new Movie_Production_Companies
            {
                Company_id = gm.Company_id,
                Movie_id = movieDto.Movie_id
            }).ToList(),
        Actors_Movies = movieDto.Actors_Movies.Select(gm => new Actors_Movies
            {
                Actor_id = gm.Actor_id,
                Movie_id = movieDto.Movie_id,
                Role_of_actor_in_film = gm.Role_of_actor_in_film
            }).ToList()
        // Copy all other necessary properties
    };

    await _movieRepository.AddMovie(movie);

    return CreatedAtAction("GetMovie", new { id = movie.Movie_id }, movie);
}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            try
            {
                var deleted = await _movieRepository.DeleteMovie(id);
                if (!deleted)
                {
                    return NotFound($"Movie with ID = {id} not found.");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
    }
}