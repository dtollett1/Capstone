using Microsoft.EntityFrameworkCore.Migrations;

namespace CapstoneProject.Migrations
{
    public partial class AddLocationsToFilm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FilmId",
                table: "Locations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_FilmId",
                table: "Locations",
                column: "FilmId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Films_FilmId",
                table: "Locations",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Films_FilmId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_FilmId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "FilmId",
                table: "Locations");
        }
    }
}
