using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DTOs
{
    public class DeleteCategoryDTO
    {
        [Required (ErrorMessage = "Select Category")]
        public int? id { get; set; }
    }
}
