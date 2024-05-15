using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Models;
namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        :base(dbContextOptions)
        {
        }
        public DbSet<User> Users{get;set;}
        public DbSet<Review> Reviews{get;set;}
        public DbSet<Rating> Ratings{get;set;}
        public DbSet<Movie> Movies{get;set;}
        
        public DbSet<Movie_Language> Movie_Languages{get;set;}
        public DbSet<Language> Languages{get;set;}
        public DbSet<Movie_Production_Company> Movie_Production_Companies{get;set;}
        public DbSet<Production_Company> Production_Companies{get;set;}
        public DbSet<Movie_Actor> Movie_Actors{get;set;}
        
        public DbSet<Genre> Genres{get;set;}
        public DbSet<Director> Directors{get;set;}
        public DbSet<Actor> Actors{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasKey(m => new { m.Movie_id, m.Genre_id, m.Director_id });
            modelBuilder.Entity<Movie_Actor>()
                .HasKey(ma=>new{ma.Movie_id,ma.Actor_id});
            modelBuilder.Entity<Movie_Language>()
                .HasKey(ml=>new{ml.Movie_id,ml.Language_id});
            modelBuilder.Entity<Movie_Production_Company>()
                .HasKey(mpc=>new{mpc.Company_id,mpc.Movie_id});
            modelBuilder.Entity<Rating>()
                .HasKey(r=>new{r.Movie_id,r.User_id,r.Rating_id});
        }
    }
}