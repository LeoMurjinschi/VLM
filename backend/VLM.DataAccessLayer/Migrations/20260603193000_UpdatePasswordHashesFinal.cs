using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePasswordHashesFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Bcrypt hash for "donor123"
            var donorPassword = "$2a$11$8R9vYlGSX2/bnXrXBQsJoesVzKM3pwzeLjL/h8U6P/j2HYMKjCPxe";
            // Bcrypt hash for "receiver123"
            var receiverPassword = "$2a$11$2LQv4Q2Zm5K6PgZDwN.BO.nM8VIK8/mzcN1Yd.Dj8.y2p4Z7tZuLe";

            // Update Alex Donor (Id = 1)
            migrationBuilder.Sql($"UPDATE \"Users\" SET \"PasswordHash\" = '{donorPassword}' WHERE \"Id\" = 1;");

            // Update Maria Receiver (Id = 2)
            migrationBuilder.Sql($"UPDATE \"Users\" SET \"PasswordHash\" = '{receiverPassword}' WHERE \"Id\" = 2;");

            // Update John Donor (Id = 3)
            migrationBuilder.Sql($"UPDATE \"Users\" SET \"PasswordHash\" = '{donorPassword}' WHERE \"Id\" = 3;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback - set back to placeholder hashes
            migrationBuilder.Sql("UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$hnPDsLrfqVgCR7Zpl/hQheKd4gEa8kNFqQRXp4v3oaKFP5yZ3dNvG' WHERE \"Id\" IN (1, 3);");
            migrationBuilder.Sql("UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$qmJPFKPlePRWPFWwk0Y0L.uJCrfCPYzGYWJ0/hnJiGfHqcLPTBhLm' WHERE \"Id\" = 2;");
        }
    }
}
