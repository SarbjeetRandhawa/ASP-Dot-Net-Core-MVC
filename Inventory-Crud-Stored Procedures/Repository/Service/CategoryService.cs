using Microsoft.EntityFrameworkCore;
using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.Domain;
using Inventory_Crud.Repository.Interface;

namespace Inventory_Crud.Repository.Service
{
    public class CategoryService : ICategory
    {
        private readonly InventoryDbContext inventoryDb;

        public CategoryService(InventoryDbContext inventoryDb)
        {
            this.inventoryDb = inventoryDb;
        }

        public async Task<List<Categories>> GetAll()
        {
            return await inventoryDb.Categories.ToListAsync();
        }
    }
}
