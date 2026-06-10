using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddPickupCoordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PickupLatitude",
                table: "Donations",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PickupLongitude",
                table: "Donations",
                type: "numeric",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PickupLatitude", "PickupLongitude" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "PickupLatitude", "PickupLongitude" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "PickupLatitude", "PickupLongitude" },
                values: new object[] { null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PickupLatitude",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "PickupLongitude",
                table: "Donations");
        }
    }
}
