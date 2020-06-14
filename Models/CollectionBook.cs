using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kursach.Models
{
    public class CollectionBook
    {
        public string CollectionId { get; set; }
        public Collection Collection { get; set; }

        public string BookId { get; set; }
        public Book Book { get; set; }
    }
}
