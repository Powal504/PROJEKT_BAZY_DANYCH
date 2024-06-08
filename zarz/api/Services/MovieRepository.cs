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

            if (MovieId == null)
    {
        throw new ArgumentNullException(nameof(MovieId));
    } else {
        return await _context.Movies
                                .SingleOrDefaultAsync(item => item.Movie_id == MovieId.Value);
    }
            

        }

        public async Task AddMovie(Movies movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteMovie(int id)
        {
            var movie = await _context.Movies
                .Include(m => m.GenresMovies)
                .Include(m => m.DirectorsMovies)
                .Include(m => m.MovieProductionCompanies)
                .Include(m => m.Actors_Movies)
                .FirstOrDefaultAsync(m => m.Movie_id == id);

            if (movie == null)
            {
                return false;
            }

            _context.Genres_Movies.RemoveRange(movie.GenresMovies);
            _context.Directors_Movies.RemoveRange(movie.DirectorsMovies);
            _context.Movie_Production_Companies.RemoveRange(movie.MovieProductionCompanies);
            _context.Movie_Actors.RemoveRange(movie.Actors_Movies);

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return true;
        }


}}