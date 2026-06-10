using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePasswordsToBcrypt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$hnPDsLrfqVgCR7Zpl/hQheKd4gEa8kNFqQRXp4v3oaKFP5yZ3dNvG");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$qmJPFKPlePRWPFWwk0Y0L.uJCrfCPYzGYWJ0/hnJiGfHqcLPTBhLm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "$2a$11$hnPDsLrfqVgCR7Zpl/hQheKd4gEa8kNFqQRXp4v3oaKFP5yZ3dNvG");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "3820be471b75236bf93e1790ea484432");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "d003257014b8a10582419f1f84478281");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "f9a28b5d9ee09b2a5281a579d4f4090a");
        }
    }
}
