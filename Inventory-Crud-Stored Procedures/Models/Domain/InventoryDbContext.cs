using Inventory_Crud.Models.DataBases;
using Microsoft.EntityFrameworkCore;

namespace Inventory_Crud.Models.Domain
{
    public class InventoryDbContext : DbContext
    {

        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventorySpModel>().HasNoKey();
            modelBuilder.Entity<Inventory>().HasOne(i => i.Category)
                .WithMany(c => c.Inventories)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);  
        }


        public DbSet<Inventory> Products { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<InventorySpModel> InventorySpModels { get; set; }

    }
}
