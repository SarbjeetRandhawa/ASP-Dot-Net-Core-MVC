using Humanizer;
using Inventory_Crud.Models;
using Inventory_Crud.Models.Domain;
using Inventory_Crud.Models.Pagination;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Validator;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http.Headers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
            
            int pageSize = 7;
             
            if (string.IsNullOrEmpty(sortColumn))
            {
                sortColumn = "Name";
                sortOrder = "asc";
            }
            
            if(pg < 1)
            {
                pg = 1;
            }

            

            var result = await inventoryDb.InventorySpModels.FromSqlRaw(
                "EXEC sp_InventoryGetData @Search, @SearchColumn, @SearchOrder, @PageNo, @PageSize",
                new SqlParameter("@Search", search ?? (object)DBNull.Value),
                new SqlParameter("@SearchColumn", sortColumn ?? (object)DBNull.Value),
                new SqlParameter("@SearchOrder", sortOrder ?? (object)DBNull.Value),
                new SqlParameter("@PageNo", pg ),
                new SqlParameter("@PageSize", pageSize)
            ).ToListAsync();
            
            int totalCount = result.FirstOrDefault()?.TotalCount ?? 0;

           
            var Pager = new Pager(pg, totalCount, pageSize);

            var items = result.Select(x => new Inventory
            {
                Id = x.Id,
                Name = x.Name,
                Category = x.Category,
                Price = x.Price,
                Quantity = x.Quantity,
                Discription = x.Discription,
                CreatedDate = x.CreatedDate,
                ExpiryDate = x.ExpiryDate
            }).ToList();


            return (items , Pager);

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
