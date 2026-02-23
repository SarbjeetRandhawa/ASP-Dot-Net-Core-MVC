using Inventory_Crud.Models;

namespace Inventory_Crud.Repository.Interface
{
    public interface IInventory
    {
        Task<List<Inventory>> GetallData(string search , string sortColumn , string sortOrder);
        Task CreateNew(Inventory n);

        Task Update(Inventory inv);
        Task<Inventory> Details(int id);
        Task Remove(int id);


    }
}
