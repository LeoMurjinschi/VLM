using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddVerificationDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Messages",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Notifications",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Reports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserProfiles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UserSettings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserSettings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserSettings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AddColumn<string>(
                name: "VerificationDocument",
                table: "UserProfiles",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Icon" },
                values: new object[] { "Fresh fruits and produce.", null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Icon", "Name" },
                values: new object[] { "Bread, pastries and baked goods.", null, "Bakery" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Icon", "Name" },
                values: new object[] { "Milk, cheese and dairy products.", null, "Dairy" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "hashed_password_1");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "hashed_password_2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "hashed_password_3");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VerificationDocument",
                table: "UserProfiles");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Icon" },
                values: new object[] { "Fresh fruits and berries", "🍎" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Icon", "Name" },
                values: new object[] { "Fresh vegetables and greens", "🥦", "Vegetables" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Icon", "Name" },
                values: new object[] { "Bread, pastries and baked goods", "🍞", "Bakery" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "Description", "Icon", "IsActive", "Name" },
                values: new object[,]
                {
                    { 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Milk, cheese, yogurt and eggs", "🥛", true, "Dairy" },
                    { 5, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Prepared and cooked meals", "🍲", true, "Cooked Food" }
                });

            migrationBuilder.InsertData(
                table: "Favorites",
                columns: new[] { "Id", "CreatedDate", "DonationId", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 10, 14, 0, 0, 0, DateTimeKind.Utc), 1, 2 },
                    { 2, new DateTime(2026, 1, 11, 10, 0, 0, 0, DateTimeKind.Utc), 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "Id", "CreatedDate", "ReceiverId", "SenderId", "Text" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 12, 8, 0, 0, 0, DateTimeKind.Utc), 1, 2, "Hi Alex! Is the milk still available for pickup tomorrow?" },
                    { 2, new DateTime(2026, 1, 12, 8, 30, 0, 0, DateTimeKind.Utc), 2, 1, "Yes, it is! You can come anytime between 8 and 12." },
                    { 3, new DateTime(2026, 1, 12, 8, 45, 0, 0, DateTimeKind.Utc), 1, 2, "Perfect, I'll be there at 9. Thank you!" }
                });

            migrationBuilder.InsertData(
                table: "Notifications",
                columns: new[] { "Id", "CreatedDate", "Description", "IsRead", "Link", "Title", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 12, 9, 0, 0, 0, DateTimeKind.Utc), "Maria Receiver reserved 5L of Milk from your donation.", true, "/reservations/1", "New Reservation", "reservation", 1 },
                    { 2, new DateTime(2026, 1, 12, 10, 0, 0, 0, DateTimeKind.Utc), "Your reservation for Milk has been confirmed by the donor.", false, "/reservations/1", "Reservation Confirmed", "reservation", 2 },
                    { 3, new DateTime(2026, 1, 10, 8, 0, 0, 0, DateTimeKind.Utc), "Fresh Apples are available for pickup near you.", false, "/donations/1", "New Donation Available", "donation", 2 }
                });

            migrationBuilder.InsertData(
                table: "Reports",
                columns: new[] { "Id", "CreatedDate", "Description", "DonationId", "Reason", "ReporterId", "ResolvedDate", "Status" },
                values: new object[] { 1, new DateTime(2026, 1, 13, 10, 0, 0, 0, DateTimeKind.Utc), "The quantity listed does not match what was available on pickup.", 2, "Incorrect information", 2, null, "pending" });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "AcceptedCategories", "Address", "Description", "HasIndustrialStorage", "Location", "MissionStatement", "OperatingHours", "OperatingRadius", "OrgName", "Phone", "TransportType", "UserId", "Verified" },
                values: new object[,]
                {
                    { 1, "Fruits,Vegetables,Dairy", "Str. Principala 12, Cluj-Napoca", "Local farmer donating surplus produce.", false, "Cluj-Napoca", "Reduce food waste in our community.", "Mon-Fri 8:00-18:00", 15, "Alex's Farm", "+40712345678", "Van", 1, true },
                    { 2, "Fruits,Vegetables,Bakery,Cooked Food,Dairy", "Bd. Eroilor 10, Cluj-Napoca", "Community kitchen serving daily meals.", false, "Cluj-Napoca", "No one goes hungry in our neighborhood.", "Daily 7:00-20:00", 10, "Maria's Kitchen", "+40723456789", "Car", 2, true },
                    { 3, "Dairy", "Bd. Eroilor 5, Cluj-Napoca", "Small local dairy farm.", true, "Cluj-Napoca", "Fresh dairy products for everyone.", "Mon-Sat 6:00-16:00", 20, "John's Dairy", "+40734567890", "Truck", 3, false }
                });

            migrationBuilder.InsertData(
                table: "UserSettings",
                columns: new[] { "Id", "EmailUpdates", "NotifyEmail", "NotifyPush", "NotifySms", "Theme", "UserId" },
                values: new object[,]
                {
                    { 1, true, true, true, false, "light", 1 },
                    { 2, false, true, true, true, "light", 2 },
                    { 3, true, true, false, false, "dark", 3 }
                });

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
