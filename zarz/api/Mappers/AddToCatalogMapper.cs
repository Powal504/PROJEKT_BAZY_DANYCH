using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;

namespace api.Mappers
{
    public static class AddToCatalogMapper
    {
        public static Movie_Movie_Catalog ToEntity(this AddToCatalogDto addToCatalogDto)
        {
            return new Movie_Movie_Catalog
            {
                Movie_Catalog_id = addToCatalogDto.Movie_Catalog_id,

                

            };
        }
        
    }
}
