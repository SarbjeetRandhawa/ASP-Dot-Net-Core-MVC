using Inventory_Crud.Models.DataBases;

namespace Inventory_Crud.Repository.Interface
{
    public interface ICategory
    {
        Task<List<Categories>> GetAll();
        Task CreateNew(Categories category);
        Task<bool> Remove(int id);

    }
}
