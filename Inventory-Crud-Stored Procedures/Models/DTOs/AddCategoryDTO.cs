using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DTOs
{
    public class AddCategoryDTO
    {
        
        public int? Id { get; set; }
        public string Name { get; set; }
    }
}
