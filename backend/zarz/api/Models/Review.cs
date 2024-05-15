using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Review
    {
        [Key]
        public int Review_Id { get; set; }
        public int User_id { get; set; }
        public User User{get;set;}
        public int Movie_id { get; set; }
        public Movie Movie{get;set;}
        public string Review_text { get; set; }
        public DateTime Review_date { get; set; }

    }
}