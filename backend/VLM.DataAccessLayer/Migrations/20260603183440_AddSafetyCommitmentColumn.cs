using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddSafetyCommitmentColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SystemSettings_Users_UpdatedById",
                table: "SystemSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_SystemSettings_Key",
                table: "SystemSettings");

            migrationBuilder.DeleteData(
                table: "AccountApprovals",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AccountApprovals",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AccountApprovals",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AdminActions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AdminActions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AdminActions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AdminAnnouncements",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SystemSettings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SystemSettings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SystemSettings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AddColumn<bool>(
                name: "HasAcceptedSafetyCommitment",
                table: "Users",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId",
                table: "AccountApprovals",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId1",
                table: "AccountApprovals",
                type: "integer",
                nullable: true);

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
                columns: new[] { "Id", "AcceptedCategories", "Address", "Description", "HasIndustrialStorage", "Location", "MissionStatement", "OperatingHours", "OperatingRadius", "OrgName", "Phone", "TransportType", "UserId", "VerificationDocument", "Verified" },
                values: new object[,]
                {
                    { 1, "Fruits,Vegetables,Dairy", "Str. Principala 12, Cluj-Napoca", "Local farmer donating surplus produce.", false, "Cluj-Napoca", "Reduce food waste in our community.", "Mon-Fri 8:00-18:00", 15, "Alex's Farm", "+40712345678", "Van", 1, null, true },
                    { 2, "Fruits,Vegetables,Bakery,Cooked Food,Dairy", "Bd. Eroilor 10, Cluj-Napoca", "Community kitchen serving daily meals.", false, "Cluj-Napoca", "No one goes hungry in our neighborhood.", "Daily 7:00-20:00", 10, "Maria's Kitchen", "+40723456789", "Car", 2, null, true },
                    { 3, "Dairy", "Bd. Eroilor 5, Cluj-Napoca", "Small local dairy farm.", true, "Cluj-Napoca", "Fresh dairy products for everyone.", "Mon-Sat 6:00-16:00", 20, "John's Dairy", "+40734567890", "Truck", 3, null, false }
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
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "HasAcceptedSafetyCommitment" },
                values: new object[] { "pending", null, null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "HasAcceptedSafetyCommitment" },
                values: new object[] { "pending", null, null, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "HasAcceptedSafetyCommitment", "PasswordHash" },
                values: new object[] { "pending", null, null, null, "f9a28b5d9ee09b2a5281a579d4f4090a" });

            migrationBuilder.CreateIndex(
                name: "IX_AccountApprovals_UserEntityId",
                table: "AccountApprovals",
                column: "UserEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountApprovals_UserEntityId1",
                table: "AccountApprovals",
                column: "UserEntityId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AccountApprovals_Users_UserEntityId",
                table: "AccountApprovals",
                column: "UserEntityId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AccountApprovals_Users_UserEntityId1",
                table: "AccountApprovals",
                column: "UserEntityId1",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SystemSettings_Users_UpdatedById",
                table: "SystemSettings",
                column: "UpdatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users",
                column: "ApprovedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccountApprovals_Users_UserEntityId",
                table: "AccountApprovals");

            migrationBuilder.DropForeignKey(
                name: "FK_AccountApprovals_Users_UserEntityId1",
                table: "AccountApprovals");

            migrationBuilder.DropForeignKey(
                name: "FK_SystemSettings_Users_UpdatedById",
                table: "SystemSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_AccountApprovals_UserEntityId",
                table: "AccountApprovals");

            migrationBuilder.DropIndex(
                name: "IX_AccountApprovals_UserEntityId1",
                table: "AccountApprovals");

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

            migrationBuilder.DropColumn(
                name: "HasAcceptedSafetyCommitment",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserEntityId",
                table: "AccountApprovals");

            migrationBuilder.DropColumn(
                name: "UserEntityId1",
                table: "AccountApprovals");

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
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById" },
                values: new object[] { "approved", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 4 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById" },
                values: new object[] { "approved", new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), 4 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "PasswordHash" },
                values: new object[] { "approved", new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), 4, "3820be471b75236bf93e1790ea484432" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ApprovalStatus", "ApprovedAt", "ApprovedById", "Avatar", "Bio", "CreatedDate", "Email", "IsActive", "Name", "PasswordHash", "RejectionReason", "Role" },
                values: new object[] { 4, "approved", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "Platform administrator.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@vlm.com", true, "System Admin", "43fafe46607d081246596c121faf0e76", null, "admin" });

            migrationBuilder.InsertData(
                table: "AccountApprovals",
                columns: new[] { "Id", "AdminId", "DecidedAt", "Decision", "Reason", "UserId" },
                values: new object[,]
                {
                    { 1, 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "approved", "Initial seed approval.", 1 },
                    { 2, 4, new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "approved", "Initial seed approval.", 2 },
                    { 3, 4, new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "approved", "Initial seed approval.", 3 }
                });

            migrationBuilder.InsertData(
                table: "AdminActions",
                columns: new[] { "Id", "ActionType", "AdminId", "CreatedDate", "Details", "TargetId", "TargetType" },
                values: new object[,]
                {
                    { 1, "approve_user", 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Approved user 'alex@vlm.com' during initial seed.", 1, "user" },
                    { 2, "approve_user", 4, new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "Approved user 'maria@vlm.com' during initial seed.", 2, "user" },
                    { 3, "approve_user", 4, new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "Approved user 'john@vlm.com' during initial seed.", 3, "user" }
                });

            migrationBuilder.InsertData(
                table: "AdminAnnouncements",
                columns: new[] { "Id", "AdminId", "Body", "CreatedDate", "EndsAt", "IsActive", "Priority", "StartsAt", "Title", "Type" },
                values: new object[] { 1, 4, "Thank you for joining our community. Together we reduce food waste.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, true, "medium", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Welcome to Foodshare!", "info" });

            migrationBuilder.InsertData(
                table: "SystemSettings",
                columns: new[] { "Id", "Description", "Key", "UpdatedById", "UpdatedDate", "Value" },
                values: new object[,]
                {
                    { 1, "If true, new accounts require admin approval before they can log in.", "registration.requires_approval", 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "true" },
                    { 2, "Maximum number of donations a single user can post per day.", "donations.max_per_user_per_day", 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "5" },
                    { 3, "Support email shown to users across the platform.", "platform.support_email", 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "support@vlm.com" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SystemSettings_Key",
                table: "SystemSettings",
                column: "Key",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SystemSettings_Users_UpdatedById",
                table: "SystemSettings",
                column: "UpdatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users",
                column: "ApprovedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
