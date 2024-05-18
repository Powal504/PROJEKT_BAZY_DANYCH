using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
           // _mapper = mapper;
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

        // POST: api/Movies
        // [HttpPost]
        // public async Task<ActionResult<Movies>> PostMovie(Movies movieDto)
        // {
        //     if (movieDto == null) BadRequest();
        //      var movie = _mapper.Map<Movies>(movieDto);
        //     await _movieRepository.Add(movie);
        //     return CreatedAtAction("GetMovie", new { id = movie.Movie_id }, movie);
        // }
        
    }
}