using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Reviews
    {
        [Key]
        public int Review_id { get; set; }
        public string User_id { get; set; }
        [ForeignKey("User_id")]
        public Users User{get;set;}
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
        public Movies Movie{get;set;}
        public string? Review_text { get; set; }
        public DateTime? Review_date { get; set; }
        public int? Review_mark { get; set; }

    }
}