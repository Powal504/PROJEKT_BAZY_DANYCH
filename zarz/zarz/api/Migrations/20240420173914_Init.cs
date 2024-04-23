using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actors",
                columns: table => new
                {
                    Actor_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Actor_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actors", x => x.Actor_id);
                });

            migrationBuilder.CreateTable(
                name: "Directors",
                columns: table => new
                {
                    Director_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Director_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directors", x => x.Director_id);
                });

            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Genre_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Genre_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Genre_id);
                });

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Language_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Language_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Language_id);
                });

            migrationBuilder.CreateTable(
                name: "Production_Companies",
                columns: table => new
                {
                    Company_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Company_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Production_Companies", x => x.Company_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Genre_id = table.Column<int>(type: "integer", nullable: false),
                    Director_id = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Release_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => new { x.Movie_id, x.Genre_id, x.Director_id });
                    table.ForeignKey(
                        name: "FK_Movies_Directors_Director_id",
                        column: x => x.Director_id,
                        principalTable: "Directors",
                        principalColumn: "Director_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movies_Genres_Genre_id",
                        column: x => x.Genre_id,
                        principalTable: "Genres",
                        principalColumn: "Genre_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Actors",
                columns: table => new
                {
                    Actor_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id1 = table.Column<int>(type: "integer", nullable: false),
                    MovieGenre_id = table.Column<int>(type: "integer", nullable: false),
                    MovieDirector_id = table.Column<int>(type: "integer", nullable: false),
                    Actor_id1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Actors", x => new { x.Movie_id, x.Actor_id });
                    table.ForeignKey(
                        name: "FK_Movie_Actors_Actors_Actor_id1",
                        column: x => x.Actor_id1,
                        principalTable: "Actors",
                        principalColumn: "Actor_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movie_Actors_Movies_Movie_id1_MovieGenre_id_MovieDirector_id",
                        columns: x => new { x.Movie_id1, x.MovieGenre_id, x.MovieDirector_id },
                        principalTable: "Movies",
                        principalColumns: new[] { "Movie_id", "Genre_id", "Director_id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Languages",
                columns: table => new
                {
                    Language_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Language_id1 = table.Column<int>(type: "integer", nullable: false),
                    Movie_id1 = table.Column<int>(type: "integer", nullable: false),
                    MovieGenre_id = table.Column<int>(type: "integer", nullable: false),
                    MovieDirector_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Languages", x => new { x.Movie_id, x.Language_id });
                    table.ForeignKey(
                        name: "FK_Movie_Languages_Languages_Language_id1",
                        column: x => x.Language_id1,
                        principalTable: "Languages",
                        principalColumn: "Language_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movie_Languages_Movies_Movie_id1_MovieGenre_id_MovieDirecto~",
                        columns: x => new { x.Movie_id1, x.MovieGenre_id, x.MovieDirector_id },
                        principalTable: "Movies",
                        principalColumns: new[] { "Movie_id", "Genre_id", "Director_id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Production_Companies",
                columns: table => new
                {
                    Company_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Company_id1 = table.Column<int>(type: "integer", nullable: false),
                    Movie_id1 = table.Column<int>(type: "integer", nullable: false),
                    MovieGenre_id = table.Column<int>(type: "integer", nullable: false),
                    MovieDirector_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Production_Companies", x => new { x.Company_id, x.Movie_id });
                    table.ForeignKey(
                        name: "FK_Movie_Production_Companies_Movies_Movie_id1_MovieGenre_id_M~",
                        columns: x => new { x.Movie_id1, x.MovieGenre_id, x.MovieDirector_id },
                        principalTable: "Movies",
                        principalColumns: new[] { "Movie_id", "Genre_id", "Director_id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movie_Production_Companies_Production_Companies_Company_id1",
                        column: x => x.Company_id1,
                        principalTable: "Production_Companies",
                        principalColumn: "Company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    User_id = table.Column<int>(type: "integer", nullable: false),
                    Rating_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id1 = table.Column<int>(type: "integer", nullable: false),
                    MovieGenre_id = table.Column<int>(type: "integer", nullable: false),
                    MovieDirector_id = table.Column<int>(type: "integer", nullable: false),
                    User_id1 = table.Column<int>(type: "integer", nullable: false),
                    Rating_value = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => new { x.Movie_id, x.User_id, x.Rating_id });
                    table.ForeignKey(
                        name: "FK_Ratings_Movies_Movie_id1_MovieGenre_id_MovieDirector_id",
                        columns: x => new { x.Movie_id1, x.MovieGenre_id, x.MovieDirector_id },
                        principalTable: "Movies",
                        principalColumns: new[] { "Movie_id", "Genre_id", "Director_id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ratings_Users_User_id1",
                        column: x => x.User_id1,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Review_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_id = table.Column<int>(type: "integer", nullable: false),
                    User_id1 = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id1 = table.Column<int>(type: "integer", nullable: false),
                    MovieGenre_id = table.Column<int>(type: "integer", nullable: false),
                    MovieDirector_id = table.Column<int>(type: "integer", nullable: false),
                    Review_text = table.Column<string>(type: "text", nullable: false),
                    Review_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Review_Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Movies_Movie_id1_MovieGenre_id_MovieDirector_id",
                        columns: x => new { x.Movie_id1, x.MovieGenre_id, x.MovieDirector_id },
                        principalTable: "Movies",
                        principalColumns: new[] { "Movie_id", "Genre_id", "Director_id" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_User_id1",
                        column: x => x.User_id1,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Actors_Actor_id1",
                table: "Movie_Actors",
                column: "Actor_id1");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Actors_Movie_id1_MovieGenre_id_MovieDirector_id",
                table: "Movie_Actors",
                columns: new[] { "Movie_id1", "MovieGenre_id", "MovieDirector_id" });

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Languages_Language_id1",
                table: "Movie_Languages",
                column: "Language_id1");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Languages_Movie_id1_MovieGenre_id_MovieDirector_id",
                table: "Movie_Languages",
                columns: new[] { "Movie_id1", "MovieGenre_id", "MovieDirector_id" });

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Production_Companies_Company_id1",
                table: "Movie_Production_Companies",
                column: "Company_id1");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Production_Companies_Movie_id1_MovieGenre_id_MovieDir~",
                table: "Movie_Production_Companies",
                columns: new[] { "Movie_id1", "MovieGenre_id", "MovieDirector_id" });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_Director_id",
                table: "Movies",
                column: "Director_id");

            migrationBuilder.CreateIndex(
                name: "IX_Movies_Genre_id",
                table: "Movies",
                column: "Genre_id");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_Movie_id1_MovieGenre_id_MovieDirector_id",
                table: "Ratings",
                columns: new[] { "Movie_id1", "MovieGenre_id", "MovieDirector_id" });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_User_id1",
                table: "Ratings",
                column: "User_id1");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Movie_id1_MovieGenre_id_MovieDirector_id",
                table: "Reviews",
                columns: new[] { "Movie_id1", "MovieGenre_id", "MovieDirector_id" });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_User_id1",
                table: "Reviews",
                column: "User_id1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movie_Actors");

            migrationBuilder.DropTable(
                name: "Movie_Languages");

            migrationBuilder.DropTable(
                name: "Movie_Production_Companies");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Actors");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Production_Companies");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Directors");

            migrationBuilder.DropTable(
                name: "Genres");
        }
    }
}
