using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dto
{
    public class ReviewDto
    {
        public int Review_id{get;set;}
        public int Movie_id { get; set; }
        public string? Review_text { get; set; }
        public DateTime? Review_date { get; set; }
        public int? Review_mark { get; set; }
    }
}
