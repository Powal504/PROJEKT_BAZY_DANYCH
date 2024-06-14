using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NuGet.Protocol.Plugins;

namespace api.Dto
{
    public class CreateMovie_CatalogDto
    {

        public string Catalog_name{get; set;} = string.Empty;

        public IEnumerable<string> AddMovies {get; set;} = new List<string>{};

    }
}