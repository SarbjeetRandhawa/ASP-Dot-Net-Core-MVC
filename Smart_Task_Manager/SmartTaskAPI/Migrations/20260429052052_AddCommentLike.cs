using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartTaskAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentLike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "comments");

            migrationBuilder.CreateTable(
                name: "CommentsLike",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommentId = table.Column<int>(type: "int", nullable: false),
                    userId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentsLike", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentsLike_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentsLike_comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentsLike_CommentId_userId",
                table: "CommentsLike",
                columns: new[] { "CommentId", "userId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CommentsLike_userId",
                table: "CommentsLike",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentsLike");

            migrationBuilder.AddColumn<int>(
                name: "LikeCount",
                table: "comments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
