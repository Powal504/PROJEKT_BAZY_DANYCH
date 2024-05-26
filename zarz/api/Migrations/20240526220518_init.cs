using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
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
                    Actor_name = table.Column<string>(type: "text", nullable: true),
                    Actor_surname = table.Column<string>(type: "text", nullable: true)
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
                    Director_name = table.Column<string>(type: "text", nullable: true),
                    Director_surname = table.Column<string>(type: "text", nullable: true)
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
                    Genre_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Genre_id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Movie_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Release_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Avatar = table.Column<byte[]>(type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Movie_id);
                });

            migrationBuilder.CreateTable(
                name: "Production_Companies",
                columns: table => new
                {
                    Company_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Company_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Production_Companies", x => x.Company_id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Role_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Role_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Role_id);
                });

            migrationBuilder.CreateTable(
                name: "Directors_Movies",
                columns: table => new
                {
                    Director_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Directors_Movies", x => new { x.Director_id, x.Movie_id });
                    table.ForeignKey(
                        name: "FK_Directors_Movies_Directors_Director_id",
                        column: x => x.Director_id,
                        principalTable: "Directors",
                        principalColumn: "Director_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Directors_Movies_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Genres_Movies",
                columns: table => new
                {
                    Genre_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres_Movies", x => new { x.Genre_id, x.Movie_id });
                    table.ForeignKey(
                        name: "FK_Genres_Movies_Genres_Genre_id",
                        column: x => x.Genre_id,
                        principalTable: "Genres",
                        principalColumn: "Genre_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Genres_Movies_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Actors",
                columns: table => new
                {
                    Actor_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Role_of_actor_in_film = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Actors", x => new { x.Actor_id, x.Movie_id });
                    table.ForeignKey(
                        name: "FK_Movie_Actors_Actors_Actor_id",
                        column: x => x.Actor_id,
                        principalTable: "Actors",
                        principalColumn: "Actor_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movie_Actors_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Movie_Catalog",
                columns: table => new
                {
                    Movie_catalog_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Movie_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Movie_Catalog", x => x.Movie_catalog_id);
                    table.ForeignKey(
                        name: "FK_Movie_Movie_Catalog_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Production_Companies",
                columns: table => new
                {
                    Company_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Production_Companies", x => new { x.Company_id, x.Movie_id });
                    table.ForeignKey(
                        name: "FK_Movie_Production_Companies_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Movie_Production_Companies_Production_Companies_Company_id",
                        column: x => x.Company_id,
                        principalTable: "Production_Companies",
                        principalColumn: "Company_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Role_id = table.Column<int>(type: "integer", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    State_of_user = table.Column<bool>(type: "boolean", nullable: true),
                    Phone_number = table.Column<string>(type: "text", nullable: true),
                    Birth_date = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_id);
                    table.ForeignKey(
                        name: "FK_Users_Role_Role_id",
                        column: x => x.Role_id,
                        principalTable: "Role",
                        principalColumn: "Role_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Movie_Catalog",
                columns: table => new
                {
                    Movie_catalog_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_id = table.Column<int>(type: "integer", nullable: false),
                    Catalog_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie_Catalog", x => x.Movie_catalog_id);
                    table.ForeignKey(
                        name: "FK_Movie_Catalog_Users_User_id",
                        column: x => x.User_id,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Review_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_id = table.Column<int>(type: "integer", nullable: false),
                    Movie_id = table.Column<int>(type: "integer", nullable: false),
                    Review_text = table.Column<string>(type: "text", nullable: true),
                    Review_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Review_mark = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Review_id);
                    table.ForeignKey(
                        name: "FK_Reviews_Movies_Movie_id",
                        column: x => x.Movie_id,
                        principalTable: "Movies",
                        principalColumn: "Movie_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_User_id",
                        column: x => x.User_id,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Directors_Movies_Movie_id",
                table: "Directors_Movies",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Genres_Movies_Movie_id",
                table: "Genres_Movies",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Actors_Movie_id",
                table: "Movie_Actors",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Catalog_User_id",
                table: "Movie_Catalog",
                column: "User_id");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Movie_Catalog_Movie_id",
                table: "Movie_Movie_Catalog",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Movie_Production_Companies_Movie_id",
                table: "Movie_Production_Companies",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Movie_id",
                table: "Reviews",
                column: "Movie_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_User_id",
                table: "Reviews",
                column: "User_id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Role_id",
                table: "Users",
                column: "Role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Directors_Movies");

            migrationBuilder.DropTable(
                name: "Genres_Movies");

            migrationBuilder.DropTable(
                name: "Movie_Actors");

            migrationBuilder.DropTable(
                name: "Movie_Catalog");

            migrationBuilder.DropTable(
                name: "Movie_Movie_Catalog");

            migrationBuilder.DropTable(
                name: "Movie_Production_Companies");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Directors");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "Actors");

            migrationBuilder.DropTable(
                name: "Production_Companies");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
