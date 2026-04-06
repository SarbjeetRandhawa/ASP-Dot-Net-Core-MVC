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
        }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<TaskAttachment> TaskAttachments { get; set; }
        public DbSet<Models.DB.ProjectRole> projectRoles { get; set; }
    }


}
