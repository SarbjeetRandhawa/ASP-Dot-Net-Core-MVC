using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models
{
    public class Categories
    {
        
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is Required")]
        [StringLength(20)]
        public string Name { get; set; }
        
    }
}
