using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BetterResume.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileTitles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProfileTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderIndex = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileTitles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfileTitles_OrderIndex",
                table: "ProfileTitles",
                column: "OrderIndex");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileTitles");
        }
    }
}
