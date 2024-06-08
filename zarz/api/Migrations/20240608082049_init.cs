using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4133f66d-46c8-4911-a80f-7e5aed134fc5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "546f3ddc-a1e5-4a95-b0d8-651151a049af");

            migrationBuilder.AddColumn<DateTime>(
                name: "Review_date",
                table: "Reviews",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48d10a6d-906c-4a83-8abb-6403fe14c5e3", null, "User", "USER" },
                    { "a09b1456-6d72-4020-bb1e-94c2e7ebab30", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48d10a6d-906c-4a83-8abb-6403fe14c5e3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a09b1456-6d72-4020-bb1e-94c2e7ebab30");

            migrationBuilder.DropColumn(
                name: "Review_date",
                table: "Reviews");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4133f66d-46c8-4911-a80f-7e5aed134fc5", null, "Admin", "ADMIN" },
                    { "546f3ddc-a1e5-4a95-b0d8-651151a049af", null, "User", "USER" }
                });
        }
    }
}
