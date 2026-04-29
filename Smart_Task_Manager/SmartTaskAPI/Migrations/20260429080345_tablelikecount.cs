using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartTaskAPI.Migrations
{
    /// <inheritdoc />
    public partial class tablelikecount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommentsLike_AspNetUsers_userId",
                table: "CommentsLike");

            migrationBuilder.DropForeignKey(
                name: "FK_CommentsLike_comments_CommentId",
                table: "CommentsLike");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CommentsLike",
                table: "CommentsLike");

            migrationBuilder.RenameTable(
                name: "CommentsLike",
                newName: "commentsLike");

            migrationBuilder.RenameIndex(
                name: "IX_CommentsLike_userId",
                table: "commentsLike",
                newName: "IX_commentsLike_userId");

            migrationBuilder.RenameIndex(
                name: "IX_CommentsLike_CommentId_userId",
                table: "commentsLike",
                newName: "IX_commentsLike_CommentId_userId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_commentsLike",
                table: "commentsLike",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_commentsLike_AspNetUsers_userId",
                table: "commentsLike",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_commentsLike_comments_CommentId",
                table: "commentsLike",
                column: "CommentId",
                principalTable: "comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_commentsLike_AspNetUsers_userId",
                table: "commentsLike");

            migrationBuilder.DropForeignKey(
                name: "FK_commentsLike_comments_CommentId",
                table: "commentsLike");

            migrationBuilder.DropPrimaryKey(
                name: "PK_commentsLike",
                table: "commentsLike");

            migrationBuilder.RenameTable(
                name: "commentsLike",
                newName: "CommentsLike");

            migrationBuilder.RenameIndex(
                name: "IX_commentsLike_userId",
                table: "CommentsLike",
                newName: "IX_CommentsLike_userId");

            migrationBuilder.RenameIndex(
                name: "IX_commentsLike_CommentId_userId",
                table: "CommentsLike",
                newName: "IX_CommentsLike_CommentId_userId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CommentsLike",
                table: "CommentsLike",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CommentsLike_AspNetUsers_userId",
                table: "CommentsLike",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CommentsLike_comments_CommentId",
                table: "CommentsLike",
                column: "CommentId",
                principalTable: "comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
