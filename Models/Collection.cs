using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Kursach.Models
{
    public class Collection
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; }

        //public IList<CollectionBook> CollectionBooks { get; set; } = new List<CollectionBook>();


        public Collection(){}

        public Collection(string Name)
        {
            this.Name = Name;
        }
    }
}