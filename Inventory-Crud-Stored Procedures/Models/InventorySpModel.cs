using Inventory_Crud.Models.DataBases;

namespace Inventory_Crud.Models
{
    public class InventorySpModel
    {
        public int Id { get; set; }
        public string Name { get; set; }    
       
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Discription { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int TotalCount { get; set; }
        
    }
}
