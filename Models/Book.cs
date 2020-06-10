using System;
using System.ComponentModel.DataAnnotations;


namespace Kursach.Models
{
    public class Book
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Author { get; set; }

        [Required]
        public string FileName { get; set; }
        [Required]
        public string FilePath { get; set; }


        public Book(){}

        public Book(string Name, string Author)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = Name;
            this.Author = Author;
        }
    }
}