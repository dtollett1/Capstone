using Microsoft.EntityFrameworkCore.Migrations;

namespace CapstoneProject.Migrations
{
    public partial class AddPosterToFilm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Telephone",
                table: "Locations");

            migrationBuilder.AddColumn<string>(
                name: "Movie",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Poster",
                table: "Films",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Movie",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Poster",
                table: "Films");

            migrationBuilder.AddColumn<string>(
                name: "Telephone",
                table: "Locations",
                type: "text",
                nullable: true);
        }
    }
}
