using Inventory_Crud.Models;
using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.Pagination;

namespace Inventory_Crud.Repository.Interface
{
    public interface IDashBoardVM
    {
        Task<(DashBoardVM, Pager Pager)> GetDashBoardData(string searchOn, string search, string sortColumn, string sortOrder, int pg = 1);

    }
}
