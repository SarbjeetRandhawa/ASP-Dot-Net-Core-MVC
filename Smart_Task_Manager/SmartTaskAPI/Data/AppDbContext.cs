using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Common;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<ProjectMember>().HasOne(p => p.User).WithMany().HasForeignKey(pm => pm.UserId).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<TaskItem>()
                .HasOne(t => t.AssignedToUser).WithMany().HasForeignKey(t => t.AssignedToUserId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<TaskItem>()
                .HasOne(t => t.CreatedByUser).WithMany().HasForeignKey(t => t.CreatedByUserId).OnDelete(DeleteBehavior.Restrict);

          

            builder.Entity<Models.DB.ProjectRole>().HasData(
                new Models.DB.ProjectRole
                {
                    Id = (int)Common.ProjectRole.Admin , Name = "Admin"
                },
                new Models.DB.ProjectRole
                {
                    Id = (int)Common.ProjectRole.Manager,
                    Name = "Manager"
                },
                new Models.DB.ProjectRole
                {
                    Id = (int)Common.ProjectRole.Backend,
                    Name = "Backend"
                },
                new Models.DB.ProjectRole
                {
                    Id = (int)Common.ProjectRole.Frontend,
                    Name = "Frontend"
                },
                new Models.DB.ProjectRole
                {
                    Id = (int)Common.ProjectRole.Dev,
                    Name = "Dev"
                }
            );

            builder.Entity<Comment>()
                .HasOne(c => c.Task)
                .WithMany()
                .HasForeignKey(c => c.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Comment>()
                .HasOne(c => c.ParentComment)
                .WithMany(c => c.Replies)
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Comment>()
                .HasOne(c => c.CommentedByUser)
                .WithMany()
                .HasForeignKey(c => c.CommentedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CommentsLike>()
                .HasOne(c1 => c1.Comment)
                .WithMany(c => c.Likes)
                .HasForeignKey(c1 => c1.CommentId);
            builder.Entity<CommentsLike>()
                .HasOne(c1 => c1.User)
                .WithMany()
                .HasForeignKey(c1 => c1.userId);
            builder.Entity<CommentsLike>()
                .HasIndex(c1 => new { c1.CommentId, c1.userId }).IsUnique();
                


        }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<TaskAttachment> TaskAttachments { get; set; }
        public DbSet<Models.DB.ProjectRole> projectRoles { get; set; }
        public DbSet<Comment> comments { get; set; }
        public DbSet<CommentsLike> commentsLike { get; set; }
    }


}
