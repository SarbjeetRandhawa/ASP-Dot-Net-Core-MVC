using Humanizer;
using Inventory_Crud.Models;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Validator;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
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


        public async Task<List<Inventory>> GetallData()
        {
            return await inventoryDb.Products.ToListAsync(); ;
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
