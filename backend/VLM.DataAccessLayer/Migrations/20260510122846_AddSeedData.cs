using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Bio", "CreatedDate", "Email", "Name", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 1, "I love helping my community by donating food.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "alex@vlm.com", "Alex Donor", "hashed_password_1", "Donor" },
                    { 2, "Grateful for every donation I receive.", new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "maria@vlm.com", "Maria Receiver", "hashed_password_2", "Receiver" },
                    { 3, "Regular donor since 2025.", new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "john@vlm.com", "John Donor", "hashed_password_3", "Donor" }
                });

            migrationBuilder.InsertData(
                table: "Donations",
                columns: new[] { "Id", "CreatedDate", "Description", "DonorId", "Quantity", "Status", "Title", "Unit", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 10, 0, 0, 0, 0, DateTimeKind.Utc), "Freshly picked apples from my garden. Available for pickup.", 1, 10m, "Available", "Fresh Apples", "kg", null },
                    { 2, new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), "Freshly baked sourdough bread, 3 loaves available.", 1, 3m, "Available", "Homemade Bread", "pcs", null },
                    { 3, new DateTime(2026, 1, 12, 0, 0, 0, 0, DateTimeKind.Utc), "Fresh whole milk from local farm. Expires in 3 days.", 3, 5m, "Reserved", "Milk", "L", null }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "Id", "CreatedDate", "DonorId", "Rating", "ReceiverId", "Text" },
                values: new object[] { 1, new DateTime(2026, 1, 15, 0, 0, 0, 0, DateTimeKind.Utc), 1, 5, 2, "Alex was very generous and the food was excellent quality!" });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "CreatedDate", "DonationId", "ParentCommentId", "Text", "UpdatedDate", "UserId" },
                values: new object[] { 1, new DateTime(2026, 1, 10, 12, 0, 0, 0, DateTimeKind.Utc), 1, null, "This looks amazing! I would love to pick this up.", null, 2 });

            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "Id", "CreatedDate", "DonationId", "Notes", "Status", "UpdatedDate", "UserId" },
                values: new object[] { 1, new DateTime(2026, 1, 12, 9, 0, 0, 0, DateTimeKind.Utc), 3, "I will pick up on Friday morning.", "Approved", null, 2 });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "CreatedDate", "DonationId", "ParentCommentId", "Text", "UpdatedDate", "UserId" },
                values: new object[] { 2, new DateTime(2026, 1, 10, 13, 0, 0, 0, DateTimeKind.Utc), 1, 1, "Thank you for your kind words! You can pick it up anytime.", null, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Reservations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Reviews",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Donations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
