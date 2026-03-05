using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DTOs
{
    public class CreateViewDto
    {
        public int Id { get; set; }
        [RegularExpression("^[a-zA-Z' .-]{3,40}$", ErrorMessage = "Invalid Format")]
        public string Name { get; set; }
        public int CategoryId { get; set; }
        [Required (ErrorMessage = "Price is Required")]
        public decimal? Price { get; set; }
        [Required(ErrorMessage = "Quantity is Required")]
        public int? Quantity { get; set; }
        public string Discription { get; set; }
        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime ExpiryDate { get; set; }
    }
}
