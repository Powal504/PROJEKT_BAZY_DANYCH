using AutoMapper;
using api.Models;
using api.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Mappers
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