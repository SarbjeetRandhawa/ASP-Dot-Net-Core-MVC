using System.ComponentModel.DataAnnotations;

namespace Inventory_Crud.Models.DataBases
{
    public class Categories
    {
        [Required(ErrorMessage = "Category is Required")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is Required")]
        [StringLength(20)]
        public string Name { get; set; }
        public List<Inventory> Inventories { get; set; }


    }
}
