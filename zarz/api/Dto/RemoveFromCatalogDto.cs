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
    public class RemoveFromCatalogDto
    {
        public int Movie_Catalog_id {get; set;} = 0;
        public int Movie_id {get; set;} = 0;
    }
}