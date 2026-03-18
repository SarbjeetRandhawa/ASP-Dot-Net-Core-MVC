using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SmartTaskAPI.Migrations
{
    /// <inheritdoc />
    public partial class newProjectRoleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "ProjectMembers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ProjectMembers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ProjectRoleID",
                table: "ProjectMembers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "projectRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projectRoles", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "projectRoles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Manager" },
                    { 3, "Backend" },
                    { 4, "Frontend" },
                    { 6, "Dev" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_ProjectRoleID",
                table: "ProjectMembers",
                column: "ProjectRoleID");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_UserId",
                table: "ProjectMembers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectMembers_AspNetUsers_UserId",
                table: "ProjectMembers",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectMembers_projectRoles_ProjectRoleID",
                table: "ProjectMembers",
                column: "ProjectRoleID",
                principalTable: "projectRoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectMembers_AspNetUsers_UserId",
                table: "ProjectMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectMembers_projectRoles_ProjectRoleID",
                table: "ProjectMembers");

            migrationBuilder.DropTable(
                name: "projectRoles");

            migrationBuilder.DropIndex(
                name: "IX_ProjectMembers_ProjectRoleID",
                table: "ProjectMembers");

            migrationBuilder.DropIndex(
                name: "IX_ProjectMembers_UserId",
                table: "ProjectMembers");

            migrationBuilder.DropColumn(
                name: "ProjectRoleID",
                table: "ProjectMembers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "ProjectMembers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "ProjectMembers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
