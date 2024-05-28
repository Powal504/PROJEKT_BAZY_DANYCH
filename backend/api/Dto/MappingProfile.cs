using api.Models;
using api.Dto;
using AutoMapper;

namespace api.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Movies, MoviesDTO>();
            CreateMap<MoviesDTO, Movies>();
        }
    }
}
