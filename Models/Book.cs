using System;
using System.ComponentModel.DataAnnotations;


namespace Kursach.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Author { get; set; }


        public Book(){}

        public Book(string Name, string Author)
        {
            this.Name = Name;
            this.Author = Author;
        }
    }
}