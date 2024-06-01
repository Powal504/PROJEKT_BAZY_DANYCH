using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<Users>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
        }

        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<Movies> Movies { get; set; }


        public DbSet<Movie_Production_Companies> Movie_Production_Companies { get; set; }
        public DbSet<Production_Companies> Production_Companies { get; set; }
        public DbSet<Actors_Movies> Movie_Actors { get; set; }
        public DbSet<Genres_Movies> Genres_Movies { get; set; }

        public DbSet<Genres> Genres { get; set; }
        public DbSet<Directors> Directors { get; set; }
        public DbSet<Directors_Movies>Directors_Movies {get;set;}
        public DbSet<Actors> Actors { get; set; }
        public DbSet<Movie_Catalog> Movie_Catalog { get; set; }
        public DbSet<Movie_Movie_Catalog> Movie_Movie_Catalog { get; set; }
        
        
 protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Genres_Movies>()
                .HasKey(gm => new { gm.Genre_id, gm.Movie_id }); 

            modelBuilder.Entity<Genres_Movies>()
                .HasOne(gm => gm.Genre)
                .WithMany(g => g.GenresMovies)
                .HasForeignKey(gm => gm.Genre_id);

            modelBuilder.Entity<Genres_Movies>()
                .HasOne(gm => gm.Movie)
                .WithMany(m => m.GenresMovies)
                .HasForeignKey(gm => gm.Movie_id);





                modelBuilder.Entity<Directors_Movies>()
                .HasKey(dm => new { dm.Director_id, dm.Movie_id }); 

            modelBuilder.Entity<Directors_Movies>()
                .HasOne(dm => dm.Director)
                .WithMany(d => d.DirectorsMovies)
                .HasForeignKey(dm => dm.Director_id);

            modelBuilder.Entity<Directors_Movies>()
                .HasOne(dm => dm.Movie)
                .WithMany(m => m.DirectorsMovies)
                .HasForeignKey(dm => dm.Movie_id);



                modelBuilder.Entity<Movie_Production_Companies>()
                .HasKey(mp => new { mp.Company_id, mp.Movie_id });

            modelBuilder.Entity<Movie_Production_Companies>()
                .HasOne(mp => mp.Company)
                .WithMany(c => c.MovieProductionCompanies)
                .HasForeignKey(mp => mp.Company_id);

            modelBuilder.Entity<Movie_Production_Companies>()
                .HasOne(mp => mp.Movie)
                .WithMany(m => m.MovieProductionCompanies)
                .HasForeignKey(mp => mp.Movie_id);


modelBuilder.Entity<Movie_Movie_Catalog>()
        .HasKey(mc => new { mc.Movie_id, mc.Movie_Catalog_id });

    modelBuilder.Entity<Movie_Movie_Catalog>()
        .HasOne(mc => mc.Movie)
        .WithMany(m => m.MovieMovieCatalogs)
        .HasForeignKey(mc => mc.Movie_id);

    modelBuilder.Entity<Movie_Movie_Catalog>()
        .HasOne(mc => mc.Movie_Catalog)
        .WithMany(c => c.MovieMovieCatalogs)
        .HasForeignKey(mc => mc.Movie_Catalog_id);



                 modelBuilder.Entity<Actors_Movies>()
                .HasKey(am => new { am.Actor_id, am.Movie_id });

            // Configure relationships
            modelBuilder.Entity<Actors_Movies>()
                .HasOne(am => am.Actor)
                .WithMany(a => a.Actors_Movies)
                .HasForeignKey(am => am.Actor_id);

            modelBuilder.Entity<Actors_Movies>()
                .HasOne(am => am.Movie)
                .WithMany(m => m.Actors_Movies)
                .HasForeignKey(am => am.Movie_id);



                base.OnModelCreating(modelBuilder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole
                {
                    Name="User",
                    NormalizedName="USER"
                },
                
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
        

    }
}