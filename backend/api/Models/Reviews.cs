using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Reviews
    {
        [Key]
        public int Review_Id { get; set; }
        public int UserId { get; set; }
        public Users User{get;set;}
        public int MovieId { get; set; }
        public Movies Movie{get;set;}
        public string? Review_text { get; set; }
        public DateTime? Review_date { get; set; }=DateTime.Now;
        public int? Review_mark { get; set; }

    }
}