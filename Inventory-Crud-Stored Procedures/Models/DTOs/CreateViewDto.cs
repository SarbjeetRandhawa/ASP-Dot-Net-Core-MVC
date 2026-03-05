using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DTOs
{
    public class CreateViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public int? Quantity { get; set; }
        public string Discription { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime ExpiryDate { get; set; }
    }
}
