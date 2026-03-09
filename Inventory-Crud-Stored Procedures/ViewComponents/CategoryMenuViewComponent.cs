using Inventory_Crud.Models.Domain;
using Inventory_Crud.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory_Crud.ViewComponents
{
    public class CategoryMenuViewComponent : ViewComponent
    {
        private readonly InventoryDbContext inventoryDb;
        public CategoryMenuViewComponent(InventoryDbContext inventoryDb)
        {
            this.inventoryDb = inventoryDb;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categories = await inventoryDb.Categories.ToListAsync();
            return View(categories);
        }
    }
}
