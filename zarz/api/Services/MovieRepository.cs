using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Dto;
using api.Mappers;

namespace api.Services
{
    public class MovieRepository : IMovieRepository<Movies>
    {
        private readonly ApplicationDBContext _context;

        public MovieRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Movies>> GetByTitle(string movieTitle)
        {
            List<Movies> list = await _context.Movies.Where(movie => movie.Title.Contains(movieTitle)).ToListAsync();
            return list;
        }

        public async Task<IEnumerable<Movies>> GetAll()
        {
            List<Movies> list = await _context.Movies.ToListAsync();
            
            return list;
        }
        public async Task<Movies> GetById(int? MovieId)
        {
            return await _context.Movies
                                .Include(c => c.GenresMovies)
                                .Include(c => c.Actors_Movies)
                                .SingleOrDefaultAsync(item => item.Movie_id == MovieId.Value);

        }

        public async Task Add(Movies movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
        }


}}