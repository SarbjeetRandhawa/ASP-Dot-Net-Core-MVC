namespace Inventory_Crud.Models
{
    public class InventorySpModel
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Discription { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int TotalCount { get; set; }
        
    }
}
