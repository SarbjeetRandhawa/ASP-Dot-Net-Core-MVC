using Inventory_Crud.Models.DataBases;

namespace Inventory_Crud.Repository.Interface
{
    public interface ICategory
    {
        Task<List<Categories>> GetAll();
         
    }
}
