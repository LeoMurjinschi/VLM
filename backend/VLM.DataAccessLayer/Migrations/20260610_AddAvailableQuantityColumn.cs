using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddAvailableQuantityColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvailableQuantity",
                table: "Donations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            // Set AvailableQuantity to match Quantity for all existing donations
            migrationBuilder.Sql("UPDATE \"Donations\" SET \"AvailableQuantity\" = \"Quantity\"");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableQuantity",
                table: "Donations");
        }
    }
}
