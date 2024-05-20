﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    partial class ApplicationDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Actors", b =>
                {
                    b.Property<int>("Actor_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Actor_id"));

                    b.Property<string>("Actor_name")
                        .HasColumnType("text");

                    b.Property<string>("Actor_surname")
                        .HasColumnType("text");

                    b.HasKey("Actor_id");

                    b.ToTable("Actors");
                });

            modelBuilder.Entity("api.Models.Actors_Movies", b =>
                {
                    b.Property<int>("Actor_id")
                        .HasColumnType("integer");

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.Property<string>("Role_of_actor_in_film")
                        .HasColumnType("text");

                    b.HasKey("Actor_id", "Movie_id");

                    b.HasIndex("Movie_id");

                    b.ToTable("Movie_Actors");
                });

            modelBuilder.Entity("api.Models.Directors", b =>
                {
                    b.Property<int>("Director_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Director_id"));

                    b.Property<string>("Director_name")
                        .HasColumnType("text");

                    b.Property<string>("Director_surname")
                        .HasColumnType("text");

                    b.HasKey("Director_id");

                    b.ToTable("Directors");
                });

            modelBuilder.Entity("api.Models.Directors_Movies", b =>
                {
                    b.Property<int>("Director_id")
                        .HasColumnType("integer");

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.HasKey("Director_id", "Movie_id");

                    b.HasIndex("Movie_id");

                    b.ToTable("Directors_Movies");
                });

            modelBuilder.Entity("api.Models.Genres", b =>
                {
                    b.Property<int>("Genre_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Genre_id"));

                    b.Property<string>("Genre_name")
                        .HasColumnType("text");

                    b.HasKey("Genre_id");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("api.Models.Genres_Movies", b =>
                {
                    b.Property<int>("Genre_id")
                        .HasColumnType("integer");

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.HasKey("Genre_id", "Movie_id");

                    b.HasIndex("Movie_id");

                    b.ToTable("Genres_Movies");
                });

            modelBuilder.Entity("api.Models.Movie_Catalog", b =>
                {
                    b.Property<int>("Movie_catalog_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Movie_catalog_id"));

                    b.Property<string>("Catalog_name")
                        .HasColumnType("text");

                    b.Property<int>("User_id")
                        .HasColumnType("integer");

                    b.HasKey("Movie_catalog_id");

                    b.HasIndex("User_id");

                    b.ToTable("Movie_Catalog");
                });

            modelBuilder.Entity("api.Models.Movie_Movie_Catalog", b =>
                {
                    b.Property<int>("Movie_catalog_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Movie_catalog_id"));

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.HasKey("Movie_catalog_id");

                    b.HasIndex("Movie_id");

                    b.ToTable("Movie_Movie_Catalog");
                });

            modelBuilder.Entity("api.Models.Movie_Production_Companies", b =>
                {
                    b.Property<int>("Company_id")
                        .HasColumnType("integer");

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.HasKey("Company_id", "Movie_id");

                    b.HasIndex("Movie_id");

                    b.ToTable("Movie_Production_Companies");
                });

            modelBuilder.Entity("api.Models.Movies", b =>
                {
                    b.Property<int>("Movie_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Movie_id"));

                    b.Property<string>("Avatar")
                        .HasColumnType("text");

                    b.Property<string>("Descritpion")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Release_date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Movie_id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("api.Models.Production_Companies", b =>
                {
                    b.Property<int>("Company_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Company_id"));

                    b.Property<string>("Company_name")
                        .HasColumnType("text");

                    b.HasKey("Company_id");

                    b.ToTable("Production_Companies");
                });

            modelBuilder.Entity("api.Models.Reviews", b =>
                {
                    b.Property<int>("Review_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Review_id"));

                    b.Property<int>("Movie_id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Review_date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Review_mark")
                        .HasColumnType("integer");

                    b.Property<string>("Review_text")
                        .HasColumnType("text");

                    b.Property<int>("User_id")
                        .HasColumnType("integer");

                    b.HasKey("Review_id");

                    b.HasIndex("Movie_id");

                    b.HasIndex("User_id");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("api.Models.Role", b =>
                {
                    b.Property<int>("Role_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Role_id"));

                    b.Property<string>("Role_name")
                        .HasColumnType("text");

                    b.HasKey("Role_id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("api.Models.Users", b =>
                {
                    b.Property<int>("User_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("User_id"));

                    b.Property<string>("Birth_date")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone_number")
                        .HasColumnType("text");

                    b.Property<int>("Role_id")
                        .HasColumnType("integer");

                    b.Property<bool?>("State_of_user")
                        .HasColumnType("boolean");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("User_id");

                    b.HasIndex("Role_id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("api.Models.Actors_Movies", b =>
                {
                    b.HasOne("api.Models.Actors", "Actor")
                        .WithMany("Actors_Movies")
                        .HasForeignKey("Actor_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany("Actors_Movies")
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Actor");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("api.Models.Directors_Movies", b =>
                {
                    b.HasOne("api.Models.Directors", "Director")
                        .WithMany("DirectorsMovies")
                        .HasForeignKey("Director_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany("DirectorsMovies")
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Director");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("api.Models.Genres_Movies", b =>
                {
                    b.HasOne("api.Models.Genres", "Genre")
                        .WithMany("GenresMovies")
                        .HasForeignKey("Genre_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany("GenresMovies")
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("api.Models.Movie_Catalog", b =>
                {
                    b.HasOne("api.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("User_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.Movie_Movie_Catalog", b =>
                {
                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany("MovieMovieCatalogs")
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("api.Models.Movie_Production_Companies", b =>
                {
                    b.HasOne("api.Models.Production_Companies", "Company")
                        .WithMany("MovieProductionCompanies")
                        .HasForeignKey("Company_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany("MovieProductionCompanies")
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("api.Models.Reviews", b =>
                {
                    b.HasOne("api.Models.Movies", "Movie")
                        .WithMany()
                        .HasForeignKey("Movie_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("User_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.Users", b =>
                {
                    b.HasOne("api.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("Role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("api.Models.Actors", b =>
                {
                    b.Navigation("Actors_Movies");
                });

            modelBuilder.Entity("api.Models.Directors", b =>
                {
                    b.Navigation("DirectorsMovies");
                });

            modelBuilder.Entity("api.Models.Genres", b =>
                {
                    b.Navigation("GenresMovies");
                });

            modelBuilder.Entity("api.Models.Movies", b =>
                {
                    b.Navigation("Actors_Movies");

                    b.Navigation("DirectorsMovies");

                    b.Navigation("GenresMovies");

                    b.Navigation("MovieMovieCatalogs");

                    b.Navigation("MovieProductionCompanies");
                });

            modelBuilder.Entity("api.Models.Production_Companies", b =>
                {
                    b.Navigation("MovieProductionCompanies");
                });
#pragma warning restore 612, 618
        }
    }
}
