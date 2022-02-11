using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;


namespace OnBoarding_ReactProject.Models
{
    public class Customer
    {
            [Key]
            public int CustomerId { get; set; }

            [Required(ErrorMessage = "Please enter a Customer name")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Please enter an Address")]
            public string Address { get; set; }


            //private virtual ICollection <Sales> ProductSold {get; set;}
    }
    
}
