using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace codegather.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCompetition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Competitions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Competitions");
        }
    }
}
