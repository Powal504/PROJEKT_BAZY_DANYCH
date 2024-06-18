using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using System.Globalization;


namespace api.Mappers
{
    public static class FilmMappers
    {
        public static async Task<Movies> ToFilmAsync(this AddFilmDTO addFilmDTO, ApplicationDBContext context)
{
    var movie = new Movies
    {
        Title = addFilmDTO.Title,
        Release_date = string.IsNullOrEmpty(addFilmDTO.Release_date)
    ? (DateTime?)null
    : DateTime.SpecifyKind(DateTime.ParseExact(addFilmDTO.Release_date, "dd.MM.yyyy", CultureInfo.InvariantCulture), DateTimeKind.Utc),
        Description = addFilmDTO.Description,
        Avatar = addFilmDTO.Avatar 
    };

    if (addFilmDTO.Genres != null && addFilmDTO.Genres.Any())
    {
        var genreIds = await context.Genres
            .Where(g => addFilmDTO.Genres.Contains(g.Genre_name))
            .Select(g => g.Genre_id)
            .ToListAsync();

        movie.GenresMovies = genreIds.Select(genreId => new Genres_Movies
        {
            Genre_id = genreId,
            Movie = movie
        }).ToList();
    }

    return movie;
}
        public static AddFilmDTO ToDto(this Movies film)
        {
            var dto = new AddFilmDTO
            {
                Title = film.Title,
                Release_date = film.Release_date?.ToString("dd.MM.yyyy"),
                Description = film.Description,
                Avatar = film.Avatar 
            };

            if (film.GenresMovies != null)
            {
                dto.Genres = film.GenresMovies
                    .Select(gm => gm.Genre.Genre_name)
                    .ToList();
            }
            else
            {
                dto.Genres = new List<string>();
            }

            return dto;
        }
    }
}
