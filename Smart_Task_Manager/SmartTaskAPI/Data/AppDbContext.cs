using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
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
            builder.Entity<ProjectMembers>().HasOne(p => p.User).WithMany().HasForeignKey(pm => pm.UserId).OnDelete(DeleteBehavior.Restrict);   
        }
        public DbSet<ProjectMembers> ProjectMembers { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<ProjectRole> projectRoles { get; set; }
    }


}
