using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Kursach.Models
{
    public class Book
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; }

        [Required]
        public Author Author { get; set; }

        [Required]
        public string FileName { get; set; }
        [Required]
        public string FilePath { get; set; }

        //public IList<CollectionBook> CollectionBooks { get; set; } = new List<CollectionBook>();


        public Book(){}

        public Book(string Name, Author Author)
        {
            this.Name = Name;
            this.Author = Author;
        }
    }
}