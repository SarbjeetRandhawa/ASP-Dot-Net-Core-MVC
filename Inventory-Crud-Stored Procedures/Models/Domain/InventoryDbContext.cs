using Microsoft.EntityFrameworkCore;

namespace Inventory_Crud.Models.Domain
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }
        public DbSet<Inventory> Products { get; set; }
    }
}
