using Inventory_Crud.Models.Domain;
using Inventory_Crud.Repository.Interface;

namespace Inventory_Crud.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly InventoryDbContext _context;
        public IInventory Inventory { get; }
        public ICategory Category { get; }

        public UnitOfWork(InventoryDbContext context, IInventory inventoryService, ICategory CategoryService)
        {
            _context = context;
            Inventory = inventoryService;
            Category = CategoryService;
        }
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
