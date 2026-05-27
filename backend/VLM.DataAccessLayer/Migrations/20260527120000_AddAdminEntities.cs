using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814

namespace VLM.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApprovalStatus",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "pending");

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApprovedById",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RejectionReason",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdminActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdminId = table.Column<int>(type: "integer", nullable: false),
                    ActionType = table.Column<string>(type: "text", nullable: false),
                    TargetType = table.Column<string>(type: "text", nullable: false),
                    TargetId = table.Column<int>(type: "integer", nullable: true),
                    Details = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminActions_Users_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccountApprovals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AdminId = table.Column<int>(type: "integer", nullable: false),
                    Decision = table.Column<string>(type: "text", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: false),
                    DecidedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountApprovals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountApprovals_Users_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AccountApprovals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminAnnouncements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdminId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Priority = table.Column<string>(type: "text", nullable: false),
                    StartsAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndsAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminAnnouncements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminAnnouncements_Users_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SystemSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UpdatedById = table.Column<int>(type: "integer", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SystemSettings_Users_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            // Insert admin user first (referenced by other seed data)
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "ApprovalStatus", "ApprovedAt", "ApprovedById", "Avatar", "Bio", "CreatedDate", "Email", "IsActive", "Name", "PasswordHash", "RejectionReason", "Role" },
                values: new object[] { 4, "approved", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "Platform administrator.", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@vlm.com", true, "System Admin", "hashed_password_admin", null, "admin" });

            // Update existing users with approval data
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "RejectionReason" },
                values: new object[] { "approved", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 4, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "RejectionReason" },
                values: new object[] { "approved", new DateTime(2026, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), 4, null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ApprovalStatus", "ApprovedAt", "ApprovedById", "RejectionReason" },
                values: new object[] { "approved", new DateTime(2026, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), 4, null });

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
                name: "IX_Users_ApprovedById",
                table: "Users",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_AdminActions_AdminId",
                table: "AdminActions",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountApprovals_AdminId",
                table: "AccountApprovals",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountApprovals_UserId",
                table: "AccountApprovals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AdminAnnouncements_AdminId",
                table: "AdminAnnouncements",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_SystemSettings_Key",
                table: "SystemSettings",
                column: "Key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SystemSettings_UpdatedById",
                table: "SystemSettings",
                column: "UpdatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users",
                column: "ApprovedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_ApprovedById",
                table: "Users");

            migrationBuilder.DropTable(name: "AccountApprovals");
            migrationBuilder.DropTable(name: "AdminActions");
            migrationBuilder.DropTable(name: "AdminAnnouncements");
            migrationBuilder.DropTable(name: "SystemSettings");

            migrationBuilder.DropIndex(
                name: "IX_Users_ApprovedById",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(name: "ApprovalStatus", table: "Users");
            migrationBuilder.DropColumn(name: "ApprovedAt", table: "Users");
            migrationBuilder.DropColumn(name: "ApprovedById", table: "Users");
            migrationBuilder.DropColumn(name: "RejectionReason", table: "Users");
        }
    }
}
