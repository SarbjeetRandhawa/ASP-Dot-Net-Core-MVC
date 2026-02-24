using Humanizer;
using Inventory_Crud.Models;
using Inventory_Crud.Models.Domain;
using Inventory_Crud.Models.Pagination;
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
    

        public async Task<(List<Inventory> Items , Pager Pager)> GetallData(string search, string sortColumn, string sortOrder, int pg=1)
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
                    ("Quantity", _) => query.OrderBy(x => x.Quantity),
                   
                };
            }
            else
            {
                query = query.OrderBy(x => x.Name);
            }

            int pageSize = 7;
            if(pg < 1)
            {
                pg = 1;
            }

            int InventoryCount = await query.CountAsync();
            var Pager = new Pager(pg, InventoryCount, pageSize);
            int ProductSkip = (pg - 1) * pageSize;

            var data = await query.Skip(ProductSkip).Take(Pager.PageSize).ToListAsync();

            return (data , Pager);

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
