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

        public async Task CreateNew(Categories category)
        {

            inventoryDb.Categories.Add(category);
            //await inventoryDb.SaveChangesAsync();

        }   
        public async Task<bool> Remove(int id)
        {
            var hasProducts = await inventoryDb.Products.AnyAsync(p => p.CategoryId == id);
            if (hasProducts)
            {
                return false;
            }
            var category = await inventoryDb.Categories.FindAsync(id);
            if (category != null)
            {
                inventoryDb.Categories.Remove(category);
                //await inventoryDb.SaveChangesAsync();
            }
            return true;
        }
    }
}