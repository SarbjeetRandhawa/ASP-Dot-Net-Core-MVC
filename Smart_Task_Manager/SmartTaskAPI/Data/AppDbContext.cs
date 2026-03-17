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
        public DbSet<ProjectMembers> ProjectMembers { get; set; }
        public DbSet<Projects> Projects { get; set; }
    }


}
