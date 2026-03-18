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

            builder.Entity<ProjectRole>().HasData(
                new ProjectRole
                {
                    Id = (int)ProjectRoleEnum.Admin , Name = "Admin"
                },
                new ProjectRole
                {
                    Id = (int)ProjectRoleEnum.Manager,
                    Name = "Manager"
                },
                new ProjectRole
                {
                    Id = (int)ProjectRoleEnum.Backend,
                    Name = "Backend"
                },
                new ProjectRole
                {
                    Id = (int)ProjectRoleEnum.Frontend,
                    Name = "Frontend"
                },
                new ProjectRole
                {
                    Id = (int)ProjectRoleEnum.Dev,
                    Name = "Dev"
                }
            );
        }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectRole> projectRoles { get; set; }
    }


}
