using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dto
{
    public class AddFilmDTO
    {
        public string? Title { get; set; }
        public string? Release_date { get; set; }
        public string? Description { get; set; }
        public string? Avatar { get; set; }
        public List<string> Genres { get; set; }
    }
}