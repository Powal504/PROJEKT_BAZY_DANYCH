using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dto;
using api.Models;

namespace api.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewDto ToDto(Reviews review)
        {
            return new ReviewDto
            {
                Review_id = review.Review_id,
                Movie_id = review.Movie_id,
                Review_text = review.Review_text,
                Review_date = review.Review_date?.ToString("dd.MM.yyyy"), // Formatujemy datę jako string
                Review_mark = review.Review_mark,
                UserId = review.User_id
            };
        }

        public static Reviews ToEntity(ReviewDto reviewDto)
        {
            return new Reviews
            {
                Review_id = reviewDto.Review_id,
                Movie_id = reviewDto.Movie_id,
                Review_text = reviewDto.Review_text,
                Review_date = string.IsNullOrEmpty(reviewDto.Review_date) ? (DateTime?)null : DateTime.ParseExact(reviewDto.Review_date, "dd.MM.yyyy", null), // Parsujemy datę ze stringa, jeśli istnieje
                Review_mark = reviewDto.Review_mark,
                User_id = reviewDto.UserId
            };
        }
    }
}
