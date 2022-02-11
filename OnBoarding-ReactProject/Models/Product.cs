using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;


namespace OnBoarding_ReactProject.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Please enter a Product Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter a Product Price")]
        public int Price { get; set; }


        //private ICollection <Sales> ProductSold {get; set;}
    }
}
