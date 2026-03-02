using Inventory_Crud.Models.DataBases;

namespace Inventory_Crud.Models
{
    public class DashBoardVM
    {
        public List<Inventory> Inventories { get; set; }
        public List<Categories> Category { get; set; }
    }
}
