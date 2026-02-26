using Microsoft.EntityFrameworkCore;

namespace Inventory_Crud.Models.Domain
{
    public class InventoryDbContext : DbContext
    {

        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventorySpModel>().HasNoKey();
        }


        public DbSet<Inventory> Products { get; set; }
        public DbSet<InventorySpModel> InventorySpModels { get; set; }
    }
}
