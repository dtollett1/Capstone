using Microsoft.EntityFrameworkCore.Migrations;

namespace CapstoneProject.Migrations
{
    public partial class AddsUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Reviews",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Locations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Locations");
        }
    }
}
