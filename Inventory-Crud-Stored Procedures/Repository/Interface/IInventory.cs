using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.Pagination;

namespace Inventory_Crud.Repository.Interface
{
    public interface IInventory
    {
        Task<(List<Inventory>Items , Pager Pager)> GetallData( string searchOn ,string search , string sortColumn , string sortOrder, int pg = 1);
        Task CreateNew(Inventory n);

        Task Update(Inventory inv);
        Task<Inventory> Details(int id);
        Task Remove(int id);


    }
}
