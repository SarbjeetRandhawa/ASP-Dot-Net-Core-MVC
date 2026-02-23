using Humanizer;
using Inventory_Crud.Models;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Validator;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http.Headers;

namespace Inventory_Crud.Repository.Service
{
    public class InventoryService : IInventory
    {
        private readonly InventoryDbContext inventoryDb;
        public InventoryService(InventoryDbContext inventoryDb)
        {
            this.inventoryDb = inventoryDb;
        }
    

        public async Task<List<Inventory>> GetallData(string search, string sortColumn, string sortOrder)
        {
            var query = inventoryDb.Products.AsQueryable();

             //searching
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => EF.Functions.Like(x.Name, $"%{search}%") ||
                EF.Functions.Like(x.Category, $"%{search}%"));
            }

            //sorting

            if (!string.IsNullOrEmpty(sortColumn))
            {
                query = (sortColumn, sortOrder) switch
                {
                    ("Name", "desc") => query.OrderByDescending(x => x.Name),
                    ("Name", _) => query.OrderBy(x => x.Name),

                    ("Category", "desc") => query.OrderByDescending(x => x.Category),
                    ("Category", _) => query.OrderBy(x => x.Category),

                    ("Price", "desc") => query.OrderByDescending(x => x.Price),
                    ("Price", _) => query.OrderBy(x => x.Price),

                    ("Quantity", "desc") => query.OrderByDescending(x => x.Quantity),
                    ("Quantity", _) => query.OrderBy(x => x.Quantity)

                };
            }


            return await query.ToListAsync();

        }


        public  async Task CreateNew(Inventory inventory)
        {
           
            await inventoryDb.Products.AddAsync(inventory);
            await inventoryDb.SaveChangesAsync();
        }


        public async Task Remove(int id)
        {
            var data = await  inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (data != null)
            {
                inventoryDb.Products.Remove(data);
                await inventoryDb.SaveChangesAsync();
            }
        }


        public async Task<Inventory> Details(int id)
        { 
            return await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);
        }

       
        public async Task Update(Inventory inv)
        {
            inventoryDb.Products.Update(inv);
            await inventoryDb.SaveChangesAsync();
        }

        
    }
}
