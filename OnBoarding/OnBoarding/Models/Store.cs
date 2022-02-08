using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnBoarding.Models
{
    public class Store
    {
        [Key]
        public int storeId { get; set; }

        [Required(ErrorMessage = "Please enter a Store name")]
        public string Name { get; set;}

        [Required(ErrorMessage = "Please enter an Address")]
        public string Address { get; set;}


        //private  ICollection <Sales> ProductSold {get; set;}
    }
}
