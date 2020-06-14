using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kursach.Models
{
    public class AuthorBook
    {
        public string AuthorId { get; set; }
        public Author Author { get; set; }

        public string BookId { get; set; }
        public Book Book { get; set; }
    }
}
