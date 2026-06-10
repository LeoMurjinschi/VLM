using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDonationExpirationDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Update expiration dates to be in the future (30 days from now)
            migrationBuilder.Sql(
                "UPDATE \"Donations\" SET \"ExpirationDate\" = CURRENT_TIMESTAMP + INTERVAL '30 days' WHERE \"Id\" IN (1, 2, 3);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback to original dates
            migrationBuilder.Sql(
                "UPDATE \"Donations\" SET \"ExpirationDate\" = '2026-02-01' WHERE \"Id\" = 1;");
            migrationBuilder.Sql(
                "UPDATE \"Donations\" SET \"ExpirationDate\" = '2026-01-14' WHERE \"Id\" = 2;");
            migrationBuilder.Sql(
                "UPDATE \"Donations\" SET \"ExpirationDate\" = '2026-01-15' WHERE \"Id\" = 3;");
        }
    }
}
