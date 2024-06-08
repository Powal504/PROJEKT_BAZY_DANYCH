using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Dto;
using api.Mappers;

namespace api.Services
{
    public interface IMovieRepository<E>
    {

        Task<IEnumerable<E>> GetByTitle(string movieTitle);
        Task<IEnumerable<E>> GetAll();
        Task<E> GetById(int? Id);
        Task AddMovie(E e);
        Task<bool> DeleteMovie(int id);

    }
}