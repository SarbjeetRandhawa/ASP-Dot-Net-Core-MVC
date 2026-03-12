using Inventory_Crud.Repository.Interface;

namespace Inventory_Crud.UnitOfWork
{
    public interface IUnitOfWork 
    {
        IInventory Inventory { get; }
        ICategory Category { get; }

        Task SaveAsync();
    }
}
