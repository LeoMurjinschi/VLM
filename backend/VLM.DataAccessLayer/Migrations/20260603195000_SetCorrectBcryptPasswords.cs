using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SetCorrectBcryptPasswords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Enable pgcrypto extension for bcrypt hashing
            migrationBuilder.Sql("CREATE EXTENSION IF NOT EXISTS pgcrypto;");

            // Update donor passwords (donor123) for users 1 and 3
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = crypt('donor123', gen_salt('bf', 11)) WHERE \"Id\" IN (1, 3);");

            // Update receiver password (receiver123) for user 2
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = crypt('receiver123', gen_salt('bf', 11)) WHERE \"Id\" = 2;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback to placeholder hashes if migration is reversed
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$hnPDsLrfqVgCR7Zpl/hQheKd4gEa8kNFqQRXp4v3oaKFP5yZ3dNvG' WHERE \"Id\" IN (1, 3);");

            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$qmJPFKPlePRWPFWwk0Y0L.uJCrfCPYzGYWJ0/hnJiGfHqcLPTBhLm' WHERE \"Id\" = 2;");
        }
    }
}
