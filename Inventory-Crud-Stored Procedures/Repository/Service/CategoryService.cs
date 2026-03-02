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

        public List<Categories> GetAll()
        {
            return inventoryDb.Categories.ToList();
        }
    }
}
