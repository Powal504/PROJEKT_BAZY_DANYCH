using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;

namespace api.Mappers
{
    public static class CatalogMapper
    {
        public static Movie_Catalog ToEntity(this Movie_CatalogDto movie_CatalogDto)
        {
            return new Movie_Catalog
            {

                Catalog_name = movie_CatalogDto.Catalog_name

            };
        }
        
    }
}
