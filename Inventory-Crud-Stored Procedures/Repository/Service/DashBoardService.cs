using Inventory_Crud.Models;
using Inventory_Crud.Models.Pagination;
using Inventory_Crud.Repository.Interface;
using System.Threading.Tasks;

namespace Inventory_Crud.Repository.Service
{
    public class DashBoardService : IDashBoardVM
    {
        private readonly IInventory _inventoryRepository;
        private readonly ICategory _categoryRepository;
        public DashBoardService(IInventory inventoryRepository, ICategory categoryRepository)
        {
            this._inventoryRepository = inventoryRepository;
            this._categoryRepository = categoryRepository;
        }

        public async Task<(DashBoardVM , Pager Pager)> GetDashBoardData(string searchOn, string search, string sortColumn, string sortOrder, int pg = 1)
        {
            // Deconstruct the tuple returned by GetallData into items and pager
            var (items, pager) = await _inventoryRepository.GetallData(searchOn, search, sortColumn, sortOrder, pg);

            var dashBoardData = new DashBoardVM
            {
                Inventories = items,
                Category = _categoryRepository.GetAll()
            };
            return (dashBoardData, pager);
        }


    }
}
