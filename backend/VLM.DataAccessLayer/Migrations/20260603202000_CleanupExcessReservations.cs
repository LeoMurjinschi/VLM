using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class CleanupExcessReservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Delete all pending reservations to clean up excess data
            // This ensures we can test the new reservation limiting properly
            migrationBuilder.Sql(
                "DELETE FROM \"Reservations\" WHERE \"Status\" = 'pending';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // No rollback needed for cleanup migration
        }
    }
}
