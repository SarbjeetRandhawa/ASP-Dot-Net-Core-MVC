using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_Crud.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is Required")]
        [StringLength(20)]
        [RegularExpression(@"^[a-zA-Z' .-]{3,40}$", ErrorMessage ="Invalid Format")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Category is Required")]
        [StringLength(30)]
        public string Category { get; set; }



        [Required(ErrorMessage = "Price is Required")]
        [Range(0.01,100000,ErrorMessage ="price must be greater then 0")]

        [Column(TypeName = "decimal(18,2)" ) ]
        public decimal Price { get; set; }


        [Range(0,1000 , ErrorMessage ="Max Order Quantity is 1000")]
        [Required(ErrorMessage = "Quantity is Required")]
        public int? Quantity { get; set; }



        [Required(ErrorMessage = "Discription is Required")]
        [StringLength(250)]
         public string Discription { get; set; }


        [Required(ErrorMessage = "CreatedDate is Required")]
        [Display(Name = "CreatedDate")]
        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }



        [Required(ErrorMessage = "ExpiryDate is Required")]
        [DataType(DataType.Date)]
        public DateTime ExpiryDate { get; set; }
    }

}
